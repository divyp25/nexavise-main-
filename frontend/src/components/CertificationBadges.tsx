import React from 'react';

interface BadgeProps {
  className?: string;
  size?: number;
}

// Helper component for Star polygons in badges
const Star: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle1 = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x1 = cx + r * Math.cos(angle1);
    const y1 = cy + r * Math.sin(angle1);
    points.push(`${x1},${y1}`);
  }
  return <polygon points={points.join(' ')} fill="currentColor" />;
};

// 1. ISO 27001 - Information Security Management System (Lead Auditor Seal)
export const Iso27001: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="ISO 27001 Lead Auditor Certified"
    >
      <defs>
        <path id="path-top-27001" d="M 21,60 A 39,39 0 0,1 99,60" fill="none" />
        <path id="path-bottom-27001" d="M 99,60 A 39,39 0 0,1 21,60" fill="none" />
        
        <clipPath id="clip-inner-top">
          <circle cx="60" cy="60" r="34" />
        </clipPath>
        
        <mask id="band-mask">
          {/* Keep the rectangle body */}
          <rect x="25" y="49" width="70" height="22" fill="white" rx="1.5" />
          {/* Subtract text "ISO" in center */}
          <text
            x="60"
            y="65"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="14"
            fontWeight="900"
            fill="black"
          >
            ISO
          </text>
          {/* Subtract left star inside band */}
          <path d="M 35,56 L 36,58.5 L 39,58.5 L 36.5,60.5 L 37.5,63.5 L 35,61.5 L 32.5,63.5 L 33.5,60.5 L 31,58.5 L 34,58.5 Z" fill="black" />
          {/* Subtract right star inside band */}
          <path d="M 85,56 L 86,58.5 L 89,58.5 L 86.5,60.5 L 87.5,63.5 L 85,61.5 L 82.5,63.5 L 83.5,60.5 L 81,58.5 L 84,58.5 Z" fill="black" />
        </mask>
      </defs>
      
      {/* Outer double rings */}
      <circle cx="60" cy="60" r="54" strokeWidth="2" />
      <circle cx="60" cy="60" r="49" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="60" cy="60" r="34" strokeWidth="1.5" />
      
      {/* Curved Texts */}
      <text className="fill-current text-[7.5px] font-black tracking-[0.24em] uppercase">
        <textPath href="#path-top-27001" startOffset="50%" textAnchor="middle">
          Lead Auditor
        </textPath>
      </text>
      <text className="fill-current text-[3.8px] font-bold tracking-[0.09em] uppercase">
        <textPath href="#path-bottom-27001" startOffset="50%" textAnchor="middle">
          Information Security Management System
        </textPath>
      </text>
      
      {/* Side Stars along the path */}
      <Star cx={23} cy={48} r={2} />
      <Star cx={20} cy={60} r={2} />
      <Star cx={23} cy={72} r={2} />
      <Star cx={97} cy={48} r={2} />
      <Star cx={100} cy={60} r={2} />
      <Star cx={97} cy={72} r={2} />
      
      {/* Globe Grid inside inner top half */}
      <g clipPath="url(#clip-inner-top)">
        {/* We only draw in the area y < 49 */}
        <path d="M 26,49 C 26,20 94,20 94,49" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 28,42 C 38,32 82,32 92,42" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <path d="M 35,34 C 45,26 75,26 85,34" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <line x1="60" y1="26" x2="60" y2="49" stroke="currentColor" strokeWidth="0.75" />
        <path d="M 60,26 C 45,30 45,45 60,49" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <path d="M 60,26 C 75,30 75,45 60,49" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <path d="M 60,26 C 35,32 35,43 60,49" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <path d="M 60,26 C 85,32 85,43 60,49" fill="none" stroke="currentColor" strokeWidth="0.75" />
      </g>
      
      {/* Horizontal Band with Mask (ISO + inner stars) */}
      <rect x="25" y="49" width="70" height="22" fill="currentColor" mask="url(#band-mask)" stroke="none" />
      
      {/* Bottom text 27001 */}
      <text
        x="60"
        y="86"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="900"
        fill="currentColor"
        className="tracking-wider"
      >
        27001
      </text>
    </svg>
  );
};

