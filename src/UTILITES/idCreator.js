let currentId = 0

const createNewId = () => {
    currentId++
    return currentId
}

const setCurrentId = (id) => {
    currentId = id
}

export { createNewId, setCurrentId, currentId }
