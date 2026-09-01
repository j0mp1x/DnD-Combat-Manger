import { rollDice } from '../UTILITES/dice'
import { createNewId } from '../UTILITES/idCreator'

class Fighter {
    constructor(name, hp, armorClass, maxActions = 1, initiative = rollDice()) {
        this.id = createNewId()
        this.name = name
        this.initiative = Number(initiative)
        this.reaction = true
        this.maxActions = Number(maxActions)
        this.action = Number(this.maxActions)
        this.maxHp = Number(hp)
        this.hp = Number(this.maxHp)
        this.armorClass = armorClass
    }
}

let fighters = []

const createFighter = (prev, name, hp, armorClass, maxActions, initiative) => {
    if (initiative <= 0) {
        initiative = rollDice()
    }
    if (maxActions <= 0) {
        maxActions = 1
    }
    return [
        ...prev.fighters,
        new Fighter(name, hp, armorClass, maxActions, initiative),
    ]
}

const createFighterFromPreset = (
    prev,
    { name, hp, armorClass, maxActions } = preset
) => {
    return createFighter(prev, name, hp, armorClass, maxActions)
}

export { fighters, createFighter, Fighter, createFighterFromPreset }
