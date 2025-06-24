import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl bg-background/80 backdrop-blur-md z-50 py-3 px-6 rounded-xl transition-all duration-300 shadow-sm border ${scrolled ? 'top-2 shadow-md' : ''}`}>
      <div className="flex justify-between items-center">
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
        <div className="md:hidden mt-4 pb-4 space-y-2">
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