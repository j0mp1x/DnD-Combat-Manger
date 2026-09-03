let currentId = 0

const createNewId = () => {
    currentId++
    console.log(currentId)
    return currentId
}

export { createNewId }
