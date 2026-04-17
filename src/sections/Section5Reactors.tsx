import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Quiz } from '../components/ui/quiz';
import { AlertTriangle, Power, Thermometer, PlayCircle } from 'lucide-react';
import { BlockMath } from 'react-katex';

const videoResources = [
  {
    id: '1U6Nzcv9Vws',
    title: `Nuclear Reactor - Understanding how it works`,
    description: `This video provides a clear breakdown of the three essential components of a fission reactor: the fuel elements (uranium rods), the moderator (water used to slow down neutrons), and the control rods (boron or cadmium used to absorb excess neutrons). It explains the necessity of a moderator by noting that high-energy neutrons are 500 times less likely to trigger a new fission reaction than "thermal" (slowed) neutrons.`,
  },
  {
    id: '5hASAKEIisc',
    title: `How Nuclear Fission Reactors Work`,
    description: `Focusing on the thermodynamics of power generation, this video explains how the reactor's heat is transferred through a primary loop of pressurized water to a secondary steam loop. This steam then spins a turbine to generate electricity. It also addresses the "startup" problem, noting that random spontaneous fission of Uranium-238 provides the initial neutrons needed to ignite the chain reaction.`,
  },
  {
    id: 'X49o8x0WM4w',
    title: `Going Nuclear with Neil deGrasse Tyson`,
    description: `Tyson explores the physics of the "strong force" and how it acts as the glue of the nucleus until it is overcome by neutron bombardment. He clarifies the concept of critical mass—the minimum amount of fissile material needed to sustain a chain reaction. The video also touches on the "supernova" process in stars, where fusion stops at iron because fusing iron actually consumes energy rather than releasing it.`,
  },
  {
    id: 'm6MgEbbrTUM',
    title: `What Are Fast Breeder Reactors?`,
    description: `This video explains the unique design of breeder reactors, which do not use a moderator. By utilizing "fast" neutrons, these reactors convert non-fissile Uranium-238 into Plutonium-239, effectively breeding more fuel than they consume. It also discusses the use of liquid sodium as a coolant, chosen because it doesn't slow down neutrons, and mentions the military and proliferation concerns surrounding plutonium production.`,
  },
  {
    id: 'UN--w0CZZ4o',
    title: `4 Nuclear Reactor Types EXPLAINED`,
    description: `This summary categorizes reactors into four types: Power reactors for electricity, Breeder reactors for fuel sustainability, Research/Test reactors (which act as neutron sources rather than power plants), and Transport reactors used in submarines and icebreakers. It highlights that transport reactors often use much higher levels of uranium enrichment (over 80%) compared to the 3-5% used in civilian power plants.`,
  },
];

