import { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Leaf, 
  Globe, 
  ChevronRight, 
  BarChart3, 
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Story from '../components/Story';
import WhyChooseUs from '../components/WhyChooseus';
import CTA from '../components/CTA';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tracker');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
     
      <Hero />
      
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Launch in 30 seconds • No signup required
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 bg-clip-text text-transparent mb-6 leading-tight">
              Track Your
              <span className="block text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text">Carbon Footprint</span>
              <span className="text-3xl md:text-4xl font-normal text-gray-600 block">Live • Accurate • Beautiful</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Log transport, energy, food & waste. See instant charts, date filters & trends. 
              Turn data into climate action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={() => navigate('/tracker')}
                className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <span className="flex items-center gap-3">
                  🚀 Launch Tracker
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 blur scale-0 group-hover:scale-100 transition-all duration-500" />
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-5 rounded-3xl border-2 border-emerald-200/50 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold hover:bg-white hover:shadow-xl transition-all">
                <Play className="w-5 h-5" />
                Watch Demo (30s)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {[
              {
                title: "Today's Emissions",
                value: "24.7 kg",
                subtitle: "vs 28.2kg yesterday",
                trend: "-12%",
                icon: Calendar,
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Top Category",
                value: "Transport 62%",
                subtitle: "12.3kg this week",
                trend: "+8%",
                icon: BarChart3,
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Activities Logged",
                value: "47 total",
                subtitle: "12 this week",
                trend: "+47%",
                icon: TrendingUp,
                color: "from-purple-500 to-pink-500"
              }
            ].map((card, idx) => (
              <div key={idx} className="group bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 hover:bg-white">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    card.trend.startsWith('-') 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {card.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.value}</h3>
                <p className="text-gray-600 font-medium mb-1">{card.title}</p>
                <p className="text-sm text-gray-500">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent mb-4">
              Everything You Need to Track & Reduce
            </h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">Simple input → Powerful insights</p>
          </div>

          <div className="flex justify-center mb-12">
            {['tracker', 'insights', 'impact'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 mx-1 rounded-2xl font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                    : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {tab === 'tracker' && '📊 Tracker'}
                {tab === 'insights' && '📈 Insights'}
                {tab === 'impact' && '🌍 Impact'}
              </button>
            ))}
          </div>

          
          <div className="grid lg:grid-cols-3 gap-8">
        
            <div className={`${activeTab !== 'tracker' ? 'opacity-50' : ''}`}>
              <div className="text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Activity Tracker</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-500" /> 4 categories: Transport, Energy, Food, Waste</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-500" /> Auto-calculates CO₂ using verified factors</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-500" /> Edit, delete, date filter instantly</li>
                </ul>
              </div>
            </div>

            
            <div className={`${activeTab !== 'insights' ? 'opacity-50' : ''}`}>
              <div className="text-center">
                <div className="w-24 h-24 bg-teal-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Beautiful Visualizations</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-teal-500" /> Category pie charts & bar graphs</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-teal-500" /> Click dates to drill down daily data</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-teal-500" /> Monthly trends & improvement tracking</li>
                </ul>
              </div>
            </div>

        
            <div className={`${activeTab !== 'impact' ? 'opacity-50' : ''}`}>
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Climate Impact</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-purple-500" /> Trees saved equivalents</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-purple-500" /> Compare vs average person</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-purple-500" /> Weekly improvement goals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-24">
        <Story />
        <WhyChooseUs />
        <CTA />
      </div>
    </div>
  );
};

export default HomePage;
