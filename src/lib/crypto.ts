export const fetchCrypto = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_COINGECKO_API;
  console.log("NEXT_PUBLIC_COINGECKO_API:", apiUrl); // Debug: Check if the env variable is loaded
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_COINGECKO_API environment variable is not defined");
  }

  const url = `${apiUrl}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin&order=market_cap_desc`;
  console.log("Fetching crypto data from:", url); // Debug: Log the full URL

  try {
    const res = await fetch(url);
    console.log("Crypto API response status:", res.status, res.statusText); // Debug: Log the response status
    if (!res.ok) {
      const errorText = await res.text(); // Get the error message from the response
      throw new Error(`Crypto API failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    const data = await res.json();
    console.log("Crypto API response data:", data); // Debug: Log the response data
    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error); // Debug: Log any errors
    throw error; // Re-throw the error to be caught by the Redux thunk
  }
};