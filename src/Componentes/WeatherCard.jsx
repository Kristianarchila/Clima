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

export default function WeatherCard({ clima }) {
  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={clima.icono}
            alt={clima.clima}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {clima.ciudad}, {clima.pais}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
            {clima.clima}
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Temperatura: {clima.temperatura}°C
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Sensación térmica: {clima.sensacion}°C
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Humedad: {clima.humedad}%
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Viento: {clima.viento} m/s
          </p>
        </div>
      </div>
    </div>
  );
}
