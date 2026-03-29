import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Quiz } from '../components/ui/quiz';
import { Radio, Shield, ShieldAlert, ShieldCheck, PlayCircle } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';

const videoResources = [
  {
    id: 'iL02oXZss2Q',
    title: `Mass Defect and Binding Energy`,
    description: `This video uses a relatable analogy—breaking a LEGO character apart—to explain why subatomic particles are different. It demonstrates that the mass of a whole helium atom is slightly less than the sum of its individual parts (protons, neutrons, and electrons). This difference, the mass defect, is the energy released (via E=mc²) when the nucleus forms. Conversely, this is the same amount of "binding energy" required to pull the nucleus back apart.`,
  },
  {
    id: 'h9VmWe4w7b8',
    title: `A 'cheatsheet' on Binding Energy`,
    description: `This concise guide emphasizes that binding energy is the measure of nuclear stability. It introduces the concept of binding energy per nucleon, which allows for a fair comparison of stability between small atoms like helium and massive ones like uranium. The video highlights the "binding energy curve," showing that Iron (Fe) sits at the peak of stability.`,
  },
  {
    id: 'dvhqzQ-K7K8',
    title: `Nuclear Radiation Explained`,
    description: `This video details the physical properties and common uses of radiation. It explains that alpha particles are emitted when a nucleus is too large, while beta particles are released when a nucleus has too many neutrons. It also clarifies that gamma rays are purely energy (photons) released when a nucleus has excess energy. Practical applications discussed include smoke alarms (alpha), thickness gauges (beta), and medical imaging (gamma).`,
  },
  {
    id: 's7zPzBnf6Us',
    title: `Different types of decay | Visual Explanation`,
    description: `Focusing on the biological and medical impacts, this video explains the "ionizing power" of different radiation types. Because alpha particles are large, they are highly ionizing but easily stopped by paper or skin. Beta particles are smaller and more penetrating, while gamma rays are the most penetrating, requiring lead or concrete to stop. It also introduces Beta Plus decay (positron emission), which is used in PET scans.`,
  },
  {
    id: 'oFdR_yMKOCw',
    title: `Radiation and Radioactive Decay`,
    description: `This video teaches you how to write and balance nuclear equations. It explains how to track changes in the atomic number and mass number during transmutation—for example, showing how Uranium-238 becomes Thorium-234 after emitting an alpha particle. It also uses the "belt of stability" graph to show how atoms use radioactive decay to reach a more stable ratio of protons to neutrons.`,
  },
];

