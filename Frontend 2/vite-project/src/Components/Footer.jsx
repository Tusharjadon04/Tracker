import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-emerald-950 text-emerald-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-semibold text-lg">EcoTrack</span>
            </div>
            <p className="text-sm text-emerald-200 mb-4">
              Track your footprint, transform your future. Join us in building a sustainable world.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-emerald-300 transition">Home</a></li>
              <li><a href="#services" className="hover:text-emerald-300 transition">Services</a></li>
              <li><a href="#about" className="hover:text-emerald-300 transition">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">About us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="hover:text-emerald-300 transition">Contact us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm mb-2">info@ecotrack.com</p>
            <p className="text-sm mb-2">+1234 (567) 890</p>
            <p className="text-sm">123 Green Street, Brooklyn, New York, 11201, United States</p>
          </div>
        </div>
        
        <div className="border-t border-emerald-800/30 pt-8 text-sm text-center text-emerald-300">
          <p>© 2025 EcoTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;