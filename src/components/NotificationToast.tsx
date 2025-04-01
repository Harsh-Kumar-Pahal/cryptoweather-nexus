import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { initWebSocket } from "@/lib/websocket";
import { AppDispatch } from "@/redux/store";

// Define the type for the custom data in toast
interface ToastData {
  type: "price_alert" | "weather_alert";
}

export default function NotificationToast() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const ws = initWebSocket((data) => {
      const priceUpdates = Object.entries(data).map(([crypto, price]) => ({
        crypto,
        price: Number(price),
      }));

      priceUpdates.forEach(({ crypto, price }) => {
        const significantChange = Math.abs(price) > 100;
        if (significantChange) {
          toast.info(
            `${crypto.toUpperCase()} price updated to $${price.toFixed(2)}`,
            {
              data: { type: "price_alert" } as ToastData,
              // @ts-ignore: Ignore TypeScript error for onOpen
              onOpen: (props: { data: ToastData }) =>
                console.log("Toast type:", props.data.type),
            }
          );
        }
      });
    });

    const simulateWeatherAlert = setInterval(() => {
      toast.warn(
        "Storm warning in Tokyo!",
        {
          data: { type: "weather_alert" } as ToastData,
          // @ts-ignore: Ignore TypeScript error for onOpen
          onOpen: (props: { data: ToastData }) =>
            console.log("Toast type:", props.data.type),
        }
      );
    }, 30000);

    return () => {
      ws.close();
      clearInterval(simulateWeatherAlert);
    };
  }, [dispatch]);

  return null;
}