export function Section3Radioactivity() {
  const [activeDecay, setActiveDecay] = useState<'alpha' | 'beta' | 'gamma' | null>(null);

  const decayTypes = {
    alpha: {
      title: 'Alpha (α) Decay',
      description: 'Emission of a helium nucleus (2 protons, 2 neutrons). Lowest penetrating power (stopped by paper).',
      equation: '_{88}^{226}Ra \\rightarrow _{86}^{222}Rn + _{2}^{4}He',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/30',
      borderColor: 'border-blue-500/50',
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      targetLeft: "45%",
      particle: (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-[0_0_15px_rgba(59,130,246,0.8)]">
          α
        </div>
      )
    },
    beta: {
      title: 'Beta (β) Decay',
      description: 'Emission of an electron from the nucleus (a neutron turns into a proton). Moderate penetrating power (stopped by aluminum).',
      equation: '_{6}^{14}C \\rightarrow _{7}^{14}N + _{-1}^{0}e',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/30',
      borderColor: 'border-purple-500/50',
      icon: <ShieldAlert className="w-6 h-6 text-purple-400" />,
      targetLeft: "70%",
      particle: (
        <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-[0_0_15px_rgba(168,85,247,0.8)]">
          β
        </div>
      )
    },
    gamma: {
      title: 'Gamma (γ) Rays',
      description: 'Emission of high-energy photons. Highest penetrating power (requires lead to stop).',
      equation: '_{Z}^{A}X^* \\rightarrow _{Z}^{A}X + \\gamma',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/30',
      borderColor: 'border-orange-500/50',
      icon: <ShieldCheck className="w-6 h-6 text-orange-400" />,
      targetLeft: "90%",
      particle: (
        <div className="w-12 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
      )
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Radioactivity
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          When the repulsive force overcomes binding energy, the nucleus disintegrates, throwing off pieces of itself and energy.
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12 text-slate-300">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">Mass Defect and Binding Energy</h3>
        <p>The total mass of a stable nucleus is <em>always less</em> than the sum of the individual masses of its protons and neutrons. This phenomenon is known as <strong>mass defect</strong>.</p>
        <p>The "lost" mass goes into energy called <strong>binding energy</strong>. The average binding energy per nucleon determines stability. If the repulsive force between protons overcomes the binding energy, the nucleus will blow apart or undergo nuclear disintegration, a process known as <strong>radioactivity</strong>.</p>

        <h3 className="text-2xl font-semibold text-purple-400 mt-8 mb-4">Types of Radiation</h3>
        <p className="mb-6">Early researchers classified radioactive emissions into three distinct types based on penetrating power:</p>
        
        <div className="grid md:grid-cols-3 gap-6 my-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h4 className="font-bold text-blue-400 text-lg mb-3">Alpha (α) Decay</h4>
            <p className="text-sm mb-4 text-slate-300">Alpha particles are helium nuclei (<InlineMath math="^4_2He" />). They have the lowest penetrating power (stopped by paper). The nucleus loses 2 protons and 2 neutrons.</p>
            <div className="bg-slate-900/80 p-3 rounded text-sm text-center"><BlockMath math="_{88}^{226}Ra \rightarrow _{86}^{222}Rn + _{2}^{4}He" /></div>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h4 className="font-bold text-purple-400 text-lg mb-3">Beta (β) Decay</h4>
            <p className="text-sm mb-4 text-slate-300">Beta particles are electrons emitted from the nucleus (<InlineMath math="_{-1}^{0}e" />). A neutron turns into a proton and an electron. Atomic number increases by 1; mass stays the same. Penetrates ~3mm of aluminum.</p>
            <div className="bg-slate-900/80 p-3 rounded text-sm text-center"><BlockMath math="_{6}^{14}C \rightarrow _{7}^{14}N + _{-1}^{0}e" /></div>
          </div>
          <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-500/30">
            <h4 className="font-bold text-orange-400 text-lg mb-3">Gamma (γ) Rays</h4>
            <p className="text-sm text-slate-300">Gamma rays are very high-energy photons. They have the highest penetrating power, requiring several centimeters of lead to stop them.</p>
          </div>
        </div>
        <p>The changing of one element into another through radioactive decay (like α or β decay) is called <strong>transmutation</strong>.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 md:col-span-2 max-w-3xl mx-auto w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Radio className="w-6 h-6" />
              Decay Visualizer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 justify-center">
              {(Object.keys(decayTypes) as Array<keyof typeof decayTypes>).map((type) => (
                <Button
                  key={type}
                  variant={activeDecay === type ? 'default' : 'outline'}
                  onClick={() => setActiveDecay(type)}
                  className={`capitalize ${activeDecay === type ? decayTypes[type].bgColor + ' ' + decayTypes[type].color + ' border ' + decayTypes[type].borderColor : 'border-slate-600 text-slate-300'}`}
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="relative h-48 w-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex items-center">
              {/* Nucleus */}
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center shadow-lg z-10">
                <div className="w-12 h-12 bg-red-500/20 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500/40 rounded-full" />
                </div>
              </div>

              {/* Barriers */}
              <div className="absolute left-[45%] top-0 bottom-0 w-4 bg-yellow-200/80 flex items-center justify-center border-x border-yellow-400/50 z-30">
                <span className="text-yellow-900 text-xs rotate-90 whitespace-nowrap font-bold tracking-widest">PAPER</span>
              </div>
              <div className="absolute left-[70%] top-0 bottom-0 w-6 bg-slate-300/80 flex items-center justify-center border-x border-slate-400/50 z-30">
                <span className="text-slate-800 text-xs rotate-90 whitespace-nowrap font-bold tracking-widest">ALUMINUM</span>
              </div>
              <div className="absolute left-[90%] top-0 bottom-0 w-12 bg-slate-600/80 flex items-center justify-center border-x border-slate-800/50 z-30">
                <span className="text-white text-xs rotate-90 whitespace-nowrap font-bold tracking-widest">LEAD</span>
              </div>

              {/* Particle Emission */}
              <AnimatePresence mode="wait">
                {activeDecay && (
                  <motion.div
                    key={activeDecay}
                    className="absolute top-1/2 -translate-y-1/2 z-20"
                    initial={{ left: "15%", opacity: 1 }}
                    animate={{ left: decayTypes[activeDecay].targetLeft, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
                  >
                    {decayTypes[activeDecay].particle}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!activeDecay && (
                <div className="absolute left-[25%] top-1/2 -translate-y-1/2 text-slate-500 text-sm italic">
                  Select a decay type to visualize
                </div>
              )}
            </div>

            {activeDecay && (
              <div className={`p-4 rounded-lg border ${decayTypes[activeDecay].bgColor} ${decayTypes[activeDecay].borderColor} animate-in fade-in slide-in-from-bottom-4`}>
                <div className="flex items-center gap-2 mb-2">
                  {decayTypes[activeDecay].icon}
                  <h4 className={`font-bold ${decayTypes[activeDecay].color}`}>{decayTypes[activeDecay].title}</h4>
                </div>
                <p className="text-slate-300 text-sm mb-4">{decayTypes[activeDecay].description}</p>
                <div className="bg-slate-900/50 p-3 rounded overflow-x-auto text-center">
                  <BlockMath math={decayTypes[activeDecay].equation} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Quiz
        title="Radioactivity Quiz"
        questions={[
          {
            id: 1,
            text: "What is mass defect?",
            options: [
              "When a nucleus has too many neutrons and becomes unstable.",
              "The difference between the mass of an atom and its constituent nucleons.",
              "When an electron is missing from an orbit.",
              "The energy released during beta decay."
            ],
            correctAnswer: 1,
            explanation: "Mass defect is the phenomenon where the total mass of a stable nucleus is less than the sum of the masses of its constituent protons and neutrons. The 'lost' mass is converted into binding energy."
          },
          {
            id: 2,
            text: "Which type of radiation has the highest penetrating power?",
            options: [
              "Alpha particles",
              "Beta particles",
              "Gamma rays",
              "Neutrons"
            ],
            correctAnswer: 2,
            explanation: "Gamma rays are high-energy photons and have the highest penetrating power, requiring several centimeters of lead to stop them."
          },
          {
            id: 3,
            text: "What happens to the atomic number and mass number of a nucleus during beta decay?",
            options: [
              "Atomic number decreases by 2, mass number decreases by 4.",
              "Atomic number increases by 1, mass number stays the same.",
              "Atomic number stays the same, mass number decreases by 1.",
              "Atomic number decreases by 1, mass number increases by 1."
            ],
            correctAnswer: 1,
            explanation: "In beta decay, a neutron turns into a proton and an electron. The electron is emitted. Since a proton is gained, the atomic number increases by 1. Since a neutron is lost but a proton is gained, the total mass number stays the same."
          }
        ]}
      />

      {/* Video Resources */}
      <div className="mt-12 p-8 bg-slate-900/50 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
          <PlayCircle className="w-6 h-6 text-emerald-400" />
          <h3 className="text-2xl font-semibold text-emerald-400">Video Resources</h3>
        </div>
        <div className="flex flex-col gap-6">
          {videoResources.map((video) => (
            <div
              key={video.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]"
            >
              <h4 className="text-base font-semibold text-blue-400 mb-3">{video.title}</h4>
              <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
