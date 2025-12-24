import { Users, Target, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About EcoTrack</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make sustainability accessible to everyone through technology and data-driven insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Empowering individuals to make informed environmental choices through accurate carbon tracking.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Team</h3>
            <p className="text-gray-600">
              A diverse group of environmentalists, developers, and designers working towards a common goal.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Impact</h3>
            <p className="text-gray-600">
              Helping thousands reduce their carbon footprint by an average of 25% in the first year.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white p-12 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              EcoTrack was founded in 2023 by a group of environmental scientists and software engineers who shared a common concern: the lack of accessible tools for individuals to understand and reduce their carbon footprint.
            </p>
            <p>
              We recognized that while many people wanted to make more sustainable choices, they lacked the data and insights needed to understand their environmental impact. That's when we decided to build EcoTrack.
            </p>
            <p>
              Today, EcoTrack serves thousands of users worldwide, helping them track their daily activities, understand their carbon emissions, and make informed decisions for a more sustainable future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;