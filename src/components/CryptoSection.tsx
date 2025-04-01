import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addFavoriteCrypto, removeFavoriteCrypto } from "@/redux/slices/favoritesSlice";

export default function CryptoSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.crypto);
  const favorites = useSelector((state: RootState) => state.favorites.cryptos);
  const dispatch = useDispatch<AppDispatch>();
  console.log("CryptoSection state:", { data, loading, error, favorites }); // Debug: Log the state

  const toggleFavorite = (cryptoId: string) => {
    if (favorites.includes(cryptoId)) {
      dispatch(removeFavoriteCrypto(cryptoId));
    } else {
      dispatch(addFavoriteCrypto(cryptoId));
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold">Cryptocurrency</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data.length === 0 && !loading && !error && <p>No crypto data available.</p>}
      {data.map((crypto) => (
        <div key={crypto.id} className="mt-2 flex justify-between items-center">
          <div>
            <p>
              {crypto.name}: ${crypto.current_price?.toFixed(2) ?? "N/A"}
            </p>
            <p className={crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
              24h: {crypto.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
            </p>
            <p>Market Cap: ${crypto.market_cap?.toLocaleString() ?? "N/A"}</p>
          </div>
          <button
            onClick={() => toggleFavorite(crypto.id)}
            className={`px-2 py-1 rounded ${favorites.includes(crypto.id) ? "bg-red-500" : "bg-blue-500"} text-white`}
          >
            {favorites.includes(crypto.id) ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      ))}
    </div>
  );
}