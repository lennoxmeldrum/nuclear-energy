import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Quiz } from '../components/ui/quiz';
import { Button } from '../components/ui/button';
import { Atom, Zap, PlayCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const videoResources = [
  {
    id: 'njGz69B_pUg',
    title: 'History of the Atom',
    description:
      'This video traces the chronological development of atomic theory. It begins with the early philosophical ideas of Democritus and moves through the scientific milestones of Dalton, Thompson\u2019s \u201cplum pudding\u201d model, and Rutherford\u2019s gold foil experiment. It concludes by introducing how Bohr and later quantum physicists like Schr\u00f6dinger and Heisenberg refined the model to include electron probability and the discovery of the neutron.',
  },
  {
    id: 'au2HCVn9IJI',
    title: 'Bohr Model of the Hydrogen Atom',
    description:
      'Focusing specifically on the mechanics of the Bohr model, this video explains how energy quantization solves the problem of atomic stability. It details how electrons occupy fixed energy levels and transition between them by absorbing or emitting photons of specific frequencies. It also introduces the Lyman and Balmer series, explaining how these transitions create the unique \u201cfingerprint\u201d of an element\u2019s emission spectrum.',
  },
  {
    id: '_Gt7mo8SNkA',
    title: 'What is the Bohr Model of the Atom?',
    description:
      'This video provides a deep dive into the mathematical and theoretical foundations of Bohr\u2019s work. It explores the conflict between classical electromagnetism and the observed stability of atoms, explaining Bohr\u2019s four postulates\u2014including the quantization of angular momentum. It walks through the derivation of the Bohr radius and the specific energy levels for hydrogen, ending with how these constants align with experimental data.',
  },
  {
    id: 'GhAn8xZQ-d8',
    title: 'The Bohr Atom',
    description:
      'This overview highlights the \u201cladder\u201d analogy for electron energy levels, where electrons must exist at specific rungs and never in between. It emphasizes how the Bohr model successfully predicted the observed spectral lines in space that classical physics could not explain. The video also touches on how the periodic table\u2019s organization is fundamentally rooted in these electron energy states.',
  },
  {
    id: 'y9kWdegtrs0',
    title: "Understanding Bohr's Atom: Postulates and Limitations",
    description:
      'While reinforcing the key postulates of circular orbits and discrete energy jumps, this video also addresses the scientific shortcomings of the Bohr model. It discusses why the model only works perfectly for hydrogen and fails to explain more complex atoms, the varying intensities of spectral lines, or the \u201cZeeman effect\u201d (the splitting of lines in a magnetic field).',
  },
];

export function Section1Bohr() {
  const [electronLevel, setElectronLevel] = useState(1);
  const [isExcited, setIsExcited] = useState(false);

  const exciteElectron = () => {
    if (electronLevel < 4) {
      setElectronLevel(electronLevel + 1);
      setIsExcited(true);
      setTimeout(() => setIsExcited(false), 500);
    }
  };

  const relaxElectron = () => {
    if (electronLevel > 1) {
      setElectronLevel(electronLevel - 1);
      setIsExcited(true);
      setTimeout(() => setIsExcited(false), 500);
    }
  };

  const getEnergyLatex = (n: number) => {
    const energy = -2.17 * Math.pow(10, -18) * (1 / Math.pow(n, 2));
    const [coef, exp] = energy.toExponential(2).split('e');
    return `${coef} \\times 10^{${parseInt(exp, 10)}}`;
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Bohr's Atomic Model
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          From the plum pudding model to the discovery of the nucleus and quantized energy levels.
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12 text-slate-300">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Early History & The Planetary Model</h3>
        <p>In 1803, <strong>John Dalton</strong> developed an atomic theory backed by careful chemical measurements, proposing that matter is composed of indivisible atoms, all atoms of an element are identical, and compounds are bonded combinations of different elements. Later, in 1903, <strong>J.J. Thomson</strong> proposed the "plum-pudding" model, suggesting the atom was a positively charged sphere with electrons distributed inside.</p>
        <p>This changed in 1911 due to <strong>Ernest Rutherford</strong>. In 1909, Hans Geiger and Ernest Marsden conducted the <em>gold foil experiment</em>. Firing dense \u03b1 particles at a thin gold foil, they expected them to pass straight through. Instead, some were deflected drastically. Using Coulomb's and Newton's laws, Rutherford concluded that almost all the atom's mass and positive charge is concentrated in a tiny central core called the <strong>nucleus</strong>, meaning the atom is mostly empty space.</p>
        
        <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">Problems with the Planetary Model</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>According to classical mechanics, a charged particle undergoing acceleration (like an electron orbiting a nucleus) should constantly emit electromagnetic radiation, losing energy and eventually collapsing into the nucleus.</li>
          <li>It could not explain the specific light frequencies (emission spectra) emitted by atoms when they gain energy.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-blue-400 mt-8 mb-4">The Bohr Model (Quantization)</h3>
        <p><strong>Niels Bohr</strong> combined Rutherford's nuclear model with Einstein's quantum theory. He hypothesized that electrons are organized into stepwise, stable energy levels. Electrons only radiate or absorb energy when moving between these levels, meaning atomic energy comes in distinct packages (quanta).</p>
        <div className="bg-slate-800/50 p-6 rounded-lg my-6 border border-slate-700">
          <p className="mb-4">Einstein's theory defines the energy of a light photon as <InlineMath math="hf" />, where <InlineMath math="h" /> is Planck's constant and <InlineMath math="f" /> is frequency. When an electron transitions, the emitted photon's energy is:</p>
          <div className="text-center text-xl mb-6"><BlockMath math="hf = E_{higher} - E_{lower}" /></div>
          <p className="mb-4">For a hydrogen atom, the energy of an electron in a given energy level <InlineMath math="n" /> is calculated by:</p>
          <div className="text-center text-xl"><BlockMath math="E_n = (-2.17 \\times 10^{-18} \\text{ J}) \\left(\\frac{1}{n^2}\\right)" /></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm md:col-span-2 max-w-2xl mx-auto w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Atom className="w-6 h-6" />
              Interactive Bohr Model
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Nucleus */}
              <div className="absolute w-8 h-8 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] z-10 flex items-center justify-center">
                <span className="text-xs font-bold text-white">+</span>
              </div>

              {/* Orbits */}
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`absolute rounded-full border border-slate-600/50 transition-all duration-500 ${
                    electronLevel === n ? 'border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.2)]' : ''
                  }`}
                  style={{
                    width: `${n * 50}px`,
                    height: `${n * 50}px`,
                  }}
                />
              ))}

              {/* Electron Container (Rotates to create orbit) */}
              <motion.div
                className="absolute w-full h-full flex items-center justify-center z-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                {/* Electron (Translated outward by radius) */}
                <motion.div
                  className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                  animate={{ x: electronLevel * 25 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              </motion.div>

              {/* Photon Emission/Absorption Effect */}
              {isExcited && (
                <motion.div
                  initial={{ opacity: 1, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full rounded-full border-2 border-emerald-400/50"
                />
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={relaxElectron} disabled={electronLevel === 1} variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-950">
                Emit Photon (Relax)
              </Button>
              <Button onClick={exciteElectron} disabled={electronLevel === 4} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                Absorb Photon (Excite)
              </Button>
            </div>

            <div className="w-full p-4 bg-slate-900 rounded-lg border border-slate-700">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Current State:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="text-slate-500 mr-2">Energy Level (<InlineMath math="n" />):</span>
                  <span className="text-blue-400 font-mono">{electronLevel}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-slate-500 mr-2">Energy (<InlineMath math="E_n" />):</span>
                  <span className="text-emerald-400">
                    <InlineMath math={`${getEnergyLatex(electronLevel)}\\text{ J}`} />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Quiz
        title="Bohr Model Quiz"
        questions={[
          {
            id: 1,
            text: "What did Rutherford's gold foil experiment demonstrate?",
            options: [
              "Electrons are embedded in a positive pudding.",
              "Atoms are indivisible solid spheres.",
              "Almost all the mass of an atom is in a tiny, dense nucleus.",
              "Electrons orbit in quantized energy levels."
            ],
            correctAnswer: 2,
            explanation: "Rutherford's experiment showed that alpha particles were deflected by a tiny, dense, positively charged nucleus, disproving the plum pudding model."
          },
          {
            id: 2,
            text: "Why did the planetary model of the atom fail according to classical mechanics?",
            options: [
              "It couldn't explain the existence of neutrons.",
              "An accelerating charged particle should emit radiation and spiral into the nucleus.",
              "It predicted that atoms would be too large.",
              "It couldn't explain why atoms have mass."
            ],
            correctAnswer: 1,
            explanation: "Classical physics states that an accelerating charge (like an orbiting electron) must radiate energy, which would cause it to lose speed and collapse into the nucleus."
          },
          {
            id: 3,
            text: "According to Bohr's model, when does an atom emit light?",
            options: [
              "When an electron moves to a higher energy level.",
              "When an electron moves to a lower energy level.",
              "When the nucleus vibrates.",
              "When an electron spins faster in its current orbit."
            ],
            correctAnswer: 1,
            explanation: "Light (a photon) is emitted when an electron drops from a higher energy state to a lower, more stable energy state, releasing the energy difference."
          }
        ]}
      />

      {/* Video Resources */}
      <div className="mt-12 p-8 bg-slate-900/50 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
          <PlayCircle className="w-6 h-6 text-emerald-400" />
          <h3 className="text-2xl font-semibold text-emerald-400">Video Resources</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
