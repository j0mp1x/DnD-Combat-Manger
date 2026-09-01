import { useState } from 'react'
import {
    createFighter,
    createFighterFromPreset,
    fighters,
} from './data/fighters'
import { Preset, Yoshioka } from './data/preset'
import ConfirmModal from './components/confirmModal'
import FormModal from './components/formModal'

function App() {
    const [gameState, setGameState] = useState({
        fighters: fighters.sort((a, b) => b.initiative - a.initiative),
        round: 1,
        currentFighter: 0,
    })

    const [prevGameState, setPrevGameState] = useState(null)

    const [presets, setPresets] = useState([Yoshioka])

    const [actionError, setActionError] = useState(false)

    const [confirmModal, setConfirmModal] = useState(false)

    const onReactionUse = (f) => {
        setPrevGameState(gameState)
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
        setPrevGameState(gameState)
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
            if (gameState.fighters.length != 0) {
                if (gameState.fighters[gameState.currentFighter].action > 0) {
                    setPrevGameState(gameState)
                    setGameState((prev) => {
                        return {
                            ...prev,
                            fighters: prev.fighters.map((e) => {
                                if (
                                    e.id ===
                                    prev.fighters[prev.currentFighter].id
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
            } else {
                setActionError(true)

                setTimeout(() => {
                    setActionError(false)
                }, 1000)
            }
        }
    }

    const addFighter = (data) => {
        const name = data.get('name')
        const hp = data.get('hp')
        const maxActions = data.get('maxActions')
        const armorClass = data.get('armorClass')
        const initiative = data.get('initiative')
        const saveAsPreset = data.get('saveAsPreset')

        setPrevGameState(gameState)
        setGameState((prev) => {
            return {
                ...prev,
                fighters: createFighter(
                    prev,
                    name,
                    hp,
                    armorClass,
                    maxActions,
                    initiative
                ).sort((a, b) => b.initiative - a.initiative),
            }
        })

        if (saveAsPreset) {
            setPresets((prev) => {
                return [...prev, new Preset(name, hp, maxActions, armorClass)]
            })
        }
    }

    const addFighterFromPreset = (preset) => {
        setPrevGameState(gameState)
        setGameState((prev) => {
            return {
                ...prev,
                fighters: createFighterFromPreset(prev, preset).sort(
                    (a, b) => b.initiative - a.initiative
                ),
            }
        })
    }

    const [formModal, setFormModal] = useState({
        isOpen: false,
        onSubmit: addFighter,
    })

    const deletePreset = (preset) => {
        setPresets((prev) => {
            return [...prev].filter((e) => e.id !== preset.id)
        })
    }

    const backUp = () => {
        prevGameState ? setGameState(prevGameState) : null
        setPrevGameState(null)
    }

    return (
        <div>
            <h1>DnD Combat Manager</h1>
            <div id="mainContainer">
                <div id="battleConteiner">
                    <div id="initiativePanel">
                        <h1>Раунд {gameState.round}</h1>
                        <div id="listOfFighters">
                            {gameState.fighters.map((f) => {
                                return (
                                    <div
                                        className={`fighter ${
                                            f.id ===
                                            gameState.fighters[
                                                gameState.currentFighter
                                            ].id
                                                ? 'currentFighter'
                                                : ''
                                        }`}
                                        key={f.id}
                                    >
                                        <p>
                                            {f.initiative}. {f.name}
                                        </p>
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

                        <div id="turn">
                            <button onClick={backUp}></button>
                            <button
                                id="turnBtn"
                                onClick={() => {
                                    onEndTurn()
                                }}
                            >
                                Закончить ход
                            </button>
                        </div>
                    </div>
                </div>
                <div id="addFighters">
                    <h1>Управление бойцами</h1>
                    <button
                        onClick={() => {
                            setFormModal({ isOpen: true })
                        }}
                    >
                        Добавить бойца
                    </button>
                    <div id="presets">
                        {presets.map((e) => {
                            return (
                                <div className="preset" key={e.id}>
                                    <h1>{e.name}</h1>
                                    <div className="presetActions">
                                        <button
                                            onClick={() => {
                                                addFighterFromPreset(e)
                                            }}
                                        >
                                            Добавить
                                        </button>
                                        <button>Редактировать</button>
                                        <button
                                            onClick={() => {
                                                setConfirmModal({
                                                    isOpen: true,
                                                    onConfirm: () => {
                                                        deletePreset(e)
                                                    },
                                                })
                                            }}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <FormModal
                isOpen={formModal.isOpen}
                onSubmit={addFighter}
                onClose={() => {
                    setFormModal(false)
                }}
            />
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onConfirm={confirmModal.onConfirm}
                onClose={() => {
                    setConfirmModal({
                        isOpen: false,
                        onConfirm: null,
                    })
                }}
            />
        </div>
    )
}
export default App
