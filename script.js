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
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.style.display = "block";
        imgElement.src = pokemonSprite;

       
        clearError();

    } catch (error) {
        console.error("Error:", error.message);
        showError("There is no such Pokémon!");
    }
}

function showError(message) {
    clearError();
    const errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    errorMsg.textContent = message;
    errorMsg.style.color = "red";
    document.getElementById("errorContainer").appendChild(errorMsg);
}

function clearError() {
    const existingError = document.getElementById("error-msg");
    if (existingError) {
        existingError.remove();
    }
}


document.getElementById("fetchButton").addEventListener("click", fetchData);
