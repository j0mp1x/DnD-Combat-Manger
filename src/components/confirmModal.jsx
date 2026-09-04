const ConfirmModal = ({ isOpen, onConfirm, onClose, message }) => {
    return (
        <div>
            <div className={`modal ${isOpen ? '' : 'hidden'}`}>
                <div className="modalContent">
                    <h1>{message}</h1>
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
