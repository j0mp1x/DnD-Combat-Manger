const rollDice = (quantity, d) => {
    let totalValue = 0
    for (let i = 0; i < quantity; i++) {
        totalValue += Math.floor(Math.random() * d) + 1
    }
    return totalValue
}

export { rollDice }
