import { useEffect, useRef } from 'react'
import { HEROES, type HeroId } from '../game/data'

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void>
    }
  }
}

export function useGameTool(startRun: (heroId: HeroId) => void) {
  const startRunRef = useRef(startRun)

  useEffect(() => {
    startRunRef.current = startRun
  }, [startRun])

  useEffect(() => {
    const context = document.modelContext
    if (!context?.registerTool) return

    const lifecycle = new AbortController()
    const tool = {
      name: 'start_new_ghost_case',
      title: 'Start a new ghost case',
      description: 'Starts a new run with one of the three main characters and opens the city map.',
      inputSchema: {
        type: 'object',
        properties: { character: { type: 'string', enum: ['mikami', 'yokoshima', 'okinu'] } },
        required: ['character'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const character = (input as { character?: HeroId })?.character
        if (!character || !HEROES[character]) throw new Error('Unknown character')
        startRunRef.current(character)
        return { status: 'started', character: HEROES[character].name, stage: 1 }
      },
    }

    try {
      void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined)
    } catch {
      // WebMCP is an optional enhancement. The game works without it.
    }

    return () => lifecycle.abort()
  }, [])
}
