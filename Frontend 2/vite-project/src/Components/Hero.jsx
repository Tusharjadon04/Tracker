import { Leaf, BarChart3 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold mb-5">
              <Leaf className="w-4 h-4" />
              <span>EcoTrack • Carbon Footprint Tracker</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Understand your
              <span className="block text-emerald-100">
                daily carbon footprint.
              </span>
            </h1>

            <p className="text-sm md:text-base text-emerald-50/90 mb-6 max-w-xl">
              Log transport, energy, food and waste in a few taps. See where most of your
              emissions come from and how small changes add up over time.
            </p>

            <div className="mb-6">
              <span className="text-xs text-emerald-50/80">
                No sign‑up required • Works directly in your browser
              </span>
            </div>

            <div className="flex gap-6 text-xs text-emerald-50/80">
              <div>
                <p className="font-semibold text-white">4</p>
                <p>Activity categories</p>
              </div>
              <div>
                <p className="font-semibold text-white">Real‑time</p>
                <p>Emission estimates</p>
              </div>
              <div>
                <p className="font-semibold text-white">Local</p>
                <p>Saved in your browser</p>
              </div>
            </div>
          </div>

          
          <div className="hidden md:block">
            <div className="relative max-w-md ml-auto">
              <div className="absolute -inset-4 bg-emerald-300/40 blur-3xl" />
              <div className="relative bg-white text-slate-900 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      Today’s emissions
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    Sample view
                  </span>
                </div>

                <p className="text-3xl font-bold text-slate-900 mb-1">
                  12.4 <span className="text-base text-emerald-600">kg CO₂</span>
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Transport, energy, food and waste combined.
                </p>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-lg font-semibold text-slate-900 mb-1">🚗</p>
                    <p className="font-medium text-slate-800">Transport</p>
                    <p className="text-slate-500">6.8 kg</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-lg font-semibold text-slate-900 mb-1">⚡</p>
                    <p className="font-medium text-slate-800">Energy</p>
                    <p className="text-slate-500">3.1 kg</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-lg font-semibold text-slate-900 mb-1">🍽️</p>
                    <p className="font-medium text-slate-800">Food</p>
                    <p className="text-slate-500">2.5 kg</p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-slate-500">
                  Open the tracker page to replace this sample data with your own real activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
