import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Icon({ name, className = "", size = 22 }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const icons = {
    arrowLeft: <FontAwesomeIcon icon={faArrowLeft} />,
    arrowRight: <FontAwesomeIcon icon={faArrowRight} />,
    arrow: (
      <svg {...commonProps}>
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    ),
    code: (
      <svg {...commonProps}>
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
    database: (
      <svg {...commonProps}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
    layers: (
      <svg {...commonProps}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
    palette: (
      <svg {...commonProps}>
        <path d="M12 22a10 10 0 1 1 10-10c0 2.2-1.8 4-4 4h-1.5c-.8 0-1.5.7-1.5 1.5 0 .4.2.8.4 1.1.3.4.4.8.4 1.2 0 1.2-1 2.2-2.3 2.2H12z" />
        <circle cx="7.5" cy="10.5" r=".8" fill="currentColor" />
        <circle cx="10.5" cy="7.5" r=".8" fill="currentColor" />
        <circle cx="14.5" cy="7.5" r=".8" fill="currentColor" />
        <circle cx="16.5" cy="11" r=".8" fill="currentColor" />
      </svg>
    ),
    github: <FontAwesomeIcon icon={faGithub} />,
    linkedin: (
      <svg {...commonProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    mail: (
      <svg {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    map: (
      <svg {...commonProps}>
        <path d="M12 22s7-5.3 7-12a7 7 0 1 0-14 0c0 6.7 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    menu: (
      <svg {...commonProps}>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
    x: (
      <svg {...commonProps}>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    ),
    rocket: (
      <svg {...commonProps}>
        <path d="M4.5 16.5c-1.2 1.2-1.7 3-1.5 4.5 1.5.2 3.3-.3 4.5-1.5" />
        <path d="M9 15l-3-3s2-5 6-7c3-1.5 6-1.5 9-1- .5 3-.5 6-2 9-2 4-7 6-7 6l-3-3z" />
        <circle cx="15" cy="9" r="2" />
      </svg>
    ),
    sparkles: (
      <svg {...commonProps}>
        <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
      </svg>
    ),
    zap: (
      <svg {...commonProps}>
        <path d="M13 2L3 14h8l-1 8 11-13h-8l1-7z" />
      </svg>
    ),
    globe: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 0 20" />
        <path d="M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
    ),
    star: (
      <svg {...commonProps}>
        <path d="M12 2l3 6 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.9 3 1.1-6.5L2.5 8.9 9 8l3-6z" />
      </svg>
    ),
    download: (
      <svg {...commonProps}>
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    ),
    sun: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M6.34 17.66l-1.41 1.41" />
        <path d="M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    moon: (
      <svg {...commonProps}>
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8z" />
      </svg>
    ),
    eye: (
      <svg {...commonProps}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    link: (
      <svg {...commonProps}>
        <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
      </svg>
    ),
  };

  return icons[name] || icons.sparkles;
}

export default Icon;
