// Story.jsx
const Story = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative h-80 md:h-96">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-100 blur-2xl" />
            <div className="relative h-full rounded-3xl overflow-hidden shadow-xl border border-white">
              <img
                src="/story.jpg"  // put story.jpg inside your public/ folder
                alt="Person exploring their carbon footprint with EcoTrack"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase mb-3">
              Our story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Making climate action feel simple, not overwhelming.
            </h2>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              EcoTrack started with a small frustration: climate numbers were everywhere,
              but it was hard to see what they meant for one person’s daily life. Spreadsheets,
              calculators and long reports felt cold and difficult to use.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              So we designed a calmer space—one place where you can log a commute, a meal,
              or your home energy use and instantly see how it all adds up. No expert
              knowledge needed, just clear feedback and gentle guidance.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Today, EcoTrack is used by students, families and teams who want to turn
              “I should do better” into specific, realistic changes each week. One screen,
              one activity, one better choice at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
