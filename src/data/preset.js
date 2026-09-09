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
        return Math.floor((stat - 10) / 2)
    }

    setMaxHp() {
        if (!this.isPlayer) {
            this.hp = this.maxHp
        } else {
            let totalAddedHp = 0
            for (let i = this.level - 1; i > 0; i--) {
                totalAddedHp += this.dndClass.hpPerLevel + this.getMod(this.con)
            }
            this.maxHp =
                this.dndClass.firstLvlHp +
                this.getMod(this.con) +
                totalAddedHp +
                12
            this.hp = this.maxHp
        }
    }

    setParametrs() {
        this.armorClass = 10 + this.getMod(this.dex)
        if (this.isPlayer === 'on') {
            this.setMaxHp()
            console.log('lol')
        }
    }
}

const createPreset = (data) => {
    const preset = new Preset(data)
    preset.setMaxHp()
    preset.setParametrs()
    return preset
}

const updatePreset = (data, preset) => {
    const newPreset = new Preset(data)
    newPreset.id = preset.id
    newPreset.setMaxHp()
    newPreset.setParametrs()
    return newPreset
}

const defaultPresets = [
    createPreset({
        name: 'Ёшиока',
        isPlayer: 'on',
        dndClass: CLASS_LIST.WARRIOR,
        level: 3,
        armorClass: 14,
        str: 12,
        dex: 16,
        con: 14,
        int: 10,
        wis: 12,
        cha: 14,
    }),

    createPreset({
        name: 'Ринтаро',
        isPlayer: 'on',
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
        isPlayer: 'on',
        dndClass: CLASS_LIST.WARLOCK,
        level: 3,
        maxHp: 40,
        armorClass: 12,
        str: 14,
        dex: 14,
        con: 16,
        int: 14,
        wis: 14,
        cha: 14,
    }),
]

export { Preset, defaultPresets, createPreset, updatePreset }
