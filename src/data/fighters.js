import { createNewId } from '../UTILITES/idCreator'

class Fighter {
    constructor(name, hp) {
        this.id = createNewId()
        this.name = name
        this.initiative = null
        this.reaction = true
        this.action = true
        this.hp = hp
    }
}

let fighters = []

const AddFighter = (name, hp) => {
    fighters.push(new Fighter(name, hp))
}

AddFighter('player 1', 40)
AddFighter('player 2', 40)
AddFighter('player 3', 40)

export { fighters }
