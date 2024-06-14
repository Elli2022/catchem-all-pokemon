async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase().trim();
        
        if (!pokemonName) {
            showError("Please enter a Pokémon name!");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        updatePokemonCard(data);

        clearError();

    } catch (error) {
        console.error("Error:", error.message);
        showError("There is no such Pokémon!");
    }
}

function updatePokemonCard(data) {
    const card = document.getElementById("pokemonCard");
    const sprite = document.getElementById("pokemonSprite");
    const nameDisplay = document.getElementById("pokemonNameDisplay");
    const typeDisplay = document.getElementById("pokemonType");
    const abilityDisplay = document.getElementById("pokemonAbility");

    sprite.src = data.sprites.front_default;
    nameDisplay.textContent = capitalizeFirstLetter(data.name);
    typeDisplay.textContent = `Type: ${data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ')}`;
    abilityDisplay.textContent = `Ability: ${capitalizeFirstLetter(data.abilities[0].ability.name)}`;

    card.style.display = "block";
}

function showError(message) {
    clearError();
    const errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    errorMsg.textContent = message;
    document.getElementById("errorContainer").appendChild(errorMsg);
}

function clearError() {
    const existingError = document.getElementById("error-msg");
    if (existingError) {
        existingError.remove();
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById("fetchButton").addEventListener("click", fetchData);
