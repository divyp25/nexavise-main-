import India from "@svg-maps/india";
import { motion } from "framer-motion";

export const IndiaMap = ({ className }: { className?: string }) => {
  const activeLocations = [
    { name: "Mumbai", x: 155, y: 435 },
    { name: "Bangalore", x: 200, y: 560 },
    { name: "Chhattisgarh", x: 330, y: 350 },
    { name: "UP", x: 260, y: 220 },
  ];

  return (
    <div className={`relative ${className || 'w-full max-w-[500px] mx-auto'}`}>
      <svg 
        viewBox={India.viewBox} 
        className="w-full h-auto drop-shadow-sm dark:drop-shadow-lg"
        fill="currentColor"
      >
        <g className="india-states">
          {India.locations.map((location: any) => (
            <path
              key={location.id}
              id={location.id}
              name={location.name}
              d={location.path}
              className="fill-gray-200 dark:fill-white/10 stroke-gray-300 dark:stroke-white/20 hover:fill-gray-300 dark:hover:fill-white/20 hover:stroke-gray-400 dark:hover:stroke-white/30 transition-colors duration-300 stroke-[1]"
            />
          ))}
        </g>

        {/* Service Locations Markers */}
        {activeLocations.map((loc, i) => (
          <g key={i}>
            {/* Pulsating outer ring */}
            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r="10"
              fill="currentColor"
              className="text-cyan-500/40 dark:text-cyan-400/30"
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
            {/* Inner dot */}
            <circle
              cx={loc.x}
              cy={loc.y}
              r="4"
              className="fill-cyan-600 dark:fill-cyan-400"
            />
            {/* Label */}
            <text 
              x={loc.x + 15} 
              y={loc.y + 5} 
              className="fill-gray-900 dark:fill-white text-[14px] font-bold font-display uppercase tracking-widest drop-shadow-sm"
            >
              {loc.name}
            </text>
            
            {/* Indicator Line */}
            <path 
              d={`M${loc.x+12},${loc.y} L${loc.x+25},${loc.y-15} L${loc.x+85},${loc.y-15}`}
              fill="none"
              className="stroke-gray-400 dark:stroke-white/50 stroke-[1]"
            />
            <text
              x={loc.x + 90}
              y={loc.y - 13}
              className="fill-gray-500 dark:fill-white/70 text-[9px] font-bold font-mono tracking-wider"
            >
              ACTIVE
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
