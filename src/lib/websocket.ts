export const initWebSocket = (onMessage: (data: any) => void) => {
  const wsUrl = process.env.NEXT_PUBLIC_COINCAP_WS;
  if (!wsUrl) {
    throw new Error("NEXT_PUBLIC_COINCAP_WS environment variable is not defined");
  }
  console.log("Connecting to WebSocket:", wsUrl);
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => console.log("WebSocket connected");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket message:", data);
    onMessage(data);
  };
  ws.onerror = (err) => console.error("WebSocket error:", err);
  ws.onclose = () => console.log("WebSocket closed");
  return ws;
};