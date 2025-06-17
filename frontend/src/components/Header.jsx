import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] bg-white bg-opacity-98 backdrop-blur-md z-50 py-4 px-8 rounded-xl transition-all duration-300 shadow-md border border-opacity-5 ${
      scrolled ? 'top-2.5 shadow-lg' : ''
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🧠</span>
          <span className="text-2xl font-bold text-[#10002b]">MindHub</span>
        </div>
        
        <ul className="hidden md:flex gap-8">
          <li>
            <button 
              onClick={() => scrollToSection('home')}
              className="text-[#333] font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-0 after:bg-[#10002b] after:transition-all after:duration-300 hover:text-[#10002b] hover:after:w-full"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-[#333] font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-0 after:bg-[#10002b] after:transition-all after:duration-300 hover:text-[#10002b] hover:after:w-full"
            >
              Features
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-[#333] font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-0 after:bg-[#10002b] after:transition-all after:duration-300 hover:text-[#10002b] hover:after:w-full"
            >
              Testimonials
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-[#333] font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-0 after:bg-[#10002b] after:transition-all after:duration-300 hover:text-[#10002b] hover:after:w-full"
            >
              Contact
            </button>
          </li>
        </ul>
        
        <button 
          onClick={() => scrollToSection('get-started')}
          className="bg-[#10002b] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-[#5E35B1] hover:-translate-y-0.5 hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Header;