export function Section5Reactors() {
  const [controlRodLevel, setControlRodLevel] = useState(50);
  const [temperature, setTemperature] = useState(300);
  const [powerOutput, setPowerOutput] = useState(0);
  const [isMeltdown, setIsMeltdown] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isMeltdown) {
      interval = setInterval(() => {
        const targetPower = controlRodLevel * 10;
        setPowerOutput(prev => {
          const diff = targetPower - prev;
          return prev + diff * 0.1;
        });

        const cooling = 50;
        const heatGeneration = (controlRodLevel / 100) * 150;
        
        setTemperature(prev => {
          let newTemp = prev + heatGeneration - cooling;
          if (newTemp < 300) newTemp = 300;
          
          if (newTemp > 1200) {
            setIsMeltdown(true);
            return 1200;
          }
          return newTemp;
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [controlRodLevel, isMeltdown]);

  const resetReactor = () => {
    setControlRodLevel(0);
    setTemperature(300);
    setPowerOutput(0);
    setIsMeltdown(false);
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          Nuclear Reactors
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Harnessing the power of nuclear fission to generate electricity.
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12 text-slate-300">
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Fission Reactors</h3>
        <p>A <strong>nuclear reactor</strong> carries out a nuclear chain reaction at a controlled rate. Most generate electricity using a simple design: the heat from the fission reaction boils water into steam, the steam spins a turbine, and the turbine turns an electrical generator.</p>

        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 my-8">
          <h4 className="text-xl font-semibold text-yellow-400 mb-4">Reactor Components</h4>
          <ul className="space-y-4">
            <li>
              <strong className="text-white">Fissionable Fuel:</strong> Naturally occurring uranium is 99% U-238 and 1% U-235. Only U-235 undergoes fission effectively. It is physically separated to create <strong>enriched uranium</strong> (at least 3% U-235), which is placed in long cylindrical tubes called <em>fuel rods</em>.
            </li>
            <li>
              <strong className="text-white">Control Rods:</strong> Made of neutron-absorbing material and bundled with the fuel rods. By raising or lowering them, operators control the rate of the chain reaction. Lowering them completely stops the reaction. They operate on a fail-safe gravity system during power failures.
            </li>
            <li>
              <strong className="text-white">Moderator:</strong> U-235 captures neutrons more efficiently if they are moving slower. A <em>moderator</em> slows the neutrons down. Water is an excellent coolant and moderator, defining the widely used <strong>Light Water Reactor (LWR)</strong> where the fuel core is submerged in a huge pool of water.
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-yellow-400 mt-8 mb-4">Magnox Reactors</h3>
        <p>The <strong>Magnox reactor</strong> is an early type of nuclear power reactor developed in the United Kingdom in the 1950s and 1960s. It uses natural (unenriched) uranium metal as fuel, graphite as the moderator to slow neutrons, and carbon dioxide gas as the coolant. The name "Magnox" comes from the magnesium non-oxidising alloy used to clad the fuel rods.</p>

        <div className="my-8 flex flex-col items-center">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Magnox_reactor_schematic.svg"
            alt="Magnox reactor schematic diagram"
            className="w-full max-w-2xl rounded-lg border border-slate-700 bg-white/5 p-2"
          />
          <p className="text-sm text-slate-500 mt-2 text-center italic">Schematic diagram of a Magnox reactor (Wikipedia / Public Domain)</p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 my-8">
          <h4 className="text-xl font-semibold text-yellow-400 mb-6">Step-by-Step Process</h4>
          <ol className="space-y-5 list-none">
            {[
              { title: "The Chain Reaction", text: "Inside the core, uranium atoms inside the fuel rods undergo nuclear fission, splitting apart and releasing massive amounts of heat and fast-moving neutrons." },
              { title: "Sustaining the Reaction", text: "The graphite moderator slows down these fast neutrons. Neutrons must be moving at a specific, slower speed to successfully split other uranium atoms and keep the chain reaction going." },
              { title: "Controlling the Heat", text: "Operators move the control rods up and down. If the reactor is getting too hot, they lower the rods to absorb more neutrons, which slows down the fission rate." },
              { title: "Transferring Heat", text: "A primary coolant enters the bottom of the core by the gas circulator. As it flows up past the burning-hot fuel rods, the coolant becomes superheated." },
              { title: "Creating Steam", text: "The hot coolant travels through the hot gas duct into the heat exchanger. Here, it flows past pipes filled with water. The heat transfers from the coolant to the water, boiling the water into high-pressure steam." },
              { title: "Generating Electricity", text: "The steam travels out to a turbine (not pictured). The pressure of the steam forces the turbine blades to spin, which turns an electrical generator using electromagnetic induction." },
              { title: "Recycling", text: "The coolant, having lost its heat to the water, is now cool. It travels down the cool gas duct and is pumped back into the reactor by the gas circulator to repeat the cycle." },
            ].map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-sm font-bold flex items-center justify-center">{index + 1}</span>
                <div>
                  <strong className="text-white">{step.title}:</strong>{' '}
                  <span className="text-slate-300">{step.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <h4 className="text-xl font-semibold text-yellow-400 mt-8 mb-4">Component Breakdown</h4>

        <div className="space-y-6 my-6">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-700/40">
            <h5 className="text-lg font-semibold text-amber-400 mb-4">The Reactor Core</h5>
            <ul className="space-y-3">
              <li><strong className="text-white">Fuel Rods:</strong> They contain pellets of Uranium-238 enriched with Uranium-235. This is where the actual nuclear fission takes place.</li>
              <li><strong className="text-white">Moderator:</strong> This is the section surrounding the fuel rods. It slows down the neutrons produced by fission so they can trigger further fission reactions. Graphite or molten salts are commonly used but an alternative is deuterium/heavy water.</li>
              <li><strong className="text-white">Control Rods:</strong> These are the rods inserted from the top. Usually made from steel mixed with cadmium or boron, they act like the "brakes" of the reactor. They absorb neutrons to control the rate of the reaction or shut it down completely.</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-700/40">
            <h5 className="text-lg font-semibold text-blue-400 mb-4">Safety &amp; Containment</h5>
            <ul className="space-y-3">
              <li><strong className="text-white">Radiation Shielding:</strong> This is a thick outer wall. Usually made of heavy materials like lead or specialized concrete, it prevents dangerous radiation from escaping the reactor building.</li>
              <li><strong className="text-white">Pressure Vessel:</strong> The inner casing holds the highly pressurized gas and the reactor core safely inside.</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-emerald-700/40">
            <h5 className="text-lg font-semibold text-emerald-400 mb-4">Cooling and Electricity Generation</h5>
            <ul className="space-y-3">
              <li><strong className="text-white">Coolant System:</strong> This system takes heat away from the core. The diagram shows a Gas Circulator pushing gas through Hot and Cool Gas Ducts.</li>
              <li><strong className="text-white">Heat Exchanger:</strong> This is where the intense heat from the reactor's primary coolant loop is transferred to a secondary loop of water to create steam.</li>
              <li><strong className="text-white">Steam Output:</strong> The pipe at the top right carries the newly created steam away. This steam is used to turn a turbine, producing electricity via electromagnetic induction.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-yellow-400 mt-8 mb-4">Breeder Reactors</h3>
        <p>Because natural U-235 is limited, a <strong>breeder reactor</strong> can be used to convert non-fissile U-238 into a new fissionable fuel, Plutonium-239, through this series of reactions:</p>
        <div className="bg-slate-900 p-6 rounded-lg overflow-x-auto my-6 border border-slate-700">
          <BlockMath math="_{92}^{238}U + _{0}^{1}n \rightarrow _{92}^{239}U \rightarrow _{-1}^{0}e + _{93}^{239}Np \rightarrow _{-1}^{0}e + _{94}^{239}Pu" />
        </div>
        <p>This process creates more fuel than it consumes, potentially extending fuel supplies a hundred-fold. However, Pu-239 is an extremely deadly poison, and unlike LWRs, out-of-control breeder reactors can explode. There are no civilian breeder reactors operating in the U.S. power grid.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className={`bg-slate-800/50 border-slate-700 transition-colors duration-1000 md:col-span-2 max-w-3xl mx-auto w-full ${isMeltdown ? 'border-red-500 bg-red-950/50' : ''}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isMeltdown ? 'text-red-500' : 'text-yellow-400'}`}>
              <Power className="w-6 h-6" />
              Reactor Control Room
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {isMeltdown && (
              <div className="p-4 bg-red-900/80 border border-red-500 rounded-lg flex items-center gap-4 animate-pulse">
                <AlertTriangle className="w-8 h-8 text-red-200" />
                <div>
                  <h4 className="font-bold text-red-100 text-lg">MELTDOWN IMMINENT</h4>
                  <p className="text-red-200 text-sm">Core temperature exceeded critical limits.</p>
                </div>
                <Button onClick={resetReactor} variant="outline" className="ml-auto border-red-200 text-red-200 hover:bg-red-800">
                  SCRAM (Reset)
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-8">
              {/* Reactor Visual */}
              <div className="relative h-64 bg-slate-900 rounded-xl border-4 border-slate-700 overflow-hidden flex justify-center items-end p-4">
                {/* Core Water */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500/30 transition-all duration-1000"
                  style={{ 
                    height: '80%',
                    backgroundColor: isMeltdown ? 'rgba(239, 68, 68, 0.5)' : temperature > 800 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(59, 130, 246, 0.3)'
                  }}
                />
                
                {/* Fuel Rods */}
                <div className="flex gap-2 h-48 z-10">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-4 h-full bg-emerald-600 rounded-t-sm shadow-[0_0_10px_rgba(5,150,105,0.5)] relative overflow-hidden">
                      {/* Control Rods (descending from top) */}
                      <div 
                        className="absolute top-0 left-0 right-0 bg-slate-400 transition-all duration-500"
                        style={{ height: `${100 - controlRodLevel}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls & Metrics */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Control Rods</span>
                    <span className="text-yellow-400 font-mono">{controlRodLevel}% Withdrawn</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={controlRodLevel}
                    onChange={(e) => setControlRodLevel(Number(e.target.value))}
                    disabled={isMeltdown}
                    className="w-full accent-yellow-500"
                  />
                  <p className="text-xs text-slate-500">Pull out to increase reaction rate.</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400 flex items-center gap-1"><Thermometer className="w-4 h-4" /> Core Temp</span>
                      <span className={`font-mono ${temperature > 900 ? 'text-red-400' : 'text-orange-400'}`}>
                        {Math.round(temperature)}°C
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${temperature > 900 ? 'bg-red-500' : temperature > 600 ? 'bg-orange-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, (temperature / 1200) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400 flex items-center gap-1"><Power className="w-4 h-4" /> Power Output</span>
                      <span className="text-emerald-400 font-mono">{Math.round(powerOutput)} MW</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(powerOutput / 1000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Quiz
        title="Nuclear Reactors Quiz"
        questions={[
          {
            id: 1,
            text: "What is the primary purpose of control rods in a nuclear reactor?",
            options: [
              "To provide the fissionable fuel for the reaction.",
              "To slow down neutrons so they can be captured more easily.",
              "To absorb neutrons and control the rate of the chain reaction.",
              "To cool the reactor core and prevent a meltdown."
            ],
            correctAnswer: 2,
            explanation: "Control rods are made of neutron-absorbing material. By raising or lowering them into the fuel bundle, operators can absorb excess neutrons and control or stop the fission chain reaction."
          },
          {
            id: 2,
            text: "Which isotope of uranium is fissionable and used as fuel in most nuclear reactors?",
            options: [
              "Uranium-234",
              "Uranium-235",
              "Uranium-238",
              "Uranium-239"
            ],
            correctAnswer: 1,
            explanation: "Uranium-235 is the naturally occurring isotope that is fissionable. It must be enriched from its natural 1% abundance to at least 3% for use in reactors."
          },
          {
            id: 3,
            text: "What is the function of a moderator in a Light Water Reactor (LWR)?",
            options: [
              "It speeds up neutrons to increase the reaction rate.",
              "It slows down neutrons so U-235 nuclei can capture them more efficiently.",
              "It absorbs radiation to protect the containment building.",
              "It converts U-238 into Plutonium-239."
            ],
            correctAnswer: 1,
            explanation: "U-235 nuclei capture slow-moving neutrons more efficiently than fast ones. The moderator (like water in an LWR) slows down the fast neutrons released during fission."
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
