import { useState } from 'react';
import TrackerPage from './Pages/TrackerPage';
import HomePage from './Pages/Homepage';
import ContactPage from './Pages/ContactPage';
import ServicesPage from './Pages/Services';
import AboutPage from './Pages/AboutPage';
import RegistrationModal from './components/RegisterationModal';
import Header from './components/Header';
import FAQPage from "./Components/FAQ"
import Footer from './components/Footer';
import LoginModal from './Components/LoginModal'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './authcontext';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 



  
   const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    setIsLoggedIn(false);
  };
  

  return (
    <Router>
      <div className="min-h-screen bg-teal-800">
       <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setIsLoginOpen(true)}
          onRegisterClick={() => setIsRegistrationOpen(true)}
          onLogoutClick={handleLogout}
        />
        
        <Routes>

          {/* Home Page */}
          <Route path="/" element={<HomePage />}/>
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />

        </Routes>
        <Footer />
        <RegistrationModal
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
        />
          <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

      </div>
    </Router>
  );
}

export default App;
