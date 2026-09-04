import { useEffect, useState } from 'react'
import { createFighter, fighters } from './data/fighters'
import { Preset, Yoshioka, createPreset } from './data/preset'
import ConfirmModal from './components/confirmModal'
import FormModal from './components/formModal'
import getDataFromForm from './UTILITES/getData'

function App() {
    const [gameState, setGameState] = useState({
        fighters: fighters.sort((a, b) => b.initiative - a.initiative),
        presets: [Yoshioka],
        round: 1,
        currentFighter: 0,
    })

    const [prevGameState, setPrevGameState] = useState([{}])

    const [actionError, setActionError] = useState(false)

    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        onConfirm: null,
    })

    const [formModal, setFormModal] = useState({
        isOpen: false,
        onSubmit: null,
        value: null,
    })

    const saveToLocalStorage = () => {
        if (prevGameState.length > 1) {
            localStorage.setItem('gameState', JSON.stringify(gameState))
        }
    }

    const loadFromLocalStorage = () => {
        let storedGameState = localStorage.getItem('gameState')
        if (storedGameState) {
            storedGameState = JSON.parse(storedGameState)
            console.log(storedGameState)
            try {
                setGameState((prev) => {
                    return { ...prev, ...storedGameState }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        loadFromLocalStorage()
    }, [])

    useEffect(() => {
        saveToLocalStorage()
    }, [gameState])

    const onReactionUse = (f) => {
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
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
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
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
                    setPrevGameState((prev) => {
                        return [...prev, gameState]
                    })
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
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: createFighter(prev, data).sort(
                    (a, b) => b.initiative - a.initiative
                ),
            }
        })

        if (data.saveAsPreset) {
            addPreset(data)
        }
    }

    const deleteFighter = (fighter) => {
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters
                    .filter((e) => e.id !== fighter.id)
                    .sort((a, b) => b.initiative - a.initiative),
            }
        })
    }

    const editFighter = (data, fighter) => {
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters.map((e) => {
                    if (e.id === fighter.id) {
                        return {
                            ...data,
                            id: fighter.id,
                            reaction: fighter.reaction,
                            action: fighter.action,
                            initiative: fighter.initiative,
                            hp: data.maxHp,
                        }
                    } else return e
                }),
            }
        })
    }

    const addPreset = (data) => {
        setGameState((prev) => {
            return { ...prev, presets: [...prev.presets, createPreset(data)] }
        })
    }

    const deletePreset = (preset) => {
        setGameState((prev) => {
            return {
                ...prev,
                presets: [...prev.presets].filter((e) => e.id !== preset.id),
            }
        })
    }

    const editPreset = (data, preset) => {
        setGameState((prev) => {
            return {
                ...prev,
                presets: prev.presets.map((e) => {
                    if (e.id === preset.id) {
                        return { ...data, id: preset.id }
                    } else return e
                }),
            }
        })
    }

    const backUp = () => {
        if (prevGameState.length > 1) {
            setGameState((prev) => {
                return { ...prevGameState[prevGameState.length - 1] }
            })
            setPrevGameState((prev) => {
                return [...prev].slice(0, -1)
            })
        }
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
                                        <div>
                                            <p>
                                                {f.initiative}. {f.name}
                                            </p>
                                        </div>
                                        <div className="fighterActions">
                                            <button
                                                onClick={() => {
                                                    setFormModal({
                                                        isOpen: true,
                                                        onSubmit: editFighter,
                                                        value: { ...f },
                                                    })
                                                }}
                                            >
                                                ✎
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setConfirmModal({
                                                        isOpen: true,
                                                        onConfirm: () => {
                                                            deleteFighter(f)
                                                        },
                                                    })
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="combatStats">
                                            <p>
                                                ХП: {f.hp}/{f.maxHp}
                                            </p>
                                            <p>КБ: {f.armorClass}</p>
                                        </div>
                                        <div className="stateBlock">
                                            <p>СИЛ: {f.str}</p>
                                            <p>ЛОВ: {f.dex}</p>
                                            <p>ВЫН: {f.con}</p>
                                            <p>ИНТ: {f.int}</p>
                                            <p>МУД: {f.wis}</p>
                                            <p>ХАР: {f.cha}</p>
                                        </div>
                                        <div>
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
                    <div className="actions">
                        <button
                            onClick={() => {
                                setFormModal({
                                    isOpen: true,
                                    onSubmit: addFighter,
                                    value: null,
                                })
                            }}
                        >
                            Добавить бойца
                        </button>
                        <button
                            onClick={() => {
                                setFormModal({
                                    isOpen: true,
                                    onSubmit: addPreset,
                                    value: null,
                                })
                            }}
                        >
                            Добавить пресет
                        </button>
                    </div>
                    <h2>Пресеты</h2>
                    <div id="presets">
                        {gameState.presets.map((e) => {
                            return (
                                <div className="preset" key={e.id}>
                                    <h1>{e.name}</h1>
                                    <div className="presetActions">
                                        <button
                                            onClick={() => {
                                                addFighter(e)
                                            }}
                                        >
                                            Добавить
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormModal({
                                                    isOpen: true,
                                                    onSubmit: editPreset,
                                                    value: { ...e },
                                                })
                                            }}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => {
                                                setConfirmModal({
                                                    isOpen: true,
                                                    onConfirm: () => {
                                                        deletePreset(e)
                                                    },
                                                    value: null,
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

            {formModal.isOpen && (
                <FormModal
                    isOpen={formModal.isOpen}
                    onSubmit={formModal.onSubmit}
                    getData={getDataFromForm}
                    value={formModal.value}
                    onClose={() => {
                        setFormModal({
                            isOpen: false,
                            onSubmit: null,
                            value: null,
                        })
                    }}
                />
            )}
            {confirmModal.isOpen && (
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
            )}
        </div>
    )
}
export default App
