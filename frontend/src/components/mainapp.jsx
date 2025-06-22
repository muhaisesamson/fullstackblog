import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced SplitText component with smoother animations
const SplitText = ({ children, className = "", delay = 0.03, wordDelay = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const text = typeof children === 'string' ? children : '';
  
  // Split by words first, then characters for better animation
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

// Enhanced FeatureCard with better animations and interactions
const FeatureCard = ({ icon, title, description, index }) => {
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
        className={`h-full transition-all duration-300 ease-in-out ${isExpanded ? 'md:col-span-2' : ''} ${
          isHovered ? 'shadow-xl border-purple-300' : 'shadow-md'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader>
          <motion.div 
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 ${
              isHovered || isExpanded 
                ? 'bg-gradient-to-br from-purple-900 to-purple-600 text-white' 
                : 'bg-purple-100 text-purple-700'
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
          <CardTitle className="text-center font-bold text-lg md:text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-96' : 'max-h-20'
          }`}>
            <p className="text-gray-600 text-center">{description}</p>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                <Button 
                  variant="outline" 
                  className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More
                </Button>
              </motion.div>
            )}
          </div>
          {!isExpanded && (
            <p className="text-center text-purple-600 text-sm mt-2 cursor-pointer">Click to expand</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Floating Action Button component
const FloatingActionButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
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
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-purple-700 text-white shadow-lg flex items-center justify-center hover:bg-purple-600 transition-all"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Main = () => {
  const features = [
    {
      icon: "🧘",
      title: "Mindfulness Exercises",
      description: "Guided meditation sessions tailored to your experience level and personal goals for daily practice. Our library includes hundreds of sessions ranging from 3-minute quick resets to 30-minute deep meditations. Track your progress and see how regular practice improves your mental clarity and stress levels."
    },
    {
      icon: "📊",
      title: "Mood Analytics",
      description: "Track your emotional patterns and gain insights into your mental health with intelligent analytics. Our system identifies trends and triggers, providing personalized recommendations. Visualize your mood history with easy-to-understand charts and receive weekly reports highlighting your progress."
    },
    {
      icon: "💬",
      title: "Therapist Connect",
      description: "Connect with licensed professionals for guidance when you need it most, right from the app. Our matching algorithm helps you find the perfect therapist based on your needs and preferences. Schedule video sessions, message between appointments, and share your mood tracking data securely."
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description: "Set and achieve meaningful wellness goals with our structured approach and progress tracking. Break down big objectives into manageable steps and celebrate milestones. Receive daily reminders and motivational tips to keep you on track toward your mental wellness aspirations."
    },
    {
      icon: "🤝",
      title: "Support Community",
      description: "Join a caring community of individuals on similar wellness journeys for mutual support. Participate in anonymous discussion forums, join themed support groups, or connect one-on-one with peers. Our moderated spaces ensure a safe, judgment-free environment for sharing and healing."
    },
    {
      icon: "📚",
      title: "Learning Resources",
      description: "Access a comprehensive library of articles and tools to deepen your mental wellness knowledge. Curated by mental health professionals, our resources cover topics from anxiety management to building resilience. Enjoy interactive courses, worksheets, and expert Q&A sessions updated weekly."
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
    },
    {
      url: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Peaceful morning meditation"
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setActiveImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(imageInterval);
    };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(Object.fromEntries(formData));
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    formRef.current.reset();
  };

  return (
    <main className="relative overflow-hidden">
      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Hero Section - Full Page */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495837174058-628aafc7d610?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-8 relative z-10 w-full">
          <div className="hero-content text-center md:text-left">
            {/* Replace this div with your logo */}
            <div className="mb-12">
              <img 
                src="/your-logo.png" 
                alt="Your Logo" 
                className="h-16 w-auto mx-auto md:mx-0"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <SplitText delay={0.03} wordDelay={0.1}>
                Your Journey to Mental Wellness Starts Here
              </SplitText>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg mx-auto md:mx-0">
              Discover personalized tools, expert guidance, and a supportive community to help you achieve lasting mental wellness and emotional balance.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center md:justify-start">
              <Button 
                onClick={() => scrollToSection('get-started')}
                className="bg-white text-purple-900 hover:bg-gray-100 py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all font-bold"
              >
                Start Your Journey
              </Button>
              <Button 
                onClick={() => scrollToSection('features')}
                variant="outline"
                className="text-white border-white hover:bg-white/10 py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="hero-visual flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Card className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10"></div>
                <CardContent className="p-0 relative z-10">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🧠
                  </motion.div>
                  <h3 className="text-2xl font-bold">MindHub</h3>
                  <p className="text-white/80 mt-2">Mental Wellness App</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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
          <button 
            onClick={() => scrollToSection('features')}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
            aria-label="Scroll down"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <SplitText delay={0.02}>
                Interactive Wellness Tools
              </SplitText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive features designed to support every aspect of your mental health journey.
            </p>
          </div>
          
          {/* Feature categories filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Mindfulness', 'Tracking', 'Community', 'Resources'].map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full px-6 border-purple-300 text-purple-700 hover:bg-purple-100 hover:border-purple-400 transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Stats Section */}
     {/* <section className="py-16 bg-purple-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500+", label: "Meditation Sessions" },
              { value: "50+", label: "Expert Therapists" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-4xl font-bold text-purple-900 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section id="get-started" className="py-32 text-center relative overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image Slider */}
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-purple-700/60"></div>
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Mental Wellness?
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/90 mb-10 min-h-[60px]"
          >
            Join thousands of users who have improved their mental health with our comprehensive tools and resources.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              className="bg-white text-purple-900 font-bold py-6 px-10 text-lg hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
              size="lg"
            >
              Get in Touch with Us!
            </Button>
          </motion.div>
          
          <div className="mt-8 text-white/80">
            <p></p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Get in Touch</h3>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                📧
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Email</h4>
                <a href="mailto:mindhubHS@gmail.com" className="text-gray-600 transition-all duration-300 hover:text-purple-900">
                  mindhubHS@gmail.com
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                📞
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Phone</h4>
                <a href="tel:+1234567890" className="text-gray-600 transition-all duration-300 hover:text-purple-900">
                  +256 763634264

                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                📍
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Address</h4>
                <p className="text-gray-600">
                  Makerere University<br />
                  
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                🕒
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Hours</h4>
                <p className="text-gray-600">
                  Monday - Friday: 9am - 6pm<br />
                  Saturday: 10am - 4pm
                </p>
              </div>
            </motion.div>
            
            <div className="mt-4">
              <h4 className="text-lg text-gray-800 font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-all"
                    aria-label={social}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={`M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z`} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-900">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      type="text" 
                      id="name"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="email" 
                      id="email"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      type="text" 
                      id="subject"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      rows="5"
                      className="mt-2"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-purple-900 hover:bg-purple-700 py-6 text-lg shadow-md hover:shadow-lg transition-all"
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

export default Main;