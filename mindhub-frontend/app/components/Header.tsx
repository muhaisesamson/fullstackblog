import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 50);
      
      // Show/hide header based on scroll direction
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setVisible(false);
      } else if (currentScrollY < prevScrollY) {
        // Scrolling up - show header
        setVisible(true);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full bg-background/95 backdrop-blur-md z-50 py-4 px-6 transition-all duration-300 border-b ${
      scrolled ? 'shadow-lg bg-background/98' : 'shadow-sm'
    } ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-bold">MindHub</span>
        </div>
                
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-foreground hover:bg-transparent font-medium relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
                
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => scrollToSection('get-started')}
            className="hidden md:block"
          >
            Get Started
          </Button>
                    
          {/* Mobile menu button */}
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
            
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2 max-w-7xl mx-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => scrollToSection(item.id)}
              className="w-full justify-start px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent"
            >
              {item.label}
            </Button>
          ))}
          <Button 
            onClick={() => scrollToSection('get-started')}
            className="w-full mt-2"
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;