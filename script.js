// Инициализация Telegram Mini App
Telegram.WebApp.ready();

// Функция получения погоды
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Введите название города.</p>";
    return;
  }

  const apiKey = "71cc9511f27f6e1e8066b78b9a0ec9cb"; // Замените на ваш ключ
  const url = `https://api.openweathermap.org/data/2.5/weather?q= ${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`;

  resultDiv.innerHTML = "<p>Загрузка...</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p style="color:red;">Ошибка: ${data.message}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>Температура: ${data.main.temp}°C</p>
      <p>Описание: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p style="color:red;">Произошла ошибка загрузки данных.</p>`;
  }
}
