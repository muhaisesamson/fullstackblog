"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link'
import Layout from './components/Layout';

interface SplitTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = "", 
  delay = 0.03, 
  wordDelay = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <span className={`${className} inline-block`}>
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`char-${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: wordIndex * wordDelay + charIndex * delay,
                  type: 'spring',
                  damping: 12,
                  stiffness: 100
                }
              } : {}}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  index 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.6
        }
      } : {}}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card 
        className={`h-full transition-all duration-300 ease-in-out cursor-pointer ${
          isExpanded ? 'md:col-span-2' : ''
        } ${
          isHovered ? 'shadow-lg border-primary' : 'shadow-sm'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader>
          <motion.div 
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 ${
              isHovered || isExpanded 
                ? 'bg-gradient-to-br from-primary to-primary/90 text-white' 
                : 'bg-primary/10 text-primary'
            }`}
            animate={{
              scale: isHovered || isExpanded ? 1.1 : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 0.6 }
            }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-96' : 'max-h-20'
          }`}>
            <p className="text-muted-foreground text-center">{description}</p>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center"
              >
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More
                </Button>
              </motion.div>
            )}
          </div>
          {!isExpanded && (
            <p className="text-center text-primary text-sm mt-2 cursor-pointer">Click to expand</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FloatingActionButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const MainContent: React.FC = () => {
  const features = [
    {
      icon: "🧘",
      title: "Mindfulness Exercises",
      description: "Guided meditation sessions tailored to your experience level and personal goals for daily practice."
    },
    {
      icon: "📊",
      title: "Mood Analytics",
      description: "Track your emotional patterns and gain insights into your mental health with intelligent analytics."
    },
    {
      icon: "💬",
      title: "Therapist Connect",
      description: "Connect with licensed professionals for guidance when you need it most, right from the app."
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description: "Set and achieve meaningful wellness goals with our structured approach and progress tracking."
    },
    {
      icon: "🤝",
      title: "Support Community",
      description: "Join a caring community of individuals on similar wellness journeys for mutual support."
    },
    {
      icon: "📚",
      title: "Learning Resources",
      description: "Access a comprehensive library of articles and tools to deepen your mental wellness knowledge."
    }
  ];

  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1491895200226-467f4c4f2cc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Person meditating in nature"
    },
    {
      url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Happy woman practicing mindfulness"
    },
    {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Group yoga session"
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setActiveImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [backgroundImages.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative overflow-hidden">
      <FloatingActionButton />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-primary to-primary/90">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495837174058-628aafc7d610?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6 relative z-10 w-full">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <SplitText delay={0.03} wordDelay={0.1}>
                Your Journey to Mental Wellness Starts Here
              </SplitText>
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-lg mx-auto md:mx-0">
              Discover personalized tools, expert guidance, and a supportive community to help you achieve lasting mental wellness.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center md:justify-start">
              <Button 
                onClick={() => scrollToSection('get-started')}
                className="bg-background text-primary hover:bg-background/90 py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all font-bold"
              >
                <Link href="/comingsoon">Start Your Journey</Link>
              </Button>
              <Button 
                onClick={() => scrollToSection('features')}
                variant="outline"
                className="text-background border-background hover:bg-background/10 py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/comingsoon">Learn More</Link>
              </Button>
            </div>
          </div>
          
         <div className="flex justify-center items-center">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className="text-center group cursor-pointer"
    whileHover={{ scale: 1.02 }}
  >
    {/* Interactive Brain Emoji */}
    <motion.div 
      className="text-7xl mb-6 relative inline-block"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{
        rotate: [0, 15, -15, 0],
        scale: 1.1,
        transition: { duration: 0.6 }
      }}
      whileTap={{ scale: 0.9 }}
    >
      🧠
      {/* Subtle glow effect on hover */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 bg-white blur-md"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>

    {/* Animated Title */}
    <motion.h3 
      className="text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2"
      whileHover={{
        backgroundPosition: '100% 50%',
        transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
      }}
      style={{
        backgroundSize: '200% auto'
      }}
    >
      MindHub
    </motion.h3>

    {/* Static Tagline */}
    <p className="text-lg text-white/80 tracking-wider mb-6">
      Transforming Mental Wellness
    </p>

    {/* Interactive particles on hover */}
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      whileHover={{
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30"
          initial={{ 
            x: 0,
            y: 0,
            width: 4,
            height: 4,
            opacity: 0
          }}
          whileHover={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 0],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1
            }
          }}
          style={{
            left: '50%',
            top: '30%'
          }}
        />
      ))}
    </motion.div>

    {/* Decorative animated lines */}
    <motion.div 
      className="flex justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      whileHover={{
        gap: [8, 16, 8],
        transition: { duration: 1, repeat: Infinity }
      }}
    >
      <motion.div 
        className="w-16 h-1 bg-white/50"
        whileHover={{
          width: [64, 80, 64],
          backgroundColor: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.5)'],
          transition: { duration: 1, repeat: Infinity }
        }}
      />
      <motion.div 
        className="w-16 h-1 bg-white"
        whileHover={{
          width: [64, 80, 64],
          backgroundColor: ['rgba(255,255,255,1)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)'],
          transition: { duration: 1, repeat: Infinity, delay: 0.2 }
        }}
      />
      <motion.div 
        className="w-16 h-1 bg-white/50"
        whileHover={{
          width: [64, 80, 64],
          backgroundColor: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)'],
          transition: { duration: 1, repeat: Infinity, delay: 0.4 }
        }}
      />
    </motion.div>
  </motion.div>
</div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection('features')}
            className="p-2 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 hover:bg-background/30 transition-all"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              <SplitText delay={0.02}>
                Interactive Wellness Tools
              </SplitText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive features designed to support every aspect of your mental health journey.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Mindfulness', 'Tracking', 'Community', 'Resources'].map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full px-6 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-28 text-center relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === activeImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/70"></div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to start your wellness journey?
          </motion.h2>
          
          <motion.p
            className="text-lg text-white/90 mb-10 min-h-[60px]"
          >
            Join thousands of users who have transformed their mental health with MindHub.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button asChild
              className="bg-background text-primary font-bold py-6 px-10 text-lg hover:bg-background/90 shadow-xl hover:shadow-2xl transition-all"
              size="lg"
            >
              <Link href="/comingsoon">Get Started Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary mb-4">Get in Touch</h3>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/90 hover:scale-110">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Email</h4>
                <a href="mailto:mindhubHS@gmail.com" className="text-muted-foreground transition-all duration-300 hover:text-primary">
                  mindhubHS@gmail.com
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/90 hover:scale-110">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Phone</h4>
                <a href="tel:+256763634264" className="text-muted-foreground transition-all duration-300 hover:text-primary">
                  +256 763634264
                  <br />
                  +256 783833540
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/90 hover:scale-110">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Address</h4>
                <p className="text-muted-foreground">
                  Makerere University
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/90 hover:scale-110">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Hours</h4>
                <p className="text-muted-foreground">
                  Monday - Friday: 9am - 6pm<br />
                  Saturday: 10am - 4pm
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} 
                action="https://formspree.io/f/movwrdga"
                method="POST"
                className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      type="text" 
                      id="name"
                      name="name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="email" 
                      id="email"
                      name="email"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      type="text" 
                      id="subject"
                      name="subject"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={5}
                      className="mt-1"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full mt-4 py-6 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const Main: React.FC = () => {
  return (
    <Layout>
      <MainContent />
    </Layout>
  );
};

export default Main;