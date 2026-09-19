import { useEffect, useState, useRef } from 'react'
import ConfirmModal from './components/confirmModal'
import FormModal from './components/formModal'
import getDataFromForm from './UTILITES/getData'
import { currentId } from './UTILITES/idCreator'
import useGameState from './hooks/useGameState'

function App() {
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        onConfirm: null,
        message: 'Вы уверены что хотите сделать это?',
    })

    const [formModal, setFormModal] = useState({
        isOpen: false,
        onSubmit: null,
        value: null,
    })

    const [actionError, setActionError] = useState(false)

    const onButtonClick = (callback) => {
        const success = callback()

        if (!success) {
            setActionError(true)

            setTimeout(() => {
                setActionError(false)
            }, 1000)
        }
    }

    const {
        gameState,
        handleSubmitTarget,
        onEndTurn,
        backUp,
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
    } = useGameState(setConfirmModal)

    const isFirstRender = useRef(true)

    useEffect(() => {
        loadFromLocalStorage()
    }, [])

    useEffect(() => {
        console.log(gameState)
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        saveToLocalStorage()
    }, [gameState, currentId])

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
                                                {f.initiative}. {f.name} (
                                                {f.dndClass.name})
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
                                                        message:
                                                            'Вы уверены, что хотите удалить бойца?',
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
                    <div className="combatActions">
                        <button
                            className={
                                actionError
                                    ? 'actionButton actionError'
                                    : 'actionButton'
                            }
                            onClick={() => {
                                onButtonClick(onUseAction)
                            }}
                        >
                            Действие (
                            {gameState.fighters[gameState.currentFighter]
                                ? gameState.fighters[gameState.currentFighter]
                                      .action
                                : ''}
                            )
                        </button>
                        <button
                            onClick={() => {
                                onButtonClick(onAttack)
                            }}
                        >
                            Атаковать
                        </button>
                        <select
                            className="targetSelect"
                            name="target"
                            value={
                                gameState.fighters[gameState.currentFighter]
                                    ?.target ?? ''
                            }
                            onChange={setTarget}
                        >
                            <option value="">Выбрать цель</option>
                            {gameState.fighters.map((e) => {
                                if (
                                    e.id !==
                                    gameState.fighters[gameState.currentFighter]
                                        .id
                                ) {
                                    return (
                                        <option key={e.id} value={e.id}>
                                            {e.name}
                                        </option>
                                    )
                                }
                                return null
                            })}
                        </select>
                    </div>
                    <div id="actions">
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
                            <button onClick={onEndCombat}>Закончить бой</button>
                            <button onClick={takeDamage}>Нанести урон</button>
                            <div className="globalTarget">
                                <select
                                    className="targetSelect"
                                    name="globalTarget"
                                    value={
                                        gameState.globalTarget
                                            ? gameState.fighters.find(
                                                  (e) =>
                                                      e.id ===
                                                      gameState.globalTarget
                                              )?.id
                                            : ''
                                    }
                                    onChange={setGlobalTarget}
                                >
                                    <option value="">Выбрать цель</option>
                                    {gameState.fighters.map((e) => {
                                        return (
                                            <option key={e.id} value={e.id}>
                                                {e.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="diceControls">
                                <form>
                                    <label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={
                                                gameState.globalDamageDice
                                                    .quantity
                                            }
                                            onChange={setGlobalDamageQ}
                                        />
                                    </label>
                                    <label>
                                        <select
                                            name="dices"
                                            onChange={setGlobalDamageDice}
                                        >
                                            <option value="4">d4</option>
                                            <option value="6">d6</option>
                                            <option value="8">d8</option>
                                            <option value="10">d10</option>
                                            <option value="12">d12</option>
                                            <option value="20">d20</option>
                                            <option value="100">d100</option>
                                        </select>
                                    </label>
                                </form>
                                <label>
                                    Или просто урон.
                                    <input
                                        type="number"
                                        name="justDamage"
                                        value={gameState.justDamage}
                                        onChange={setJustDamage}
                                    />
                                    (если тут 0, то будет бросок кубика)
                                </label>
                            </div>
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
                                                    message:
                                                        'Вы уверены, что хотите удалить пресет?',
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
                    message={confirmModal.message}
                    onClose={() => {
                        setConfirmModal({
                            isOpen: false,
                            onConfirm: null,
                            message: 'Вы уверены что хотите сделать это?',
                        })
                    }}
                />
            )}
        </div>
    )
}
export default App
