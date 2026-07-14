import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 180,
          links: {
            opacity: 0.35,
            color: "#00f2fe"
          },
        },
      },
    },
    particles: {
      color: {
        value: ["#00f2fe", "#9b51e0", "#ff007f"],
      },
      links: {
        color: "#888888",
        distance: 140,
        enable: true,
        opacity: 0.12,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 1.0,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 800,
          height: 800
        },
        value: 70,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3.5 },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesProvider init={particlesInit}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
        <Particles id="tsparticles" options={options} />
      </div>
    </ParticlesProvider>
  );
};

export default ParticlesBg;
