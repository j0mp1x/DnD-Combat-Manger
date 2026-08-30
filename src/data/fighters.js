import { createNewId } from '../UTILITES/idCreator'

class Fighter {
    constructor(name, hp, initiative = 1, maxActions = 1) {
        this.id = createNewId()
        this.name = name
        this.initiative = initiative
        this.reaction = true
        this.maxActions = maxActions
        this.action = this.maxActions
        this.maxHp = hp
        this.hp = this.maxHp
    }
}

let fighters = []

const AddFighter = (name, hp, initiative, maxActions) => {
    fighters.push(new Fighter(name, hp, initiative, maxActions))
}

AddFighter('player 1', 40, 12, 2)
AddFighter('player 2', 40, 7)
AddFighter('player 3', 40, 20)

export { fighters }
