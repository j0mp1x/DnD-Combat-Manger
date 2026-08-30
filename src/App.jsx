import { useState } from 'react'
import { fighters } from './data/fighters'

function App() {
    const [gameState, setGameState] = useState({
        fighters: fighters.sort((a, b) => b.initiative - a.initiative),
        round: 1,
        currentFighter: 0,
    })

    const [actionError, setActionError] = useState(false)

    const onReactionUse = (f) => {
        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters.map((e) => {
                    if (e.id === f.id) {
                        const newReaction = e.reaction ? false : true
                        return { ...e, reaction: newReaction }
                    } else return e
                }),
            }
        })
    }

    const onEndTurn = () => {
        setGameState((prev) => {
            if (prev.currentFighter + 1 === prev.fighters.length) {
                return {
                    ...prev,
                    currentFighter: 0,
                    round: prev.round + 1,
                    fighters: prev.fighters.map((e) => {
                        return {
                            ...e,
                            reaction: true,
                            action: e.maxActions,
                        }
                    }),
                }
            } else {
                return {
                    ...prev,
                    currentFighter: prev.currentFighter + 1,
                }
            }
        })
    }

    const onUseAction = () => {
        if (!actionError) {
            if (gameState.fighters[gameState.currentFighter].action > 0) {
                setGameState((prev) => {
                    return {
                        ...prev,
                        fighters: prev.fighters.map((e) => {
                            if (
                                e.id === prev.fighters[prev.currentFighter].id
                            ) {
                                return {
                                    ...e,
                                    action:
                                        prev.fighters[prev.currentFighter]
                                            .action - 1,
                                }
                            } else return e
                        }),
                    }
                })
            } else {
                setActionError(true)

                setTimeout(() => {
                    setActionError(false)
                }, 1000)
            }
        }
    }

    return (
        <div>
            <h1>DnD Combat Manager</h1>
            <div id="initiativePanel">
                <h1>Раунд {gameState.round}</h1> {/*Тут потом будет js код*/}
                <div id="listOfFighters">
                    {gameState.fighters.map((f) => {
                        return (
                            <div
                                className={`fighter ${
                                    f.id ===
                                    gameState.fighters[gameState.currentFighter]
                                        .id
                                        ? 'currentFighter'
                                        : ''
                                }`}
                                key={f.id}
                            >
                                <p>{f.name}</p>
                                <p>Действие: {f.action}</p>
                                <button
                                    className={
                                        f.reaction
                                            ? 'reactionReady'
                                            : 'reactionUsed'
                                    }
                                    onClick={() => {
                                        onReactionUse(f)
                                    }}
                                >
                                    Реакция
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="actions">
                <button
                    className={
                        actionError
                            ? 'actionButton actionError'
                            : 'actionButton'
                    }
                    onClick={() => {
                        onUseAction()
                    }}
                >
                    Потратить действие
                </button>
            </div>
            <button
                onClick={() => {
                    onEndTurn()
                }}
            >
                Закончить ход
            </button>
        </div>
    )
}

export default App
