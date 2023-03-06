const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherBoxDetails = document.querySelector(".weather-box-details");
const error404 = document.querySelector(".not-found");
const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-box-details .humidity span");
const wind = document.querySelector(".weather-box-details .wind span");
class SearchApp {
  constructor() {
    search.addEventListener("click", () => this.searchApp());
  }
  searchApp() {
    const APIKey = "1679456b87ee18ffe263f517d739fcfa";
    const city = document.querySelector(".search-box input").value;
    if (city == "") return;
    this.getResult(APIKey, city);
  }
  getResult(APIKey, city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.cod == "404") {
          container.style.height = "400px";
          weatherBox.style.display = "none";
          weatherBoxDetails.style.display = "none";
          error404.style.display = "block";
          error404.classList.add("fade-in");
          return;
        }
        error404.style.display = "none";
        error404.classList.remove("fade-in");

        this.setUI(json);
      });
  }
  setUI(json) {
    switch (json.weather[0].main) {
      case "Clouds":
        image.src = "../public/images/cloud.png";
        break;
      case "Clear":
        image.src = "../public/images/clear.png";
        break;
      case "Rain":
        image.src = "../public/images/rain.png";
        break;
      case "Snow":
        image.src = "../public/images/snow.png";
        break;
      case "Haze":
        image.src = "../public/images/mist.png";
        break;

      default:
        image.src = "";
    }
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
    description.innerHTML = `${json.weather[0].description}`
    humidity.innerHTML = `${json.main.humidity}%`
    wind.innerHTML = `${parseInt(json.wind.speed)}KM/H`
    weatherBoxDetails.classList.add("fade-in")
    weatherBox.classList.add("fade-in")
    container.style.height = '590px'
  }
}
export default new SearchApp()
