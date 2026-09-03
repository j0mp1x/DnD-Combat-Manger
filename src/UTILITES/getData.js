const getDataFromForm = (data) => {
    const name = data.get('name')
    const maxHp = data.get('maxHp')
    const maxActions = data.get('maxActions')
    const armorClass = data.get('armorClass')
    const initiative = data.get('initiative')
    const saveAsPreset = data.get('saveAsPreset')

    return {
        name,
        maxHp,
        maxActions,
        armorClass,
        initiative,
        saveAsPreset,
    }
}
export default getDataFromForm
