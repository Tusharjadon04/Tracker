import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How is my carbon footprint calculated?",
      answer: "We use industry-standard methodologies and emission factors to calculate your carbon footprint based on your daily activities including transportation, energy consumption, food choices, and waste production."
    },
    {
      question: "What activities should I track to reduce my footprint?",
      answer: "Focus on tracking your transportation methods, energy usage at home, dietary choices, and consumption habits. These are typically the largest contributors to individual carbon footprints."
    },
    {
      question: "Can my household members create a single family account to track our carbon footprint?",
      answer: "Yes! Our family plan allows multiple household members to track their activities under one account, giving you a comprehensive view of your household's collective environmental impact."
    },
    {
      question: "Do you have partnerships directly with the organizations you support?",
      answer: "We partner with verified carbon offset programs and environmental organizations to ensure your contributions make a real impact. All our partners are vetted for legitimacy and effectiveness."
    },
    {
      question: "How will the carbon footprint data influence my daily environmental actions?",
      answer: "By visualizing your impact through graphs and insights, you'll identify your biggest emission sources and receive personalized recommendations to reduce your footprint effectively."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-center mb-12">
          Everything you need to know about tracking your carbon footprint and making sustainable choices.
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-900 text-left">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;