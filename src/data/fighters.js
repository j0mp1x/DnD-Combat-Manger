import { rollDice } from '../UTILITES/dice'
import { createNewId } from '../UTILITES/idCreator'
import { Preset } from './preset'

class Fighter extends Preset {
    constructor(data, initiative = rollDice(1, 20)) {
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
        data.initiative = rollDice(1, 20)
    }
    const fighter = new Fighter(data, data.initiative)
    fighter.setParametrs()
    return fighter
}

const updateFighter = (data, fighter) => {
    const newFighter = new Fighter(data)
    newFighter.id = fighter.id
    newFighter.initiative = fighter.initiative
    newFighter.setMaxHp()
    newFighter.setParametrs()
    return newFighter
}

const battleUpdate = (fighter, damage = 0) => {
    const newFighter = new Fighter(fighter)
    newFighter.id = fighter.id
    newFighter.initiative = fighter.initiative
    newFighter.hp = fighter.hp - damage
    newFighter.action = fighter.action
    newFighter.reaction = fighter.reaction
    return newFighter
}

export { fighters, createFighter, updateFighter, battleUpdate, Fighter }