// 2. ISO 9001 - Quality Management System
export const Iso9001: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="ISO 9001 Certified"
    >
      <defs>
        <path id="path-top-9001" d="M 24,60 A 36,36 0 0,1 96,60" fill="none" />
        <path id="path-bottom-9001" d="M 96,60 A 36,36 0 0,1 24,60" fill="none" />
      </defs>
      
      {/* Outer border rings */}
      <circle cx="60" cy="60" r="54" strokeWidth="2" />
      <circle cx="60" cy="60" r="49" strokeWidth="1" strokeDasharray="3,3" />
      <circle cx="60" cy="60" r="34" strokeWidth="1.5" />
      
      {/* Curved texts */}
      <text className="fill-current text-[7.5px] font-bold tracking-[0.18em] uppercase">
        <textPath href="#path-top-9001" startOffset="50%" textAnchor="middle">
          Certified
        </textPath>
      </text>
      <text className="fill-current text-[6.5px] font-bold tracking-[0.12em] uppercase">
        <textPath href="#path-bottom-9001" startOffset="50%" textAnchor="middle">
          Quality Company
        </textPath>
      </text>
      
      {/* Stars on the sides */}
      <Star cx={17} cy={60} r={2.5} />
      <Star cx={103} cy={60} r={2.5} />
      
      {/* Checkmark and center text */}
      <path
        d="M 52,50 L 57,55 L 68,44"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-cyan-500"
      />
      <text
        x="60"
        y="75"
        textAnchor="middle"
        className="fill-current text-[10px] font-black tracking-wider"
      >
        ISO 9001
      </text>
    </svg>
  );
};

// 3. ISO 5001 - Energy Management System
export const Iso5001: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="ISO 5001 Certified"
    >
      <defs>
        <path id="path-top-5001" d="M 24,60 A 36,36 0 0,1 96,60" fill="none" />
        <path id="path-bottom-5001" d="M 96,60 A 36,36 0 0,1 24,60" fill="none" />
      </defs>
      
      {/* Outer border rings */}
      <circle cx="60" cy="60" r="54" strokeWidth="2" />
      <circle cx="60" cy="60" r="49" strokeWidth="1" strokeDasharray="4,2" />
      <circle cx="60" cy="60" r="34" strokeWidth="1.5" />
      
      {/* Curved texts */}
      <text className="fill-current text-[7.5px] font-bold tracking-[0.18em] uppercase">
        <textPath href="#path-top-5001" startOffset="50%" textAnchor="middle">
          Certified
        </textPath>
      </text>
      <text className="fill-current text-[6.5px] font-bold tracking-[0.12em] uppercase">
        <textPath href="#path-bottom-5001" startOffset="50%" textAnchor="middle">
          Energy Management
        </textPath>
      </text>
      
      {/* Lightning bolt graphic and center text */}
      <path
        d="M 62,38 L 52,52 L 59,52 L 57,66 L 68,52 L 61,52 Z"
        fill="currentColor"
        className="text-cyan-500 dark:text-cyan-400"
        stroke="none"
      />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        className="fill-current text-[10px] font-black tracking-wider"
      >
        ISO 5001
      </text>
    </svg>
  );
};

// 4. ISO 14001 - Environmental Management System
export const Iso14001: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="ISO 14001 Certified"
    >
      <defs>
        <path id="path-top-14001" d="M 24,60 A 36,36 0 0,1 96,60" fill="none" />
        <path id="path-bottom-14001" d="M 96,60 A 36,36 0 0,1 24,60" fill="none" />
      </defs>
      
      {/* Outer border */}
      <circle cx="60" cy="60" r="54" strokeWidth="2" />
      <circle cx="60" cy="60" r="49" strokeWidth="1" strokeDasharray="2,2" />
      <circle cx="60" cy="60" r="34" strokeWidth="1.5" />
      
      {/* Curved texts */}
      <text className="fill-current text-[7.5px] font-bold tracking-[0.18em] uppercase">
        <textPath href="#path-top-14001" startOffset="50%" textAnchor="middle">
          Certified
        </textPath>
      </text>
      <text className="fill-current text-[6.5px] font-bold tracking-[0.12em] uppercase">
        <textPath href="#path-bottom-14001" startOffset="50%" textAnchor="middle">
          Environmental System
        </textPath>
      </text>
      
      {/* Leaf graphic and center text */}
      <path
        d="M 60,38 Q 68,46 60,65 Q 52,46 60,38 Z"
        fill="currentColor"
        className="text-cyan-500 dark:text-cyan-400"
        stroke="none"
      />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        className="fill-current text-[9px] font-black tracking-wider"
      >
        ISO 14001
      </text>
    </svg>
  );
};

