interface AnimeLogoProps {
  compact?: boolean
}

export function AnimeLogo({ compact = false }: AnimeLogoProps) {
  return (
    <img
      className={`anime-logo ${compact ? 'compact' : ''}`}
      src="/branding/gs-mikami-official-logo.png"
      alt="GS Mikami: Spirit Hunt"
    />
  )
}
