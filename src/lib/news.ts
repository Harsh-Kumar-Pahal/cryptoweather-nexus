export const fetchNews = async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_NEWSDATA_API_KEY environment variable is not defined");
  }
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency`;
  console.log("Fetching news data:", url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`News API failed: ${res.statusText}`);
    const data = await res.json();
    console.log("News data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};