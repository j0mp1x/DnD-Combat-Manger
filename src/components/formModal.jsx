import { CLASS_LIST } from '../data/class'

const FormModal = ({ isOpen, onSubmit, onClose, getData, value }) => {
    const handleSubmit = async (d) => {
        const data = await getData(d)
        await onSubmit(data, value ? value : '')
        onClose()
    }

    return (
        <div className={`modal ${isOpen ? '' : 'hidden'}`}>
            <div className="modalContent">
                <h2>Добавить бойца</h2>
                <form action={handleSubmit}>
                    <div>
                        <div className="formFields">
                            <label>
                                Имя
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Имя"
                                    defaultValue={value ? value.name : ''}
                                />
                            </label>
                        </div>
                        <div className="formFields">
                            <label>
                                Класс
                                <select name="dndClassList">
                                    <option value={CLASS_LIST.WARRIOR.name}>
                                        {CLASS_LIST.WARRIOR.name}
                                    </option>
                                    <option value={CLASS_LIST.MONK.name}>
                                        {CLASS_LIST.MONK.name}
                                    </option>
                                    <option value={CLASS_LIST.WARLOCK.name}>
                                        {CLASS_LIST.WARLOCK.name}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div className="formFields">
                            <label>
                                Уровень
                                <input
                                    type="text"
                                    name="level"
                                    placeholder="Уровень"
                                    defaultValue={value ? value.level : ''}
                                />
                            </label>
                        </div>
                        <div className="formFields">
                            <label>
                                Здоровье
                                <input
                                    type="number"
                                    name="maxHp"
                                    placeholder="Здоровье"
                                    min={1}
                                    defaultValue={value ? value.maxHp : ''}
                                />
                            </label>
                        </div>
                        <div className="formFields">
                            <label>
                                Количество действий
                                <input
                                    type="number"
                                    name="maxActions"
                                    placeholder="Количество действий"
                                    min={1}
                                    defaultValue={value ? value.maxActions : ''}
                                />
                            </label>
                        </div>
                        <div className="formFields">
                            <label>
                                Класс защиты
                                <input
                                    type="number"
                                    name="armorClass"
                                    placeholder="Класс защиты"
                                    min={1}
                                    defaultValue={value ? value.armorClass : ''}
                                />
                            </label>
                        </div>
                        <div className="stateBlockForm">
                            <label>
                                Сила
                                <input
                                    type="number"
                                    name="str"
                                    placeholder="СИЛ"
                                    min={1}
                                    max={20}
                                    defaultValue={value ? value.str : ''}
                                />
                            </label>
                            <label>
                                Ловкость
                                <input
                                    type="number"
                                    name="dex"
                                    placeholder="ЛОВ"
                                    min={1}
                                    max={20}
                                    defaultValue={value ? value.dex : ''}
                                />
                            </label>
                            <label>
                                Телосложение
                                <input
                                    type="number"
                                    name="con"
                                    placeholder="ТЕЛ"
                                    min={1}
                                    max={20}
                                    defaultValue={value ? value.con : ''}
                                />
                            </label>
                            <label>
                                Интелект
                                <input
                                    type="number"
                                    name="int"
                                    placeholder="ИНТ"
                                    min={1}
                                    max={20}
                                    defaultValue={value ? value.int : ''}
                                />
                            </label>
                            <label>
                                Мудрость
                                <input
                                    type="number"
                                    name="wis"
                                    placeholder="МДР"
                                    min={1}
                                    max={20}
                                    defaultValue={value ? value.wis : ''}
                                />
                            </label>
                            <label>
                                Харизма
                                <input
                                    type="number"
                                    name="cha"
                                    placeholder="ХАР"
                                    min={1}
                                    max={20}
                                    defaultValue={value ? value.cha : ''}
                                />
                            </label>
                        </div>
                        {!value && (
                            <div className="formFields">
                                <label>
                                    Инициатива
                                    <input
                                        type="number"
                                        name="initiative"
                                        placeholder="Заполняй если кидал кубик ирл"
                                        min={1}
                                        max={20}
                                    />
                                </label>
                            </div>
                        )}

                        {!value && (
                            <div className="formFields checkboxField">
                                <label>
                                    Сохранить как пресет
                                    <input
                                        type="checkbox"
                                        name="saveAsPreset"
                                    />
                                </label>
                            </div>
                        )}
                        <div className="formFields checkboxField">
                            <label>
                                Это игрок?
                                <input type="checkbox" name="isPlayer" />
                            </label>
                        </div>
                    </div>
                    <div className="formActions">
                        <button>Добавить</button>
                        <button type="button" onClick={onClose}>
                            Закрыть
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormModal
