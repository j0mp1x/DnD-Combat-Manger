import { createNewId } from '../UTILITES/idCreator'

class Preset {
    constructor(name, hp, maxActions = 1, armorClass) {
        this.id = createNewId()
        this.name = name
        this.maxActions = Number(maxActions)
        this.maxHp = Number(hp)
        this.armorClass = armorClass
    }
}

const Yoshioka = new Preset('Ёшиока', 40, 1, 14)

export { Preset, Yoshioka }
