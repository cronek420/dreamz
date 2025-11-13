import React from 'react';

export const DreamWeaverLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#00FFF7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6C63FF', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g fill="none" stroke="url(#logo-gradient)" strokeWidth="3" filter="url(#glow)">
      {/* Crescent Moon */}
      <path d="M 50 10 A 40 40 0 1 1 50 90 A 30 30 0 1 0 50 10 Z" />
      {/* Dream Catcher Web */}
      <circle cx="58" cy="50" r="18" />
      <path d="M 58 32 L 58 68" />
      <path d="M 45.1 41 L 70.9 59" />
      <path d="M 45.1 59 L 70.9 41" />
      {/* Feathers */}
      <g transform="translate(45, 80) rotate(15)">
        <path d="M 0 0 C 5 -10, -5 -10, 0 -20" strokeWidth="2"/>
        <path d="M 0 -7 L 5 -12" strokeWidth="1.5"/>
        <path d="M 0 -14 L -5 -19" strokeWidth="1.5"/>
      </g>
      <g transform="translate(58, 83)">
        <path d="M 0 0 C 5 -12, -5 -12, 0 -24" strokeWidth="2"/>
         <path d="M 0 -8 L 5 -14" strokeWidth="1.5"/>
        <path d="M 0 -16 L -5 -22" strokeWidth="1.5"/>
      </g>
      <g transform="translate(71, 80) rotate(-15)">
        <path d="M 0 0 C 5 -10, -5 -10, 0 -20" strokeWidth="2"/>
         <path d="M 0 -7 L 5 -12" strokeWidth="1.5"/>
        <path d="M 0 -14 L -5 -19" strokeWidth="1.5"/>
      </g>
    </g>
  </svg>
);

export const HappyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CalmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M9 14h6m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" transform="rotate(45 12 12)" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0" transform="scale(1, -1) translate(0, -24)" />
  </svg>
);

export const FearfulIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="globe-gradient" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#00FFF7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.8" />
            </radialGradient>
            <filter id="globe-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#globe-gradient)" opacity="0.4" filter="url(#globe-glow)" />
        <g stroke="#C7D0D8" strokeWidth="1" fill="none" opacity="0.4">
            <circle cx="50" cy="50" r="45" />
            <ellipse cx="50" cy="50" rx="45" ry="15" />
            <ellipse cx="50" cy="50" rx="45" ry="30" />
            <path d="M 50 5 A 22.5 45 0 0 1 50 95" />
            <path d="M 50 5 A 22.5 45 0 0 0 50 95" />
        </g>
    </svg>
);

export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MoodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-15.75h12M6 9.75h12M6 15.75h12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3v18" />
  </svg>
);