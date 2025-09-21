import { useState, useContext } from "react";
import WeatherCard, { climaInicial } from "../Componentes/WeatherCard";
import SearchBar from "../Componentes/SearchBar";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const [climaActual, setClimaActual] = useState(climaInicial);
  const [ciudadBuscada, setCiudadBuscada] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const apiKey = "d2bea48c8d63072372f3db56ba9f89d7";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const handleInputChange = (e) => setCiudadBuscada(e.target.value);

  // 🔹 Buscar por ciudad
  const handleBuscarCiudad = async (ciudad) => {
    if (ciudad.trim() === "") {
      setError("Por favor ingresa el nombre de una ciudad.");
      return;
    }

    setError("");
    setCargando(true);

    try {
      const response = await fetch(
        `${apiUrl}?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
      );

      if (!response.ok) {
        setError("Ciudad no encontrada. Verifica el nombre e intenta nuevamente.");
        setCargando(false);
        return;
      }

      const data = await response.json();
      actualizarClima(data);
      setCiudadBuscada("");
    } catch {
      setError("No se pudo obtener el clima. Intenta más tarde.");
    } finally {
      setCargando(false);
    }
  };

  // 🔹 Buscar por ubicación del usuario
  const handleBuscarUbicacion = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es compatible con tu navegador.");
      return;
    }

    setError("");
    setCargando(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const response = await fetch(
            `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
          );

          if (!response.ok) {
            setError("No se pudo obtener el clima de tu ubicación.");
            setCargando(false);
            return;
          }

          const data = await response.json();
          actualizarClima(data);
        } catch {
          setError("Error al obtener el clima de tu ubicación.");
        } finally {
          setCargando(false);
        }
      },
      () => {
        setError("No pudimos acceder a tu ubicación. Revisa los permisos.");
        setCargando(false);
      }
    );
  };

  // 🔹 Reutilizamos esta función para actualizar estado
  const actualizarClima = (data) => {
    setClimaActual({
      ciudad: data.name,
      pais: data.sys.country,
      temperatura: data.main.temp,
      sensacion: data.main.feels_like,
      clima: data.weather[0].description,
      icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      humedad: data.main.humidity,
      viento: data.wind.speed,
      amanecer: "",
      atardecer: ""
    });
  };

  return (
    <div
      className={`p-4 min-h-screen transition-colors duration-300
        ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
    >
    {/* Botón para cambiar tema divertido */}
<div className="flex justify-end mb-4">
  <button
    onClick={toggleTheme}
    className={`
      px-5 py-2 rounded-full font-bold transition-all duration-300
      shadow-lg hover:scale-110 hover:shadow-2xl
      ${theme === "light"
        ? "bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black"
        : "bg-red-600 text-white hover:bg-pink-500 hover:text-yellow-200"
      }
    `}
  >
    {theme === "light" ? "☀️ Modo brillante" : "🌙 Modo oscuro"}

  </button>
</div>


      {/* Barra de búsqueda */}
      <SearchBar
        value={ciudadBuscada}
        onChange={handleInputChange}
        onSearch={() => handleBuscarCiudad(ciudadBuscada)}
      />

      {/* Botón para usar ubicación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleBuscarUbicacion}
          className={`px-4 py-2 rounded font-semibold shadow-md transition-colors duration-300
            ${theme === "light"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-green-700 text-white hover:bg-green-800"}`}
        >
          Usar mi ubicación
        </button>
      </div>

      {/* Mensajes */}
      {cargando && <p className="mt-4 text-center">Cargando...</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {/* Tarjeta de clima */}
      {climaActual.ciudad && <WeatherCard clima={climaActual} />}
    </div>
  );
}
