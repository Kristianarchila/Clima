import { useEffect } from "react";
import gsap from "gsap";

export default function WeatherBackground({ weather }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 50;
      const y = (e.clientY / innerHeight - 0.5) * 50;

      gsap.to(".layer1", { x: x, y: y, duration: 1 });
      gsap.to(".layer2", { x: -x, y: -y, duration: 1 });
      gsap.to(".layer3", { x: x * 0.5, y: y * 0.5, duration: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Cambia imágenes según el clima
  let bg1 = "/sun.png";
  let bg2 = "/clouds.png";
  let bg3 = "/mountains.png";

  if (weather === "Rain") {
    bg1 = "/rain.png";
    bg2 = "/clouds.png";
    bg3 = "/city.png";
  } else if (weather === "Snow") {
    bg1 = "/snow.png";
    bg2 = "/clouds.png";
    bg3 = "/forest.png";
  } else if (weather === "Clear") {
    bg1 = "/sun.png";
    bg2 = "/clouds-light.png";
    bg3 = "/mountains.png";
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <img src={bg1} alt="layer1" className="layer1 absolute w-full h-full object-cover" />
      <img src={bg2} alt="layer2" className="layer2 absolute w-full h-full object-cover" />
      <img src={bg3} alt="layer3" className="layer3 absolute w-full h-full object-cover" />
    </div>
  );
}
