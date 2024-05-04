async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.style.display = "block";
        imgElement.src = pokemonSprite;
        imgElement.nextElementSibling?.remove(); 
    } catch (error) {
        console.error("Error:", error.message);
        showError("There is no such Pokémon!"); 
    }
}

function showError(message) {
    const existingError = document.getElementById("error-msg"); 
    if (existingError) {
        existingError.textContent = message; 
        const errorMsg = document.createElement("p");
        errorMsg.id = "error-msg";
        errorMsg.textContent = message;
        errorMsg.style.color = "red";
        document.body.appendChild(errorMsg); 
    }
}

