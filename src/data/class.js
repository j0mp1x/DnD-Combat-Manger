class DndClass {
    constructor(name, firstLvlHp, hpPerLevel) {
        this.name = name
        this.firstLvlHp = Number(firstLvlHp)
        this.hpPerLevel = Number(hpPerLevel)
    }
}

const CLASS_LIST = {
    WARRIOR: new DndClass('Воин', 10, 6),
    MONK: new DndClass('Монах', 8, 5),
    WARLOCK: new DndClass('Колдун', 8, 5),
}

export { CLASS_LIST }