// 5. ISO 9001:2015 - Quality Standard
export const Iso9001_2015: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="ISO 9001:2015 Certified"
    >
      <defs>
        <path id="path-top-9001-2015" d="M 24,60 A 36,36 0 0,1 96,60" fill="none" />
        <path id="path-bottom-9001-2015" d="M 96,60 A 36,36 0 0,1 24,60" fill="none" />
      </defs>
      
      {/* Outer border rings */}
      <circle cx="60" cy="60" r="54" strokeWidth="2" />
      <circle cx="60" cy="60" r="49" strokeWidth="1" strokeDasharray="3,1" />
      <circle cx="60" cy="60" r="34" strokeWidth="1.5" />
      
      {/* Curved texts */}
      <text className="fill-current text-[7.5px] font-bold tracking-[0.18em] uppercase">
        <textPath href="#path-top-9001-2015" startOffset="50%" textAnchor="middle">
          Certified
        </textPath>
      </text>
      <text className="fill-current text-[6.5px] font-bold tracking-[0.12em] uppercase">
        <textPath href="#path-bottom-9001-2015" startOffset="50%" textAnchor="middle">
          Quality Standard
        </textPath>
      </text>
      
      {/* Center text */}
      <text
        x="60"
        y="60"
        textAnchor="middle"
        className="fill-current text-[8.5px] font-black tracking-wider"
      >
        ISO 9001
      </text>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        className="fill-current text-[7px] font-black tracking-widest text-cyan-500"
      >
        2015
      </text>
    </svg>
  );
};

// 6. Startup India Logo
export const StartupIndia: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 160 50"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="Startup India Logo"
    >
      {/* Hashtag symbol */}
      <text
        x="10"
        y="32"
        className="fill-current text-2xl font-black text-cyan-500"
      >
        #
      </text>
      {/* startup text */}
      <text
        x="28"
        y="32"
        className="fill-current text-xl font-black tracking-tight"
      >
        startup
      </text>
      {/* india text */}
      <text
        x="98"
        y="32"
        className="fill-current text-xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400"
      >
        india
      </text>
      
      {/* Stair steps DPIIT logo at the right */}
      <path
        d="M 144,35 L 152,35 L 152,27 L 160,27"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-cyan-500"
      />
      <path
        d="M 136,35 L 144,35 L 144,27 L 152,27 L 152,19"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-cyan-500 opacity-60"
      />
    </svg>
  );
};

