import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function NewsSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.news);
  console.log("News state:", { data, loading, error });

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold">Crypto News</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-2 space-y-2">
        {data.map((article, index) => (
          <li key={index}>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}