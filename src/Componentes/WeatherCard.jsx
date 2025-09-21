import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const climaInicial = {
  ciudad: "",
  pais: "",
  temperatura: 0,
  sensacion: 0,
  clima: "",
  icono: "",
  humedad: 0,
  viento: 0,
  amanecer: "",
  atardecer: ""
};

export default function WeatherCard({ clima = climaInicial }) {
  const cloudRef = useRef(null);
  const sunRef = useRef(null);
  const rainRef = useRef(null);

  useEffect(() => {
    if (!clima?.clima) return;

    const climaLower = clima.clima.toLowerCase();

    if (climaLower.includes("nubo") || clima.clima === "Clouds") {
      gsap.to(cloudRef.current, {
        x: "100vw",
        duration: 25,
        repeat: -1,
        ease: "linear"
      });
    }

    if (climaLower.includes("sole") || clima.clima === "Clear") {
      gsap.to(sunRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center"
      });
    }

    if (climaLower.includes("lluvia") || clima.clima === "Rain") {
      gsap.to(rainRef.current.querySelectorAll(".drop"), {
        y: "200px",
        duration: 1,
        repeat: -1,
        stagger: 0.2,
        ease: "linear"
      });
    }
  }, [clima?.clima]);

  // URL segura del icono
  const iconUrl = clima?.icono ? `https://openweathermap.org/img/wn/${clima.icono}@2x.png` : null;

  return (
    <div className="relative max-w-sm mx-auto bg-gradient-to-b from-blue-400 to-blue-200 dark:from-gray-700 dark:to-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-4">

      {/* ☀️ Sol */}
      {(clima?.clima?.toLowerCase().includes("sole") || clima?.clima === "Clear") && (
        <div ref={sunRef} className="absolute top-6 left-6 w-20 h-20 bg-yellow-400 rounded-full shadow-lg"></div>
      )}

      {/* ☁️ Nube */}
      {(clima?.clima?.toLowerCase().includes("nubo") || clima?.clima === "Clouds") && (
        <div ref={cloudRef} className="absolute top-6 left-[-120px] w-32 h-16 bg-white rounded-full shadow-md">
          <div className="absolute w-16 h-16 bg-white rounded-full top-[-20px] left-[-20px]"></div>
          <div className="absolute w-20 h-20 bg-white rounded-full top-[-25px] left-[20px]"></div>
        </div>
      )}

      {/* 🌧 Lluvia */}
      {(clima?.clima?.toLowerCase().includes("lluvia") || clima?.clima === "Rain") && (
        <div ref={rainRef} className="absolute top-16 left-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="drop w-1 h-6 bg-blue-500 rounded-full"></div>
          ))}
        </div>
      )}

      {/* Icono oficial seguro */}
      {iconUrl && (
        <img
          src={iconUrl}
          alt={clima.clima || "icono clima"}
          className="absolute top-6 right-6 w-16 h-16"
          onError={(e) => { e.currentTarget.style.display = "none"; }} // evita que rompa si falla
        />
      )}

      {/* Texto */}
      <div className="p-8 relative z-10">
        <div className="uppercase tracking-wide text-sm text-indigo-800 dark:text-indigo-400 font-semibold">
          {clima.ciudad}, {clima.pais}
        </div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
          {clima.clima || "Desconocido"}
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          🌡 Temperatura: {clima.temperatura}°C
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          🤔 Sensación: {clima.sensacion}°C
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          💧 Humedad: {clima.humedad}%
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          🌬 Viento: {clima.viento} m/s
        </p>
      </div>
    </div>
  );
}
