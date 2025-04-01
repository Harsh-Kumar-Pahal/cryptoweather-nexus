"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherSection from "@/components/WeatherSection";
import CryptoSection from "@/components/CryptoSection";
import NewsSection from "@/components/NewsSection";
import NotificationToast from "@/components/NotificationToast";
import { getWeather } from "@/redux/slices/weatherSlice";
import { getCrypto } from "@/redux/slices/cryptoSlice";
import { getNews } from "@/redux/slices/newsSlice";
import { initWebSocket } from "@/lib/websocket";
import type { AppDispatch, RootState } from "@/redux/store";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const cities = ["New York", "London", "Tokyo"];

  useEffect(() => {
    console.log("Dispatching API calls...");
    cities.forEach((city) => {
      console.log(`Dispatching getWeather for ${city}`);
      dispatch(getWeather(city));
    });
    console.log("Dispatching getCrypto");
    dispatch(getCrypto());
    console.log("Dispatching getNews");
    dispatch(getNews());

    const ws = initWebSocket((data) => {
      console.log("WebSocket data:", data);
    });

    const interval = setInterval(() => {
      console.log("Refreshing API data...");
      cities.forEach((city) => {
        console.log(`Refreshing getWeather for ${city}`);
        dispatch(getWeather(city));
      });
      console.log("Refreshing getCrypto");
      dispatch(getCrypto());
    }, 60000);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CryptoWeather Nexus</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WeatherSection />
        <CryptoSection />
        <NewsSection />
      </div>
      <NotificationToast />
    </div>
  );
}