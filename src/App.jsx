import { useState } from 'react'
import { fighters } from './data/fighters'

function App() {
    const [gameState, setGameState] = useState({
        fighters: fighters.sort((a, b) => b.initiative - a.initiative),
        round: 1,
        currentFighter: 0,
    })

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
                        return { ...e, reaction: true, action: true }
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
                                <p>Действие:</p>
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
                <button>Потратить действие</button>
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
