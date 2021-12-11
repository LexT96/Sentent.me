import { RecursivePartial, SingleOrMultiple, IOptions } from "react-tsparticles";

export const config = {
  "particles": {
    "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": {
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" },
      "polygon": { "nb_sides": 8 }
    },
    "opacity": {
      "value": 0.1,
      "random": true,
      "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.8,
      "direction": "none" as const,
      "random": false,
      "straight": false,
      "out_mode": "out" as const,
      "bounce": false,
      "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
    }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": false, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": { "distance": 200, "duration": 0.4 },
      "push": { "particles_nb": 4 },
      "remove": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
}

export default config;