// 7. HIPAA Compliance Logo
export const Hipaa: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size / 3.2}
      viewBox="0 0 160 50"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="HIPAA Compliance Logo"
    >
      <defs>
        <mask id="hipaa-mask">
          <rect x="0" y="0" width="160" height="50" fill="white" />
          {/* Subtract left side star */}
          <path d="M 40,4 L 37,9 L 31,9 L 36,12 L 34,17 L 40,14 Z" fill="black" stroke="black" strokeWidth="0.5" />
          {/* Subtract left snake coils */}
          <path d="M 40,17 C 32,20 32,24 40,27 C 32,30 32,34 40,37 C 32,40 32,44 40,47" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
          {/* Subtract left staff */}
          <line x1="40" y1="10" x2="40" y2="46" stroke="black" strokeWidth="2.5" />
        </mask>
      </defs>
      
      {/* Left Shield */}
      <path
        d="M 40,4 C 20,4 8,14 8,25 C 8,36 20,42 40,46 Z"
        fill="currentColor"
        mask="url(#hipaa-mask)"
        stroke="none"
      />
      
      {/* Right side elements */}
      {/* Star right half */}
      <path d="M 40,4 L 43,9 L 49,9 L 44,12 L 46,17 L 40,14 Z" fill="currentColor" stroke="none" />
      {/* Staff right half */}
      <line x1="40" y1="10" x2="40" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Snake right coils */}
      <path d="M 40,17 C 48,20 48,24 40,27 C 48,30 48,34 40,37 C 48,40 48,44 40,47" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Wing */}
      <path
        d="M 40,15 C 48,15 54,12 64,12 C 72,12 80,14 84,17 C 80,19 75,19 72,19 C 71,21 65,22 61,22 C 58,24 51,25 40,22 Z"
        fill="currentColor"
        stroke="none"
      />
      
      {/* Text "HIPAA Compliance" */}
      <text
        x="90"
        y="25"
        fontFamily="Georgia, serif"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
        className="tracking-wide"
      >
        HIPAA
      </text>
      <text
        x="90"
        y="37"
        fontFamily="Georgia, serif"
        fontSize="9"
        fill="currentColor"
        className="tracking-normal"
      >
        Compliance
      </text>
    </svg>
  );
};

// 8. DPD Partner Logo
export const Dpd: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size / 3.2}
      viewBox="0 0 160 50"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="DPD Partner Logo"
    >
      {/* 3D Isometric Cube (Red DPD Graphic) */}
      <path
        d="M 32,5 L 50,14 L 32,23 L 14,14 Z"
        fill="#E30613"
        stroke="none"
      />
      <path
        d="M 14,17 L 32,26 L 32,46 L 14,37 Z"
        fill="#A80315"
        stroke="none"
      />
      <path
        d="M 52,18 L 34,27 L 34,47 L 52,38 Z"
        fill="#DC0032"
        stroke="none"
      />
      
      {/* "dpd" Text Letters in vector paths */}
      <circle cx="78" cy="28.5" r="7.5" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <rect x="85" y="15" width="3.5" height="21.5" rx="0.5" fill="currentColor" stroke="none" />
      
      <circle cx="100.5" cy="28.5" r="7.5" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <rect x="91" y="21" width="3.5" height="24.5" rx="0.5" fill="currentColor" stroke="none" />
      
      <circle cx="118.5" cy="28.5" r="7.5" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <rect x="125.5" y="15" width="3.5" height="21.5" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
};

// 9. SOC 2 Type 2 Certified
export const Soc2: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="SOC 2 Type 2 Certified"
    >
      <defs>
        <mask id="soc2-circle-mask">
          <circle cx="60" cy="94" r="13" fill="white" />
          <text
            x="60"
            y="90.5"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="4.5"
            fontWeight="bold"
            fill="black"
          >
            AICPA
          </text>
          <text
            x="60"
            y="98.5"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="7"
            fontWeight="900"
            fill="black"
          >
            SOC
          </text>
        </mask>
      </defs>
      
      {/* Outer Shield Outline */}
      <path
        d="M 60,10 C 90,10 105,18 105,18 C 105,18 105,75 60,110 C 15,75 15,18 15,18 C 15,18 30,10 60,10 Z"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Padlock at the top center */}
      {/* Shackle */}
      <path
        d="M 53,24 L 53,17 C 53,12 67,12 67,17 L 67,24"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="text-indigo-500 dark:text-indigo-400"
      />
      {/* Padlock Body */}
      <rect
        x="49"
        y="23"
        width="22"
        height="15"
        rx="2"
        fill="currentColor"
        stroke="none"
        className="text-indigo-500 dark:text-indigo-400"
      />
      {/* Checkmark inside Padlock */}
      <path
        d="M 56,30 L 59,33 L 64,27"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Center Texts */}
      <text
        x="60"
        y="54"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="13.5"
        fontWeight="900"
        fill="currentColor"
        className="tracking-wider"
      >
        SOC 2
      </text>
      <text
        x="60"
        y="71"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="13.5"
        fontWeight="900"
        fill="currentColor"
        className="tracking-wider"
      >
        TYPE 2
      </text>
      
      {/* Bottom circular badge (AICPA SOC) with mask */}
      <circle
        cx="60"
        cy="94"
        r="13"
        fill="currentColor"
        mask="url(#soc2-circle-mask)"
        stroke="none"
      />
    </svg>
  );
};

