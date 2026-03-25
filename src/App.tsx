import React, { useState } from 'react';
import { Section1Bohr } from './sections/Section1Bohr';
import { Section2Isotopes } from './sections/Section2Isotopes';
import { Section3Radioactivity } from './sections/Section3Radioactivity';
import { Section4Reactions } from './sections/Section4Reactions';
import { Section5Reactors } from './sections/Section5Reactors';
import { Atom, CircleDot, Radio, Activity, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "Bohr's Model", icon: <Atom className="w-5 h-5" />, component: <Section1Bohr /> },
    { id: 1, title: "Isotopes", icon: <CircleDot className="w-5 h-5" />, component: <Section2Isotopes /> },
    { id: 2, title: "Radioactivity", icon: <Radio className="w-5 h-5" />, component: <Section3Radioactivity /> },
    { id: 3, title: "Reactions", icon: <Activity className="w-5 h-5" />, component: <Section4Reactions /> },
    { id: 4, title: "Reactors", icon: <Power className="w-5 h-5" />, component: <Section5Reactors /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/50">
                <Atom className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                Applied Nuclear Physics
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 mb-12 p-1 bg-slate-900/50 rounded-xl border border-slate-800 w-fit mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.title}</span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {tabs[activeTab].component}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-800 bg-slate-900/50 py-8 text-center text-slate-500 text-sm">
        <p>Interactive study resource derived from Applied Nuclear Physics documents.</p>
      </footer>
    </div>
  );
}
