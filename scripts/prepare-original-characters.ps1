# Crop the official colored GIFs without redrawing or recoloring the artwork.
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
public static class OriginalCharacterCrop {
  public static void Save(string input, string output) {
    using (var source = new Bitmap(input))
    using (var result = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb)) {
      int width = source.Width, height = source.Height;
      var background = new bool[width, height];
      var queue = new Queue<Point>();
      for (int x = 0; x < width; x++) { queue.Enqueue(new Point(x, 0)); queue.Enqueue(new Point(x, height - 1)); }
      for (int y = 0; y < height; y++) { queue.Enqueue(new Point(0, y)); queue.Enqueue(new Point(width - 1, y)); }
      while (queue.Count > 0) {
        var p = queue.Dequeue();
        if (p.X < 0 || p.Y < 0 || p.X >= width || p.Y >= height || background[p.X, p.Y]) continue;
        var c = source.GetPixel(p.X, p.Y);
        // Only the connected pink/lilac backdrop; preserve the original cel colors.
        if (!(c.R > 160 && c.B > 180 && c.G > 110 && c.R > c.G + 8 && c.B > c.G + 8)) continue;
        background[p.X, p.Y] = true;
        queue.Enqueue(new Point(p.X - 1, p.Y)); queue.Enqueue(new Point(p.X + 1, p.Y));
        queue.Enqueue(new Point(p.X, p.Y - 1)); queue.Enqueue(new Point(p.X, p.Y + 1));
      }
      int left = width, top = height, right = 0, bottom = 0;
      for (int y = 0; y < height; y++) for (int x = 0; x < width; x++) {
        if (background[x, y]) continue;
        result.SetPixel(x, y, source.GetPixel(x, y));
        left = Math.Min(left, x); top = Math.Min(top, y);
        right = Math.Max(right, x); bottom = Math.Max(bottom, y);
      }
      var bounds = new Rectangle(left, top, right - left + 1, bottom - top + 1);
      using (var cropped = result.Clone(bounds, PixelFormat.Format32bppArgb)) cropped.Save(output, ImageFormat.Png);
    }
  }
}
'@
$characterRoot = Join-Path $PSScriptRoot '../public/characters'
foreach ($name in @('reiko', 'yokoshima', 'okinu')) {
  [OriginalCharacterCrop]::Save((Join-Path $characterRoot "$name-anime.gif"), (Join-Path $characterRoot "$name-original.png"))
}
