import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Quiz } from '../components/ui/quiz';
import { CircleDot, Plus, Minus } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';

export function Section2Isotopes() {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);

  const elements = [
    { z: 1, symbol: 'H', name: 'Hydrogen' },
    { z: 2, symbol: 'He', name: 'Helium' },
    { z: 3, symbol: 'Li', name: 'Lithium' },
    { z: 4, symbol: 'Be', name: 'Beryllium' },
    { z: 5, symbol: 'B', name: 'Boron' },
    { z: 6, symbol: 'C', name: 'Carbon' },
  ];

  const currentElement = elements.find(e => e.z === protons) || { symbol: '?', name: 'Unknown' };
  const massNumber = protons + neutrons;

  const getIsotopeName = () => {
    if (protons === 1) {
      if (neutrons === 0) return 'Protium';
      if (neutrons === 1) return 'Deuterium';
      if (neutrons === 2) return 'Tritium';
    }
    return `${currentElement.name}-${massNumber}`;
  };

  const isStable = () => {
    // Very simplified stability check for the first few elements
    if (protons === 1 && neutrons <= 2) return true;
    if (protons === 2 && (neutrons === 1 || neutrons === 2)) return true;
    if (protons === 3 && (neutrons === 3 || neutrons === 4)) return true;
    if (protons === 4 && neutrons === 5) return true;
    if (protons === 5 && (neutrons === 5 || neutrons === 6)) return true;
    if (protons === 6 && (neutrons === 6 || neutrons === 7)) return true;
    return false;
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          Isotopes & Nuclear Stability
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The nucleus contains protons and neutrons bound by the strong force. Isotopes are variants of elements with different neutron counts.
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12 text-slate-300">
        <h3 className="text-2xl font-semibold text-emerald-400 mb-4">The Nucleus and The Strong Force</h3>
        <p>The nuclei of atoms contain positively charged protons and neutral neutrons (collectively known as <strong>nucleons</strong>). Because protons are densely packed, they experience a tremendous repulsive electrostatic force. The <strong>strong force</strong> is the fundamental interaction that binds protons and neutrons together; without it, the nucleus would blow apart.</p>
        <p>The neutron was discovered by <strong>James Chadwick</strong> in 1932 by bombarding hydrogen atoms in paraffin with beryllium emissions, finding a neutral particle with roughly the same mass as a proton.</p>

        <h3 className="text-2xl font-semibold text-emerald-400 mt-8 mb-4">Nuclear Notation</h3>
        <p>To specify a nuclide, we use a standard nuclear symbol:</p>
        <div className="flex items-center justify-center p-6 bg-slate-800/50 rounded-lg border border-slate-700 my-6">
          <div className="text-4xl"><BlockMath math="_{Z}^{A}X" /></div>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>X</strong> = Chemical symbol of the element.</li>
          <li><strong>Atomic Number (Z)</strong> = Number of protons. Determines the element's identity.</li>
          <li><strong>Mass Number (A)</strong> = Total number of nucleons (protons + neutrons).</li>
          <li><strong>Neutrons (N)</strong> = Calculated as <InlineMath math="N = A - Z" />.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-emerald-400 mt-8 mb-4">Isotopes</h3>
        <p>Nuclei that share the same number of protons (Z) but have different numbers of neutrons (N) are called <strong>isotopes</strong>. For example, hydrogen has three main isotopes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><InlineMath math="^1_1H" /> (1 proton, 0 neutrons)</li>
          <li><InlineMath math="^2_1H" /> (1 proton, 1 neutron - sometimes called deuterium)</li>
          <li><InlineMath math="^3_1H" /> (1 proton, 2 neutrons - sometimes called tritium)</li>
        </ul>
        <p>The <em>atomic weight</em> found on the periodic table is a weighted average of an element's naturally occurring isotopes based on their abundance.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 md:col-span-2 max-w-2xl mx-auto w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <CircleDot className="w-6 h-6" />
              Isotope Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex justify-center items-center p-8 bg-slate-900 rounded-xl border border-slate-700">
              <div className="text-6xl font-mono text-white flex items-center">
                <div className="flex flex-col text-2xl mr-2 text-right text-slate-400">
                  <span>{massNumber}</span>
                  <span>{protons}</span>
                </div>
                {currentElement.symbol}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div>
                  <h4 className="font-semibold text-red-400">Protons (Z)</h4>
                  <p className="text-xs text-slate-400">Determines the element</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={() => setProtons(Math.max(1, protons - 1))} disabled={protons <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-mono w-8 text-center">{protons}</span>
                  <Button variant="outline" size="icon" onClick={() => setProtons(Math.min(6, protons + 1))} disabled={protons >= 6}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-300">Neutrons (N)</h4>
                  <p className="text-xs text-slate-400">Determines the isotope</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={() => setNeutrons(Math.max(0, neutrons - 1))} disabled={neutrons <= 0}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-mono w-8 text-center">{neutrons}</span>
                  <Button variant="outline" size="icon" onClick={() => setNeutrons(Math.min(10, neutrons + 1))} disabled={neutrons >= 10}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border text-center font-medium transition-colors ${
              isStable() ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400' : 'bg-red-900/30 border-red-500/50 text-red-400'
            }`}>
              {getIsotopeName()} - {isStable() ? 'Stable' : 'Unstable (Radioactive)'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Quiz
        title="Isotopes Quiz"
        questions={[
          {
            id: 1,
            text: "What do different isotopes of a given element have in common?",
            options: [
              "They have the same mass number.",
              "They have the same number of neutrons.",
              "They have the same number of protons.",
              "They have the same atomic weight."
            ],
            correctAnswer: 2,
            explanation: "Isotopes of an element always have the same number of protons (atomic number), which defines the element, but differ in the number of neutrons."
          },
          {
            id: 2,
            text: "What particle did James Chadwick discover in 1932 that explained the missing mass in the nucleus?",
            options: [
              "Electron",
              "Proton",
              "Neutron",
              "Alpha particle"
            ],
            correctAnswer: 2,
            explanation: "Chadwick discovered the neutron, an electrically neutral particle with a mass approximately equal to that of a proton."
          },
          {
            id: 3,
            text: "If a nuclide has an atomic number (Z) of 6 and a mass number (A) of 14, how many neutrons does it have?",
            options: [
              "6",
              "8",
              "14",
              "20"
            ],
            correctAnswer: 1,
            explanation: "The number of neutrons (N) is calculated as A - Z. So, 14 - 6 = 8 neutrons. This is Carbon-14."
          }
        ]}
      />
    </div>
  );
}
