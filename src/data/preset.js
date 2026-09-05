import { createNewId } from '../UTILITES/idCreator'
import { CLASS_LIST } from './class'

class Preset {
    constructor({
        name,
        dndClass,
        level,
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
        isPlayer,
    }) {
        this.id = id
        this.isPlayer = isPlayer
        this.name = name
        this.dndClass = dndClass
        this.level = Number(level)
        this.maxActions = Number(maxActions) > 0 ? Number(maxActions) : 1
        this.maxHp = Number(maxHp)
        this.hp = Number(this.maxHp)
        this.armorClass = 1
        this.str = Number(str)
        this.dex = Number(dex)
        this.con = Number(con)
        this.int = Number(int)
        this.wis = Number(wis)
        this.cha = Number(cha)
    }

    getMod(stat) {
        return (stat - 10) / 2
    }

    setMaxHp() {
        let totalAddedHp = 0
        for (let i = this.level - 1; i > 0; i--) {
            totalAddedHp += this.dndClass.hpPerLevel + this.getMod(this.con)
        }
        return this.dndClass.firstLvlHp + totalAddedHp
    }

    setParametrs() {
        this.armorClass = 10 + this.getMod(this.dex)
        if (this.isPlayer) {
            this.maxHp = this.setMaxHp()
            this.hp = this.maxHp
        }
    }
}

const createPreset = (data) => {
    const preset = new Preset(data)
    preset.setParametrs()
    return preset
}

const defaultPresets = [
    createPreset({
        name: 'Ёшиока',
        isPlayer: true,
        dndClass: CLASS_LIST.WARRIOR,
        level: 3,
        maxHp: 40,
        armorClass: 14,
        str: 14,
        dex: 14,
        con: 14,
        int: 14,
        wis: 14,
        cha: 14,
    }),

    createPreset({
        name: 'Ринтаро',
        isPlayer: true,
        dndClass: CLASS_LIST.MONK,
        level: 3,
        maxHp: 40,
        armorClass: 13,
        str: 14,
        dex: 14,
        con: 14,
        int: 14,
        wis: 14,
        cha: 14,
    }),

    createPreset({
        name: 'Рэн',
        isPlayer: true,
        dndClass: CLASS_LIST.WARLOCK,
        level: 3,
        maxHp: 40,
        armorClass: 12,
        str: 14,
        dex: 14,
        con: 14,
        int: 14,
        wis: 14,
        cha: 14,
    }),
]

export { Preset, defaultPresets, createPreset }
