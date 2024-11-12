const heroImage = document.getElementById("hero-avatar");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroGender = document.getElementById("hero-gender");
const heroRace = document.getElementById("hero-race");
const heroHeight = document.getElementById("hero-height");
const heroStats = {
  intelligence: document.getElementById("hero-intelligence"),
  strength: document.getElementById("hero-strength"),
  speed: document.getElementById("hero-speed"),
  durability: document.getElementById("hero-durability"),
  power: document.getElementById("hero-power"),
  combat: document.getElementById("hero-combat"),
};

const apiUrl = "https://akabab.github.io/superhero-api/api/all.json";

function getRandomHero(heroes) {
  return heroes[Math.floor(Math.random() * heroes.length)];
}

function updateProgressBar(statElement, value, statId) {
  const progressValue = value !== "null" && value !== undefined ? value : 0;
  statElement.style.width = `${progressValue}%`;
  document.getElementById(`${statId}-value`).textContent = progressValue || "Нет данных";
}

function displayHeroData(hero) {
  heroTitle.textContent = hero.name || "Без имени";
  heroDescription.textContent = `Описание: ${hero.biography.firstAppearance || "Нет описания"}`;
  heroGender.textContent = `Пол: ${hero.appearance.gender || "Неизвестно"}`;
  heroRace.textContent = `Раса: ${hero.appearance.race || "Неизвестно"}`;
  heroHeight.textContent = `Рост: ${hero.appearance.height[1] || "Неизвестно"}`;

  updateProgressBar(heroStats.intelligence, hero.powerstats.intelligence, "intelligence");
  updateProgressBar(heroStats.strength, hero.powerstats.strength, "strength");
  updateProgressBar(heroStats.speed, hero.powerstats.speed, "speed");
  updateProgressBar(heroStats.durability, hero.powerstats.durability, "durability");
  updateProgressBar(heroStats.power, hero.powerstats.power, "power");
  updateProgressBar(heroStats.combat, hero.powerstats.combat, "combat");

  heroImage.src = hero.images.md || "default-image.jpg"; 
}

async function fetchHeroData() {
  try {
    const response = await fetch(apiUrl);
    const heroes = await response.json();
    const randomHero = getRandomHero(heroes);
    displayHeroData(randomHero);
  } catch (error) {
    console.error("Ошибка при загрузке данных героя:", error);
  }
}


document.querySelector("button").addEventListener("click", fetchHeroData);

document.addEventListener("DOMContentLoaded", fetchHeroData);

