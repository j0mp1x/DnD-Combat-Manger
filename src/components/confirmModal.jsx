const ConfirmModal = ({ isOpen, onConfirm, onClose }) => {
    return (
        <div>
            <div className={`modal ${isOpen ? '' : 'hidden'}`}>
                <div className="modalContent">
                    <h1>Вы уверены что хотите сделать это?</h1>
                    <div className="formActions">
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
        </div>
    )
}

export default ConfirmModal
