import { createNewId } from '../UTILITES/idCreator'

class Preset {
    constructor({
        name,
        maxHp,
        armorClass,
        maxActions = 1,
        id = createNewId(),
        str,
        dex,
        con,
        int,
        wis,
        cha,
    } = data) {
        this.id = id
        this.name = name
        this.maxActions = Number(maxActions)
        this.maxHp = Number(maxHp)
        this.armorClass = Number(armorClass)
        this.str = Number(str)
        this.dex = Number(dex)
        this.con = Number(con)
        this.int = Number(int)
        this.wis = Number(wis)
        this.cha = Number(cha)
    }
}

const createPreset = (data) => {
    return new Preset(data)
}

const Yoshioka = new Preset({
    name: 'Ёшиока',
    maxHp: 40,
    armorClass: 14,
    str: 14,
    dex: 14,
    con: 14,
    int: 14,
    wis: 14,
    cha: 14,
})

export { Preset, Yoshioka, createPreset }
