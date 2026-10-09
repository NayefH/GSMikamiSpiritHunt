import { useEffect, useRef } from 'react'
import './App.css'
import './Responsive.css'
import { GameHeader } from './components/GameHeader'
import { BackgroundMusic } from './components/BackgroundMusic'
import { TechnologySection } from './components/TechnologySection'
import { useAnimeEffects } from './hooks/useAnimeEffects'
import { useGame } from './hooks/useGame'
import { useGameTool } from './hooks/useGameTool'
import { useInterfaceSounds } from './hooks/useInterfaceSounds'
import { BattleScreen } from './screens/BattleScreen'
import { DefeatScreen, VictoryScreen } from './screens/EndingScreen'
import { EventScreen } from './screens/EventScreen'
import { MapScreen } from './screens/MapScreen'
import { RewardScreen } from './screens/RewardScreen'
import { StartScreen } from './screens/StartScreen'

function App() {
  const rootRef = useRef<HTMLElement>(null)
  const game = useGame()

  useAnimeEffects(rootRef, game.screen, game.battle?.enemyId)
  useGameTool(game.beginRun)
  useInterfaceSounds()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [game.screen])

  return (
    <>
      <BackgroundMusic screen={game.screen} battleKind={game.activeNode?.kind} />
      {game.screen === 'start' ? (
        <StartScreen
          rootRef={rootRef}
          selectedHero={game.selectedHero}
          onSelectHero={game.setSelectedHero}
          onStart={() => game.beginRun()}
        />
      ) : (
        <main ref={rootRef} className="game-shell anime-theme">
          <GameHeader runCode={game.runCode} yen={game.player.yen} onExit={game.showStartScreen} />

          {game.screen === 'map' && (
            <MapScreen
              hero={game.hero}
              heroId={game.selectedHero}
              player={game.player}
              stage={game.stage}
              completed={game.completed}
              nodesByStage={game.nodesByStage}
              onChooseNode={game.chooseNode}
            />
          )}

          {game.screen === 'battle' && game.battle && game.enemy && (
            <BattleScreen
              hero={game.hero}
              heroId={game.selectedHero}
              player={game.player}
              battle={game.battle}
              enemy={game.enemy}
              log={game.log}
              onPlaySkill={game.playSkill}
              onFocus={game.focusTurn}
            />
          )}

          {game.screen === 'event' && (
            <EventScreen copy={game.eventCopy} onChoose={game.chooseEventOption} />
          )}

          {game.screen === 'reward' && <RewardScreen onChoose={game.takeReward} />}

          {game.screen === 'victory' && (
            <VictoryScreen
              heroId={game.selectedHero}
              yen={game.player.yen}
              seals={game.player.seals}
              stops={game.completed.length + 1}
              onRestart={game.showStartScreen}
            />
          )}

          {game.screen === 'defeat' && (
            <DefeatScreen
              onRetry={() => game.beginRun(game.selectedHero)}
              onChangeCharacter={game.showStartScreen}
            />
          )}
        </main>
      )}
      <TechnologySection />
    </>
  )
}

export default App
