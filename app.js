
// document.querySelector('.select-icon').addEventListener('click', () => {
//   alert('Dropdown clicked!');
//   // Later you can open a custom menu or modal here
// });


const input = document.getElementById("cityinput");
const suggestionsDiv = document.getElementById("suggestions");

input.addEventListener("input", async () => {
    const query = input.value.trim();
    if (query.length < 2) {
        suggestionsDiv.innerHTML = "";
        return;
    }

    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${query}&format=json&limit=5`, {
        // headers: {
        //     "X-RapidAPI-Key": "YOUR_API_KEY",
        //     "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
        // }
    });

    const data = await response.json();
    const cities = data.data;
    console.log(cities);
    

   suggestionsDiv.innerHTML = ""; // Clear old suggestions

data.forEach(place => {
    const div = document.createElement("div");
    div.classList.add("suggestion");
    div.textContent = place.display_name; // safer than innerHTML
    div.addEventListener("click", () => {
        input.value = place.display_name;
        suggestionsDiv.innerHTML = "";
    });
    suggestionsDiv.appendChild(div);
});

    document.querySelectorAll(".suggestion").forEach(item => {
        item.addEventListener("click", () => {
            input.value = item.textContent;
            suggestionsDiv.innerHTML = "";
        });
    });
});

