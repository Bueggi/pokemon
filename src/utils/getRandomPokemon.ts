const max = 493

export const getRandomPokemon: (notThisOne?: number) => number = (notThisOne?: number) => { 
    const pokemonIndex = Math.floor(Math.random() * (max - 1) + 1)
    
    if (pokemonIndex != notThisOne) { 
        return pokemonIndex
    }
    else {
        return getRandomPokemon(notThisOne)
    }
}

export const getOptionsForVote = () => {
    const firstPokemon = getRandomPokemon()
    const secondPokemon = getRandomPokemon(firstPokemon)

    return [firstPokemon, secondPokemon]
}