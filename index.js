const searchButton = document.getElementById("search");
const randomButton = document.getElementById("random");
const pokemonNameInput = document.getElementById("pokemonName");
const pokemonContainer = document.getElementById("pokemonDetails");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const displayPokemonData = (pokemonData) => {
    pokemonContainer.innerHTML = ""
    const pokemonShinyImg =  pokemonData.sprites.front_shiny
    const pokemonImg = pokemonData.sprites.front_default
    const pokemonWeight = pokemonData.weight;
    const pokemonname = pokemonData.name;
    const pokemonType = pokemonData.types[0].type.name;
    const pokemonHeight = pokemonData.height;

    let shinyPokemon = false;




    

    const pokemonHTML = `
     <h1 class="pokemonname">${pokemonname} </h1>
     <img  id="pokemon-img" src="${pokemonImg}" alt="pokemon-img" class="pokemon-image" />
     <button id="shiny-button">Shiny </button>
     <p> Weigth: ${pokemonWeight / 10 }kg </p>
     <p> Type : ${pokemonType} </p>
     <p> Height : ${pokemonHeight / 10}m </p>
     
    `;



    pokemonContainer.innerHTML = pokemonHTML;

    const shinyButton = document.getElementById("shiny-button");
    const currentpokemonImage = document.getElementById("pokemon-img")

    shinyButton.addEventListener("click" , () => {
        currentpokemonImage.src = shinyPokemon ? pokemonImg : pokemonShinyImg;
        shinyPokemon = !shinyPokemon;
    })
     
};


const getPokemonData = async (name) => { 
    try {
        const response = await fetch(API_URL + name);

        

        const data = await response.json();
        if(data) displayPokemonData(data);

    } catch (error){
        console.log(error);

    }

};

document.addEventListener("DOMContentLoaded", () => {
    getPokemonData("pikachu");
});


searchButton.addEventListener("click", () => {
    if(pokemonNameInput.value.trim()) {
        getPokemonData(pokemonNameInput.value);
        pokemonNameInput
    } else {
        alert("Please enter pokemon name");
    }
    
});

const randomPokemon = () => {
    const totalPokemon = 1025;
    const randomNumber = Math.floor(Math.random() * totalPokemon);
    
    return randomNumber === 0 ? 1 : randomNumber
};

randomButton.addEventListener("click", () => {
    let number = randomPokemon();
    getPokemonData(number);
});