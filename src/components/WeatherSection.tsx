import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function WeatherSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.weather);
  console.log("Weather state:", { data, loading, error });

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">🌤 Weather Updates</h2>
      
      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-3">
        {Object.keys(data).map((city) => (
          <div key={city} className="p-4 bg-white rounded-lg shadow-md">
            {data[city] ? (
              <p className="text-lg font-semibold text-gray-800">
                🌍 {city}: <span className="text-blue-500">{data[city].main.temp}°C</span>, 
                <span className="capitalize text-gray-600"> {data[city].weather[0]?.description || "N/A"}</span>
              </p>
            ) : (
              <p className="text-gray-500">{city}: Data unavailable</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
