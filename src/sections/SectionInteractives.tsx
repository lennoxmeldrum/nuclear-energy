import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, FlaskConical, Radiation } from 'lucide-react';
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
      'Explore the four major radioactive decay series interactively. Predict the next isotope at each step by choosing between alpha and beta decay, and watch the chain unfold on a proton–neutron chart.',
    url: 'https://lennoxmeldrum.github.io/nuclear-decay-chain/',
    icon: <FlaskConical className="w-8 h-8" />,
    color: 'indigo',
  },
  {
    id: 'xkcd-radiation',
    title: 'XKCD Radiation Dose Explorer',
    description:
      'A guided walkthrough of the famous XKCD radiation dose chart. Step through everyday, medical, and industrial radiation exposures to build an intuition for how ionising radiation doses compare.',
    url: 'https://lennoxmeldrum.github.io/xkcd-radation/',
    icon: <Radiation className="w-8 h-8" />,
    color: 'blue',
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
};

export function SectionInteractives() {
  const [activeApp, setActiveApp] = useState<Interactive | null>(null);

  if (activeApp) {
    return (
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setActiveApp(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Interactives
          </button>
          <h2 className="text-lg font-semibold text-white">{activeApp.title}</h2>
          <a
            href={activeApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Open in new tab <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex-1 rounded-xl overflow-hidden border border-slate-700">
          <iframe
            src={activeApp.url}
            title={activeApp.title}
            className="w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      </div>
    );
  }

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
            <motion.button
              key={app.id}
              onClick={() => setActiveApp(app)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-6 rounded-xl border ${colors.border} ${colors.hoverBorder} ${colors.bg} backdrop-blur-sm transition-colors cursor-pointer group`}
            >
              <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center ${colors.text} mb-4`}>
                {app.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:underline decoration-1 underline-offset-4">
                {app.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {app.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
