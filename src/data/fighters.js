import { rollDice } from '../UTILITES/dice'
import { createNewId } from '../UTILITES/idCreator'
import { Preset } from './preset'

class Fighter extends Preset {
    constructor(data, initiative = rollDice()) {
        super(data)
        this.id = createNewId()
        this.initiative = Number(initiative) + this.getMod(this.dex)
        this.reaction = true
        this.action = Number(this.maxActions)
    }
}

let fighters = []

const createFighter = (prev, data) => {
    if (data.initiative <= 0) {
        data.initiative = rollDice()
    }
    const fighter = new Fighter(data, data.initiative)
    fighter.setParametrs()
    return [...prev.fighters, fighter]
}

export { fighters, createFighter, Fighter }
