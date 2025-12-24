import { Zap, Users, TrendingUp } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Renewable Energy Solutions",
      description: "Monitor your energy consumption and discover renewable alternatives to reduce your carbon footprint. We provide insights into solar, wind, and other clean energy options, helping you transition to sustainable sources while saving costs in the long run."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Environmental Consulting",
      description: "Get expert guidance on sustainable practices tailored to your lifestyle or business needs. Our consulting services include waste reduction strategies, eco-friendly supply chain management, and personalized sustainability roadmaps to ensure measurable impact."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Carbon Management and Offsetting",
      description: "Track your emissions, set reduction goals, and invest in verified carbon offset programs. We help you identify key emission sources, provide actionable steps to minimize them, and connect you with trusted offset initiatives to balance your footprint."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
        <p className="text-gray-600 mb-12 max-w-3xl">
          We offer comprehensive solutions designed to help you measure, reduce, and offset your carbon footprint while building sustainable habits for the long term.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
