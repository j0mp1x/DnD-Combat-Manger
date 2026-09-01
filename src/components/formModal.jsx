const FormModal = ({ isOpen, onSubmit, onClose }) => {
    return (
        <div className={`modal ${isOpen ? '' : 'hidden'}`}>
            <div className="modalContent">
                <h2>Добавить бойца</h2>
                <form action={onSubmit}>
                    <div>
                        <div className="formFields">
                            <label>Имя</label>
                            <input type="text" name="name" placeholder="Имя" />
                        </div>
                        <div className="formFields">
                            <label>Здоровье</label>
                            <input
                                type="number"
                                name="hp"
                                placeholder="Здоровье"
                                min={1}
                            />
                        </div>
                        <div className="formFields">
                            <label>Количество действий</label>
                            <input
                                type="number"
                                name="maxActions"
                                placeholder="Количество действий"
                                min={1}
                            />
                        </div>
                        <div className="formFields">
                            <label>Класс защиты</label>
                            <input
                                type="number"
                                name="armorClass"
                                placeholder="Класс защиты"
                                min={1}
                            />
                        </div>
                        <div className="formFields">
                            <label>Инициатива</label>
                            <input
                                type="number"
                                name="initiative"
                                placeholder="Заполняй если кидал кубик ирл"
                                min={1}
                                max={20}
                            />
                        </div>

                        <div className="formFields checkboxField">
                            <label>Сохранить как пресет</label>
                            <input type="checkbox" name="saveAsPreset" />
                        </div>
                    </div>
                    <div className="formActions">
                        <button onClick={onClose}>Добавить</button>
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
