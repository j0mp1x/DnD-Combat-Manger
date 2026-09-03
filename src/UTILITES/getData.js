const getDataFromForm = (data) => {
    return {
        name: data.get('name'),
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
    }
}
export default getDataFromForm
