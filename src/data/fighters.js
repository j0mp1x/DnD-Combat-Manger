import { rollDice } from '../UTILITES/dice'
import { createNewId } from '../UTILITES/idCreator'

class Fighter {
    constructor(name, hp, initiative = 1, maxActions = 1, armorClass) {
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

const createFighter = (
    prev,
    name,
    hp,
    maxActions,
    armorClass,
    initiative = 1
) => {
    return [
        ...prev.fighters,
        new Fighter(name, hp, initiative, maxActions, armorClass),
    ]
}

const createFighterFromPreset = (
    prev,
    { name, hp, maxActions, armorClass } = preset
) => {
    return createFighter(prev, name, hp, maxActions, armorClass, rollDice())
}

export { fighters, createFighter, Fighter, createFighterFromPreset }
