import { useState } from 'react'
import {
    createFighter,
    createFighterFromPreset,
    fighters,
} from './data/fighters'
import { Preset, Yoshioka } from './data/preset'
import { rollDice } from './UTILITES/dice'

function App() {
    const [gameState, setGameState] = useState({
        fighters: fighters.sort((a, b) => b.initiative - a.initiative),
        round: 1,
        currentFighter: 0,
    })

    const [presets, setPresets] = useState([Yoshioka])

    const [actionError, setActionError] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const onOpenModal = () => {
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    const addFighter = (data) => {
        const name = data.get('name')
        const hp = data.get('hp')
        const maxActions = data.get('maxActions')
        const armorClass = data.get('armorClass')
        const initiative = data.get('initiative')
        const saveAsPreset = data.get('saveAsPreset')

        setGameState((prev) => {
            return {
                ...prev,
                fighters: createFighter(
                    prev,
                    name,
                    hp,
                    maxActions,
                    armorClass,
                    initiative
                ).sort((a, b) => b.initiative - a.initiative),
            }
        })

        if (saveAsPreset) {
            setPresets((prev) => {
                return [...prev, new Preset(name, hp, maxActions, armorClass)]
            })
        }

        console.log(presets)

        setIsModalOpen(false)
    }

    const addFighterFromPreset = (preset) => {
        setGameState((prev) => {
            return {
                ...prev,
                fighters: createFighterFromPreset(prev, preset).sort(
                    (a, b) => b.initiative - a.initiative
                ),
            }
        })
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
                <div id="addFighters">
                    <h1>Управление бойцами</h1>
                    <button onClick={onOpenModal}>Добавить бойца</button>
                    <div id="presets">
                        {presets.map((e) => {
                            return (
                                <div className="preset" key={e.name}>
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
                                        <button>Удалить</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className={`modal ${isModalOpen ? '' : 'hidden'}`}>
                <div className="modalContent">
                    <h2>Добавить бойца</h2>
                    <form>
                        <div>
                            <div className="formFields">
                                <label>Имя</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Имя"
                                />
                            </div>
                            <div className="formFields">
                                <label>Здоровье</label>
                                <input
                                    type="number"
                                    name="hp"
                                    placeholder="Здоровье"
                                    min={1}
                                />
                            </div>
                            <div className="formFields">
                                <label>Количество действий</label>
                                <input
                                    type="number"
                                    name="maxActions"
                                    placeholder="Количество действий"
                                    min={1}
                                />
                            </div>
                            <div className="formFields">
                                <label>Класс защиты</label>
                                <input
                                    type="number"
                                    name="armorClass"
                                    placeholder="Класс защиты"
                                    min={1}
                                />
                            </div>
                            <div className="formFields">
                                <label>Инициатива</label>
                                <input
                                    type="number"
                                    name="initiative"
                                    placeholder="Инициатива"
                                    min={1}
                                />
                            </div>

                            <div className="formFields checkboxField">
                                <label>Сохранить как пресет</label>
                                <input type="checkbox" name="saveAsPreset" />
                            </div>
                        </div>
                        <div className="formActions">
                            <button formAction={addFighter}>Добавить</button>
                            <button type="button" onClick={onCloseModal}>
                                Закрыть
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
