import { createNewId } from '../UTILITES/idCreator'

class Fighter {
    constructor(name, hp, initiative) {
        this.id = createNewId()
        this.name = name
        this.initiative = initiative
        this.reaction = true
        this.action = true
        this.hp = hp
    }
}

let fighters = []

const AddFighter = (name, hp, initiative) => {
    fighters.push(new Fighter(name, hp, initiative))
}

AddFighter('player 1', 40, 12)
AddFighter('player 2', 40, 7)
AddFighter('player 3', 40, 20)

export { fighters }
