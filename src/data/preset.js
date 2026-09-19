import { ATTACK_MODIFIERS } from '../UTILITES/CONSTANTS'
import { rollDice } from '../UTILITES/dice'
import { createNewId } from '../UTILITES/idCreator'
import { CLASS_LIST } from './class'
import { sword } from './weapons'

class Preset {
    constructor({
        name,
        dndClass,
        level,
        maxHp,
        basedArmor = 10,
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
        this.basedArmor = Number(basedArmor)
        this.armorClass = 0
        this.str = Number(str)
        this.dex = Number(dex)
        this.con = Number(con)
        this.int = Number(int)
        this.wis = Number(wis)
        this.cha = Number(cha)
        this.proficiencyBonus = 2
        this.attacks = {
            attack: {
                name: 'Атака мечом',
                weapon: sword,
                damage: {
                    diceQuantity: sword.damage.diceQuantity,
                    diceType: sword.damage.diceType,
                },
                modifire: sword.getType(),
            },
        }
    }

    getPB() {
        return Math.ceil(this.level / 4) + 1
    }

    getMod(stat) {
        return Math.floor((stat - 10) / 2)
    }

    setMaxHp() {
        if (!this.isPlayer && this.maxHp) {
            this.hp = this.maxHp
        } else {
            let totalAddedHp = 0
            for (let i = this.level - 1; i > 0; i--) {
                totalAddedHp += this.dndClass.hpPerLevel + this.getMod(this.con)
            }
            this.maxHp =
                this.dndClass.firstLvlHp + this.getMod(this.con) + totalAddedHp // +
            //12
            this.hp = this.maxHp
        }
    }

    setHp(deltaHp, isHeal = false) {
        if (isHeal) {
            this.hp += deltaHp
            this.hp > this.maxHp ? (this.hp = this.maxHp) : (this.hp = this.hp)
        } else {
            this.hp -= deltaHp
        }
    }

    setParametrs() {
        if (this.armorClass) {
            this.armorClass = this.armorClass
        } else {
            if (this.dndClass.name === CLASS_LIST.BARBARIAN.name) {
                this.armorClass =
                    this.basedArmor +
                    this.getMod(this.dex) +
                    this.getMod(this.con)
            } else {
                this.armorClass = this.basedArmor + this.getMod(this.dex)
            }
        }
        this.proficiencyBonus = this.getPB()
        if (this.isPlayer === 'on') {
            this.setMaxHp()
        }
    }

    attack() {
        let mod
        if (this.attacks.attack.modifire === ATTACK_MODIFIERS.dex) {
            mod = this.getMod(this.dex)
        } else if (this.attacks.attack.modifire === ATTACK_MODIFIERS.str) {
            mod = this.getMod(this.str)
        } else if (this.attacks.attack.modifire === ATTACK_MODIFIERS.unity) {
            this.dex >= this.str
                ? (mod = this.getMod(this.dex))
                : (mod = this.getMod(this.str))
        }
        const dmg =
            rollDice(
                this.attacks.attack.damage.diceQuantity,
                this.attacks.attack.damage.diceType
            ) + mod
        return dmg
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
        str: 14,
        dex: 14,
        con: 16,
        int: 14,
        wis: 14,
        cha: 14,
    }),

    createPreset({
        name: 'Фарам',
        isPlayer: 'on',
        dndClass: CLASS_LIST.BARBARIAN,
        level: 2,
        maxHp: 25,
        str: 16,
        dex: 14,
        con: 16,
        int: 9,
        wis: 12,
        cha: 10,
    }),

    createPreset({
        name: 'Cirillo',
        isPlayer: 'on',
        dndClass: CLASS_LIST.ROUGE,
        level: 2,
        maxHp: 25,
        basedArmor: 11,
        str: 9,
        dex: 16,
        con: 14,
        int: 16,
        wis: 10,
        cha: 12,
    }),

    createPreset({
        name: 'Предвесник',
        isPlayer: 'on',
        dndClass: CLASS_LIST.PRIEST,
        level: 2,
        maxHp: 25,
        basedArmor: 14,
        str: 12,
        dex: 11,
        con: 16,
        int: 12,
        wis: 16,
        cha: 10,
    }),
]

export { Preset, defaultPresets, createPreset, updatePreset }
