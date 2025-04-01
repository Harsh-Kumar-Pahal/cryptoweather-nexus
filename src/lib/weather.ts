export const fetchWeather = async (city: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_OPENWEATHERMAP_API_KEY environment variable is not defined");
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(`Fetching weather for ${city}: ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API failed: ${res.statusText}`);
    const data = await res.json();
    console.log(`Weather data for ${city}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    throw error;
  }
};