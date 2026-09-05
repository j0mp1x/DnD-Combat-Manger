import { rollDice } from '../UTILITES/dice'
import { createNewId } from '../UTILITES/idCreator'
import { Preset } from './preset'

class Fighter extends Preset {
    constructor(data, initiative = rollDice()) {
        super(data)
        this.id = createNewId()
        this.initiative = Number(initiative)
        this.reaction = true
        this.action = Number(this.maxActions)
    }
}

let fighters = []

const createFighter = (prev, data, initiative) => {
    if (initiative <= 0) {
        initiative = rollDice()
    }
    const fighter = new Fighter(data, initiative)
    fighter.setParametrs()
    return [...prev.fighters, fighter]
}

export { fighters, createFighter, Fighter }
