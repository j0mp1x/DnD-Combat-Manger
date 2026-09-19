import { useState, useEffect } from 'react'
import {
    fighters,
    createFighter,
    updateFighter,
    battleUpdate,
} from '../data/fighters'
import { defaultPresets, createPreset } from '../data/preset'
import { setCurrentId, currentId } from '../UTILITES/idCreator'
import { updatePreset } from '../data/preset'
import { rollDice } from '../UTILITES/dice'

const useGameState = (setConfirmModal) => {
    // States and Effects

    const [gameState, setGameState] = useState({
        fighters: fighters.sort((a, b) => b.initiative - a.initiative),
        presets: [...defaultPresets],
        round: 1,
        currentFighter: 0,
        globalTarget: null,
        globalDamageDice: { quantity: 1, dice: 6 },
        justDamage: 0,
    })

    const [prevGameState, setPrevGameState] = useState([{}])

    // localStorage

    const saveToLocalStorage = () => {
        localStorage.setItem('gameState', JSON.stringify(gameState))
        localStorage.setItem('currentId', JSON.stringify(currentId))
    }

    const loadFromLocalStorage = () => {
        try {
            let storedGameState = localStorage.getItem('gameState')
            if (storedGameState) {
                storedGameState = JSON.parse(storedGameState)
                setGameState((prev) => {
                    return {
                        ...storedGameState,
                        fighters: storedGameState.fighters.map((e) => {
                            return updateFighter(e, e)
                        }),
                        presets: storedGameState.presets.map((e) => {
                            return updatePreset(e, e)
                        }),
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }

        let storedCurrentId = localStorage.getItem('currentId')
        if (storedCurrentId) {
            storedCurrentId = Number(JSON.parse(storedCurrentId))
            setCurrentId(storedCurrentId)
        }
    }

    // Fighter

    const addFighter = (data) => {
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: [...prev.fighters, createFighter(data)].sort(
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

    const deleteAllFighters = () => {
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: [],
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
                        return updateFighter(data, fighter)
                    } else return e
                }),
            }
        })
    }

    // Preset

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
                        return updatePreset(data, preset)
                    } else return e
                }),
            }
        })
    }

    // interface and actions

    const handleSubmitTarget = (data) => {
        const target = gameState.fighters.find(
            (e) => e.id === Number(data.get('target'))
        )
        gameState.fighters[gameState.currentFighter].target = target

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })

        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters.map((e) => {
                    if (e.id === prev.fighters[prev.currentFighter].id) {
                        const cf = battleUpdate(e)
                        cf.target = target
                        return cf
                    } else return e
                }),
            }
        })
    }

    const setTarget = (event) => {
        const targetId = Number(event.target.value)

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })

        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters.map((e) => {
                    if (e.id === prev.fighters[prev.currentFighter].id) {
                        const cf = battleUpdate(e)
                        cf.target = targetId
                        return cf
                    } else return e
                }),
            }
        })
    }

    const setGlobalTarget = (event) => {
        const id = Number(event.target.value)

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })

        setGameState((prev) => {
            return {
                ...prev,
                globalTarget: id,
            }
        })
    }

    const setGlobalDamageQ = async (event) => {
        const q = Number(event.target.value)

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })

        setGameState((prev) => {
            return {
                ...prev,
                globalDamageDice: { ...prev.globalDamageDice, quantity: q },
            }
        })
    }
    const setGlobalDamageDice = async (event) => {
        const q = Number(event.target.value)

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })

        setGameState((prev) => {
            return {
                ...prev,
                globalDamageDice: { ...prev.globalDamageDice, dice: q },
            }
        })
    }

    const setJustDamage = (event) => {
        const d = Number(event.target.value)

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })

        setGameState((prev) => {
            return {
                ...prev,
                justDamage: d,
            }
        })
    }

    const takeDamage = () => {
        if (gameState.globalTarget && gameState.globalDamageDice.quantity) {
            const target = gameState.globalTarget
            let damage = rollDice(
                gameState.globalDamageDice.quantity,
                gameState.globalDamageDice.dice
            )

            if (gameState.justDamage) {
                damage = gameState.justDamage
            }

            setPrevGameState((prev) => {
                return [...prev, gameState]
            })
            setGameState((prev) => {
                return {
                    ...prev,
                    fighters: prev.fighters.map((e) => {
                        if (e.id === target) {
                            const cf = battleUpdate(e, damage)
                            return cf
                        } else return e
                    }),
                    justDamage: 0,
                }
            })
        }
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

    const onEndTurn = () => {
        if (gameState.fighters.length !== 0) {
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
                            const cf = battleUpdate(e)
                            cf.action = e.maxActions
                            cf.reaction = true
                            return cf
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
    }

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
                        const cf = battleUpdate(e)
                        cf.reaction = newReaction
                        return cf
                    } else return e
                }),
            }
        })
    }

    const onEndCombat = () => {
        setGameState((prev) => {
            return {
                ...prev,
                currentFighter: 0,
                round: 1,
                fighters: prev.fighters.map((e) => {
                    const cf = battleUpdate(e)
                    cf.action = e.maxActions
                    cf.reaction = true
                    return cf
                }),
            }
        })
        setConfirmModal({
            isOpen: true,
            onConfirm: deleteAllFighters,
            message: 'Удалить всех бойцов?',
        })
    }

    const onUseAction = () => {
        if (gameState.fighters.length === 0) {
            return false
        }

        if (gameState.fighters[gameState.currentFighter].action <= 0) {
            return false
        }

        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters.map((e) => {
                    if (e.id === prev.fighters[prev.currentFighter].id) {
                        const changedFighter = battleUpdate(e)
                        changedFighter.action =
                            prev.fighters[prev.currentFighter].action - 1
                        return changedFighter
                    } else return e
                }),
            }
        })

        return true
    }

    const onAttack = () => {
        let attacer = gameState.fighters[gameState.currentFighter]

        if (attacer.target) {
            if (onUseAction()) {
                let target = gameState.fighters.find(
                    (e) => e.id === attacer.target
                )
                console.log(target)

                battleUpdateFighter(target, attacer.attack())

                return true
            } else return false
        } else return false
    }

    const battleUpdateFighter = (fighter, damage) => {
        setPrevGameState((prev) => {
            return [...prev, gameState]
        })
        setGameState((prev) => {
            return {
                ...prev,
                fighters: prev.fighters.map((e) => {
                    if (e.id === fighter.id) {
                        return battleUpdate(fighter, damage)
                    } else return e
                }),
            }
        })
    }

    // RETURN

    return {
        gameState,
        handleSubmitTarget,
        backUp,
        onEndTurn,
        loadFromLocalStorage,
        saveToLocalStorage,
        addFighter,
        editFighter,
        deleteAllFighters,
        deleteFighter,
        addPreset,
        editPreset,
        deletePreset,
        onEndCombat,
        onReactionUse,
        onUseAction,
        battleUpdateFighter,
        onAttack,
        setTarget,
        takeDamage,
        setGlobalTarget,
        setGlobalDamageQ,
        setGlobalDamageDice,
        setJustDamage,
    }
}

export default useGameState
