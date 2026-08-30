import { useState } from 'react'
import { fighters } from './data/fighters'

function App() {
    const [fightersState, setFightersState] = useState(fighters)

    const onReactionUse = (f) => {
        setFightersState((prev) =>
            prev.map((e) => {
                if (e.id === f.id) {
                    const newReaction = e.reaction ? false : true
                    return { ...e, reaction: newReaction }
                } else return e
            })
        )
    }

    return (
        <div>
            <h1>DnD Combat Manager</h1>
            <div id="initiativePanel">
                <h1>Раунд 1</h1> {/*Тут потом будет js код*/}
                <div id="listOfFighters">
                    {fightersState.map((f) => {
                        return (
                            <div className="fighter" key={f.id}>
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
            <button>Закончить ход</button>
        </div>
    )
}

export default App
