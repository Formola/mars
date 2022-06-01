export const deepClone = (object) => JSON.parse(JSON.stringify(object))
export const numberOfTrueValues = (object) => {
    var counter = 0
    Object.entries(object).forEach(entryKeyValueArray => 
        entryKeyValueArray[1] ? counter++ : null
    )
    return counter
}
export const calculateFinalPoints = (playerPoints) => {
    var points = playerPoints.terraformingPoints + playerPoints.cardsPoints + playerPoints.citiesPoints + playerPoints.forestsPoints
    playerPoints.milestonesPoints.forEach(milestone => points += milestone.pv)
    playerPoints.awardsPoints.forEach(award => points += award.pv)
    return points
}
export const getWinner = (playersStats) => {
    let winner = {}
    playersStats.forEach((playerStats, index) => {
        if (index === 0) {
            winner = playerStats
        } else if (index > 0) {
            if (winner.points.finalPoints < playerStats.points.finalPoints) {
                winner = playerStats
            }
        } 
    })
    return winner
}