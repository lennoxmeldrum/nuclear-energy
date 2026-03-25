import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Quiz } from '../components/ui/quiz';
import { Activity } from 'lucide-react';
import { BlockMath } from 'react-katex';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Section4Reactions() {
  const [initialAmount, setInitialAmount] = useState(100);
  const [halfLife, setHalfLife] = useState(10);
  const [timePassed, setTimePassed] = useState(0);
  const [data, setData] = useState<{ time: number, amount: number }[]>([]);

  useEffect(() => {
    const newData = [];
    for (let i = 0; i <= 5; i++) {
      newData.push({
        time: i * halfLife,
        amount: initialAmount * Math.pow(0.5, i)
      });
    }
    setData(newData);
  }, [initialAmount, halfLife]);

  const currentAmount = initialAmount * Math.pow(0.5, timePassed / halfLife);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
          Nuclear Reactions
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Fission, fusion, and the statistical process of radioactive decay (half-life).
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12 text-slate-300">
        <h3 className="text-2xl font-semibold text-orange-400 mb-4">Balancing Nuclear Equations</h3>
        <p>In all nuclear reactions, two fundamental conservation rules apply:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>The total of the <strong>atomic numbers</strong> (Z) on the left side must equal the total of the atomic numbers on the right side.</li>
          <li>The sum of the <strong>mass numbers</strong> (A) on the left must equal the sum of the mass numbers on the right.</li>
        </ol>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-orange-400 mb-3">Nuclear Fission</h4>
            <p className="mb-4 text-slate-300">The breakup of a larger, unstable nucleus into two or more smaller nuclei. This is often initiated by neutron bombardment.</p>
            <div className="bg-slate-900 p-3 rounded text-sm text-center overflow-x-auto">
              <BlockMath math="_{92}^{235}U + _{0}^{1}n \rightarrow _{36}^{89}Kr + _{56}^{144}Ba + 3 _{0}^{1}n" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-orange-400 mb-3">Nuclear Fusion</h4>
            <p className="mb-4 text-slate-300">The process where smaller nuclei join together to form a larger, more stable nucleus.</p>
            <div className="bg-slate-900 p-3 rounded text-sm text-center overflow-x-auto">
              <BlockMath math="_{1}^{2}H + _{1}^{3}H \rightarrow _{2}^{4}He + _{0}^{1}n" />
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-orange-400 mt-8 mb-4">Half-Life</h3>
        <p>The disintegration of unstable nuclei is a statistical process measured by <strong>half-life</strong>: the time required for half of the atoms in any given quantity of a radioactive substance to decay.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 md:col-span-2 max-w-3xl mx-auto w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Activity className="w-6 h-6" />
              Half-Life Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Initial Amount (g)</label>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Half-Life (years)</label>
                <input
                  type="number"
                  value={halfLife}
                  onChange={(e) => setHalfLife(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Time Passed (years): {timePassed}</label>
              <input
                type="range"
                min="0"
                max={halfLife * 5}
                step={halfLife / 10}
                value={timePassed}
                onChange={(e) => setTimePassed(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="p-4 bg-orange-900/30 border border-orange-500/50 rounded-lg text-center">
              <p className="text-sm text-orange-200">Remaining Amount</p>
              <p className="text-3xl font-bold text-orange-400">{currentAmount.toFixed(2)} g</p>
            </div>

            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `${value}y`} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#fb923c' }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#fb923c" strokeWidth={3} dot={{ r: 4, fill: '#fb923c' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Quiz
        title="Nuclear Reactions Quiz"
        questions={[
          {
            id: 1,
            text: "What is nuclear fission?",
            options: [
              "The joining together of two or more smaller nuclei to form a larger one.",
              "The breakup of a larger nucleus into two or more smaller nuclei.",
              "The emission of an alpha particle from a nucleus.",
              "The process of an electron jumping to a higher energy level."
            ],
            correctAnswer: 1,
            explanation: "Nuclear fission is the splitting of a large, unstable nucleus into smaller nuclei, often releasing significant energy and additional neutrons."
          },
          {
            id: 2,
            text: "If you start with 100 grams of a radioactive substance with a half-life of 5 years, how much will remain after 15 years?",
            options: [
              "50 grams",
              "25 grams",
              "12.5 grams",
              "6.25 grams"
            ],
            correctAnswer: 2,
            explanation: "15 years is 3 half-lives (15 / 5 = 3). 100g -> 50g (1st) -> 25g (2nd) -> 12.5g (3rd)."
          },
          {
            id: 3,
            text: "In a balanced nuclear equation, what must be conserved on both sides?",
            options: [
              "Only the total atomic numbers.",
              "Only the total mass numbers.",
              "Both the total atomic numbers and the total mass numbers.",
              "The number of electrons."
            ],
            correctAnswer: 2,
            explanation: "In all nuclear reactions, the sum of the atomic numbers (Z) and the sum of the mass numbers (A) must be equal on both sides of the equation."
          }
        ]}
      />
    </div>
  );
}
