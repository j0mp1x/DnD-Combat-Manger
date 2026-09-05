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

const createFighter = (data) => {
    if (data.initiative <= 0) {
        data.initiative = rollDice()
    }
    const fighter = new Fighter(data, data.initiative)
    fighter.setParametrs()
    console.log(fighter)
    return fighter
}

const updateFighter = (data, fighter) => {
    const newFighter = new Fighter(data)
    newFighter.id = fighter.id
    newFighter.initiative = fighter.initiative
    newFighter.setParametrs()
    console.log('is new ', newFighter)
    return newFighter
}

export { fighters, createFighter, updateFighter, Fighter }