// 10. COBIT Certified
export const Cobit: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="COBIT Certified"
    >
      <defs>
        <mask id="cobit-text-mask">
          {/* Rect block */}
          <rect x="10" y="10" width="100" height="70" fill="white" rx="3" />
          
          {/* Subtract letter C */}
          <text
            x="14"
            y="62"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontSize="52"
            fontWeight="bold"
            fill="black"
          >
            C
          </text>
          
          {/* Subtract letter O outline only */}
          <circle cx="50" cy="48" r="11" stroke="black" strokeWidth="8.5" fill="none" />
          
          {/* Subtract letter B */}
          <text
            x="64"
            y="60"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontSize="34"
            fontWeight="bold"
            fill="black"
          >
            B
          </text>
          
          {/* Subtract letter I */}
          <text
            x="85"
            y="60"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontSize="34"
            fontWeight="bold"
            fill="black"
          >
            I
          </text>
          
          {/* Subtract letter T */}
          <text
            x="92"
            y="62"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontSize="45"
            fontWeight="bold"
            fill="black"
          >
            T
          </text>
        </mask>
      </defs>
      
      {/* Rect block with mask applied */}
      <rect
        x="10" y="10" width="100" height="70"
        fill="currentColor"
        mask="url(#cobit-text-mask)"
        stroke="none"
      />
      
      {/* Red oval/circle inside the O */}
      <circle cx="50" cy="48" r="7.5" fill="#C0041B" stroke="none" />
      
      {/* Subtitles at bottom */}
      <text
        x="60"
        y="93"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="4.8"
        fontWeight="bold"
        fill="currentColor"
        className="tracking-[0.05em] uppercase"
      >
        Governance, Control & Assurance
      </text>
      <text
        x="60"
        y="102"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="4.2"
        fontWeight="bold"
        fill="currentColor"
        className="tracking-[0.01em] uppercase"
      >
        for Information & Related Technology
      </text>
    </svg>
  );
};

// 10. Check Point - Secured Partner Badge
export const CheckPoint: React.FC<BadgeProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`text-slate-800 dark:text-slate-200 fill-none stroke-current ${className}`}
      aria-label="Check Point Secured Partner"
    >
      <defs>
        <path id="path-top-checkpoint" d="M 21,60 A 39,39 0 0,1 99,60" fill="none" />
        <path id="path-bottom-checkpoint" d="M 99,60 A 39,39 0 0,1 21,60" fill="none" />
      </defs>
      
      {/* Outer double rings */}
      <circle cx="60" cy="60" r="47" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="44" strokeWidth="0.75" />
      <circle cx="60" cy="60" r="35" strokeWidth="0.75" strokeDasharray="2 2" />
      
      {/* Circular Text */}
      <text fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor" letterSpacing="1.2">
        <textPath href="#path-top-checkpoint" startOffset="50%" textAnchor="middle">
          CHECK POINT
        </textPath>
      </text>
      
      <text fontSize="6.5" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor" letterSpacing="0.8">
        <textPath href="#path-bottom-checkpoint" startOffset="50%" textAnchor="middle">
          SECURED PARTNER
        </textPath>
      </text>
      
      {/* Stars on the sides */}
      <Star cx={19} cy={60} r={2.5} />
      <Star cx={101} cy={60} r={2.5} />
      
      {/* Inner Check Point Symbol */}
      <g transform="translate(60, 60)">
        {/* Outer red ring segment of Check Point symbol */}
        <circle cx="0" cy="0" r="18" stroke="#E11D48" strokeWidth="3.5" fill="none" />
        {/* Inner checkmark / keyhole pointer */}
        <path
          d="M -6,-2 L -1,3 L 8,-6"
          stroke="#E11D48"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
};




