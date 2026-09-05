import { CLASS_LIST } from '../data/class'

const getDataFromForm = (data) => {
    const selectedClass = Object.values(CLASS_LIST).find(
        (dndClass) => dndClass.name === data.get('dndClassList')
    )
    return {
        name: data.get('name'),
        dndClass: selectedClass,
        level: data.get('level'),
        maxHp: data.get('maxHp'),
        maxActions: data.get('maxActions'),
        armorClass: data.get('armorClass'),
        initiative: data.get('initiative'),
        saveAsPreset: data.get('saveAsPreset'),
        str: data.get('str'),
        dex: data.get('dex'),
        con: data.get('con'),
        int: data.get('int'),
        wis: data.get('wis'),
        cha: data.get('cha'),
        isPlayer: data.get('isPlayer'),
    }
}
export default getDataFromForm
