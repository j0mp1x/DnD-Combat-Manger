const ConfirmModal = ({ isOpen, onConfirm, onClose }) => {
    return (
        <div>
            <div className={`modal ${isOpen ? '' : 'hidden'}`}>
                <div className="modalContent">
                    <h1>Вы уверены что хотите удалить пресет?</h1>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                    >
                        Да
                    </button>
                    <button onClick={onClose}>Нет</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
