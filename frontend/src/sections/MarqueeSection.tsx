import React from 'react';
import { 
  SiBlender, 
  SiReact, 
  SiTypescript, 
  SiPython, 
  SiPytorch, 
  SiOpencv, 
  SiArduino, 
  SiTailwindcss, 
  SiFirebase 
} from 'react-icons/si';
import { TbCube3dSphere } from 'react-icons/tb';
import { FiCpu, FiCode } from 'react-icons/fi';
import { MdMovieEdit, MdBrush } from 'react-icons/md';
import { PiFilmSlateFill, PiPaintBrushBroad } from 'react-icons/pi';

const TOOLS = [
  { name: 'Premiere Pro', icon: MdMovieEdit, color: '#ffc7a6' },
  { name: 'After Effects', icon: PiFilmSlateFill, color: '#f0a07a' },
  { name: 'Blender 3D', icon: SiBlender, color: '#EA7600' },
  { name: 'Photoshop', icon: MdBrush, color: '#31A8FF' },
  { name: 'Illustrator', icon: PiPaintBrushBroad, color: '#FF9A00' },
  { name: 'React & Vite', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Python AI', icon: SiPython, color: '#3776AB' },
  { name: 'PyTorch Deep Learning', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Computer Vision (OpenCV)', icon: SiOpencv, color: '#5C3EE8' },
  { name: 'ESP32 & Arduino IoT', icon: SiArduino, color: '#00979D' },
  { name: 'MATLAB / Simulink', icon: FiCpu, color: '#c8714d' },
  { name: 'ANSYS FEA & CFD', icon: TbCube3dSphere, color: '#f0a07a' },
  { name: 'ETABS Structural', icon: FiCode, color: '#ffc7a6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Firebase Cloud', icon: SiFirebase, color: '#FFCA28' },
];

export const MarqueeSection: React.FC = () => {
  return (
    <div className="relative py-8 bg-[#0a0705] border-y border-[#c8714d]/20 overflow-hidden select-none">
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070504] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070504] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...TOOLS, ...TOOLS].map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={`${tool.name}-${idx}`}
              className="flex items-center gap-2.5 mx-5 px-4 py-2 rounded-xl bg-[#140e0b]/80 border border-[#c8714d]/20 backdrop-blur-sm hover:border-[#f0a07a]/60 hover:bg-[#1f1510] transition-colors"
            >
              <Icon className="w-4 h-4" style={{ color: tool.color }} />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-[#f6e9e1] whitespace-nowrap font-mono">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
