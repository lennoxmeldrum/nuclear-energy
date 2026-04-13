import React from 'react';
import { Calculator, ExternalLink, FlaskConical, Radiation, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface Interactive {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const interactives: Interactive[] = [
  {
    id: 'decay-chain',
    title: 'Nuclear Decay Chain Visualizer',
    description:
      'Explore the four major radioactive decay series interactively. Predict the next isotope at each step by choosing between alpha and beta decay, and watch the chain unfold on a proton\u2013neutron chart.',
    url: 'https://explainsims.com/nuclear-decay-chain/',
    icon: <FlaskConical className="w-8 h-8" />,
    color: 'indigo',
  },
  {
    id: 'xkcd-radiation',
    title: 'XKCD Radiation Dose Explorer',
    description:
      'A guided walkthrough of the famous XKCD radiation dose chart. Step through everyday, medical, and industrial radiation exposures to build an intuition for how ionising radiation doses compare.',
    url: 'https://explainsims.com/xkcd-radation/',
    icon: <Radiation className="w-8 h-8" />,
    color: 'blue',
  },
  {
    id: 'nuclear-calculations',
    title: 'Nuclear Calculations Practice',
    description:
      'Work through 8 calculation topics — Bohr model energy levels, orbit radii, mass defect, binding energy, nuclear equations, isotopic abundance, and radioactive half-life — with full worked examples and multiple-choice practice problems.',
    url: 'https://explainsims.com/nuclear-calculations/',
    icon: <Calculator className="w-8 h-8" />,
    color: 'emerald',
  },
  {
    id: 'nuclear-reactor',
    title: 'Nuclear Reactor Anatomy',
    description:
      'Test your knowledge of reactor components in this drag-and-drop matching exercise. Identify the coolant loop, heat exchanger, control rods, radiation shielding, graphite moderator, fuel rods, and steam output by placing description cards onto the correct parts of the reactor diagram.',
    url: 'https://explainsims.como/nuclear-reactor/',
    icon: <Zap className="w-8 h-8" />,
    color: 'emerald',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; hoverBorder: string; iconBg: string }> = {
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/60',
    iconBg: 'bg-indigo-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/60',
    iconBg: 'bg-blue-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/60',
    iconBg: 'bg-emerald-500/20',
  },
};

export function SectionInteractives() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
          Interactive Apps
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Hands-on tools to deepen your understanding of nuclear physics concepts. Click on any app to launch it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {interactives.map((app) => {
          const colors = colorMap[app.color];
          return (
            <motion.a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block text-left p-6 rounded-xl border ${colors.border} ${colors.hoverBorder} ${colors.bg} backdrop-blur-sm transition-colors cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center ${colors.text}`}>
                  {app.icon}
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:underline decoration-1 underline-offset-4">
                {app.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {app.description}
              </p>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
