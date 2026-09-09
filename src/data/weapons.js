import { ATTACK_MODIFIERS, WEAPON_TYPES } from '../UTILITES/CONSTANTS'

class Weapon {
    constructor({ name, type, isFinesse, damage }) {
        this.name = name
        this.type = type
        this.isFinesse = isFinesse
        this.damage = damage
    }

    getType() {
        if (this.type === WEAPON_TYPES.RANGED_WEAPON) {
            return ATTACK_MODIFIERS.dex
        } else if (this.type === WEAPON_TYPES && this.isFinesse) {
            return ATTACK_MODIFIERS.unity
        } else {
            return ATTACK_MODIFIERS.str
        }
    }
}

const sword = new Weapon({
    name: 'sword',
    type: WEAPON_TYPES.MELEE_WEAPON,
    isFinesse: true,
    damage: { diceQuantity: 1, diceType: 6 },
})

export { sword }
