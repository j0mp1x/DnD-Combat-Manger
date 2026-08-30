let currentId = 0

const createNewId = () => {
    currentId++
    return currentId
}

export { createNewId }
