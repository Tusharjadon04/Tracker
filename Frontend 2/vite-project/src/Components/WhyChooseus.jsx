// WhyChooseus.jsx
const WhyChooseus = () => {
  const features = [
    {
      title: 'Clear, simple tracking',
      desc: 'Log transport, energy, food and waste in seconds with an easy, guided flow.'
    },
    {
      title: 'Instant visual feedback',
      desc: 'See where most of your emissions come from with clean, minimal charts.'
    },
    {
      title: 'Built for everyday life',
      desc: 'No complex dashboards. Just the information you actually need every day.'
    },
    {
      title: 'Future‑ready design',
      desc: 'Modern, responsive UI that looks great on laptops, tablets and phones.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase">
            Why choose EcoTrack
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            A calm space to understand your carbon footprint.
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            EcoTrack is designed to feel light and friendly, so checking your impact becomes
            a habit—not a chore.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: text & bullets */}
          <div>
            <div className="space-y-4 mb-8">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-emerald-50/40 hover:border-emerald-200 transition-colors"
                >
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Everything stays in your browser using local storage, so you can experiment
              freely and focus on building better habits.
            </p>
          </div>

          {/* Right: simple image card */}
          <div className="relative h-80 md:h-96">
            <div className="absolute inset-0 rounded-3xl bg-emerald-100 blur-2xl" />
            <div className="relative h-full rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
              <img
                src="/whychooseus.jpg"  // put whychooseus.jpg in your public/ folder
                alt="People reviewing their sustainability progress"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseus;
