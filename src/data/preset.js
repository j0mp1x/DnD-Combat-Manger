import { createNewId } from '../UTILITES/idCreator'

class Preset {
    constructor(name, hp, armorClass, maxActions = 1) {
        this.id = createNewId()
        this.name = name
        this.maxActions = Number(maxActions)
        this.maxHp = Number(hp)
        this.armorClass = armorClass
    }
}

const createPreset = ({ name, hp, armorClass, maxActions }) => {
    return new Preset(name, hp, armorClass, maxActions)
}

const Yoshioka = new Preset('Ёшиока', 40, 14, 1)

export { Preset, Yoshioka, createPreset }
