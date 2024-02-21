let pets = [];
let money = 0;
let buyAmount = 0; // Initial buy amount set to 0
let petCostMultiplier = 1.5; // Exponential increase in pet cost

class Pet {
    constructor(name) {
        this.name = name;
        this.hunger = 95; // Initial hunger level set to 95
        this.cleanliness = 95; // Initial cleanliness level set to 95
        this.happiness = 95; // Initial happiness level set to 95
        this.health = 100; // Initial health level set to 100
        this.id = pets.length; // Set the ID based on the current length of the pets array
        pets.push(this); // Add the pet to the 'pets' array when it's created
        this.createUI();
    }

    feed() {
        this.hunger += 10;
        if (this.hunger > 100) this.hunger = 100;
        this.updateUI();
    }

    clean() {
        this.cleanliness += 10;
        if (this.cleanliness > 100) this.cleanliness = 100;
        this.updateUI();
    }

    play() {
        this.happiness += 10;
        if (this.happiness > 100) this.happiness = 100;
        this.updateUI();
    }

    updateHealth() {
        if (this.hunger === 0 || this.cleanliness === 0 || this.happiness === 0) {
            this.health -= 10;
        }
        if (this.health <= 0) {
            this.die();
        }
        this.updateUI();
    }

    die() {
        // Remove the pet from the array and update the UI
        pets.splice(this.id, 1);
        const petDiv = document.getElementById(`pet-${this.id}`);
        petDiv.remove();
    }

    createUI() {
        const petContainer = document.getElementById('pet-container');
        const petDiv = document.createElement('div');
        petDiv.className = 'pet';
        petDiv.id = `pet-${this.id}`;
        petDiv.innerHTML = `
            <h2>${this.name}</h2>
            <img src="monkey.jpg" alt="${this.name}" width="50"> <!-- Adjusted image size to make pets smaller -->
            <p class="hunger">Hunger: ${this.hunger}</p>
            <p class="cleanliness">Cleanliness: ${this.cleanliness}</p>
            <p class="happiness">Happiness: ${this.happiness}</p>
            <p class="health">Health: ${this.health}</p>
            <button onclick="pets[${this.id}].feed()">Feed</button>
            <button onclick="pets[${this.id}].clean()">Clean</button>
            <button onclick="pets[${this.id}].play()">Play</button>
        `;
        petContainer.appendChild(petDiv);
    }

    updateUI() {
        const petDiv = document.getElementById(`pet-${this.id}`);
        petDiv.querySelector('.hunger').innerText = `Hunger: ${this.hunger}`;
        petDiv.querySelector('.cleanliness').innerText = `Cleanliness: ${this.cleanliness}`;
        petDiv.querySelector('.happiness').innerText = `Happiness: ${this.happiness}`;
        petDiv.querySelector('.health').innerText = `Health: ${this.health}`;

        // Add warning border if any necessity is 0
        if (this.hunger === 0 || this.cleanliness === 0 || this.happiness === 0) {
            petDiv.classList.add('warning');
        } else {
            petDiv.classList.remove('warning');
        }
    }
}

function buyPet() {
    if (money >= buyAmount) {
        const name = prompt("Enter pet's name:");
        if (name) {
            new Pet(name);
            money -= buyAmount;
            buyAmount = Math.ceil(buyAmount * petCostMultiplier); // Increase buy amount exponentially
            updateMoneyCounter();
        }
    } else {
        alert("You don't have enough money to buy a pet!");
    }
}

function updatePetNecessities() {
    pets.forEach(pet => {
        pet.hunger -= 5; // Decrease hunger slower
        pet.cleanliness -= 3;
        pet.happiness -= 2;
        if (pet.hunger < 0) pet.hunger = 0; // Ensure hunger never goes below 0
        if (pet.cleanliness < 0) pet.cleanliness = 0;
        if (pet.happiness < 0) pet.happiness = 0;
        pet.updateUI(); // Update UI after updating necessities
    });
}

function updatePetHealth() {
    pets.forEach(pet => {
        pet.updateHealth(); // Update health for each pet
    });
}

function updateMoneyCounter() {
    const moneyCounter = document.getElementById('money');
    moneyCounter.textContent = money;
}

function addMoney(amount) {
    money += amount;
    updateMoneyCounter();
}

// Update pet necessities every 2 seconds
setInterval(updatePetNecessities, 2000);

// Update pet health every second
setInterval(updatePetHealth, 1000);

// Update money counter initially and every time money changes
updateMoneyCounter();
