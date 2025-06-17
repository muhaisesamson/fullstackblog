import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Custom SplitText component
const SplitText = ({ children, className = "", delay = 0.05 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const text = typeof children === 'string' ? children : '';
  const characters = text.split('');

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}
          style={{
            transitionDelay: `${index * delay}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const FeatureCard = ({ icon, title, description, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      key={index}
      className={`transition-all duration-500 ease-in-out ${isExpanded ? 'md:col-span-2' : ''} ${
        isHovered ? 'shadow-xl border-purple-300' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div 
          className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 transition-all duration-500 ${
            isHovered || isExpanded 
              ? 'bg-gradient-to-br from-purple-900 to-purple-600 text-white scale-110' 
              : 'bg-purple-100 text-purple-700'
          }`}
        >
          {icon}
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-96' : 'max-h-20'
        }`}>
          <p className="text-gray-600 text-center">{description}</p>
          {isExpanded && (
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add functionality for "Learn More"
                }}
              >
                Learn More
              </Button>
            </div>
          )}
        </div>
        {!isExpanded && (
          <p className="text-center text-purple-600 text-sm mt-2"></p>
        )}
      </CardContent>
    </Card>
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

  // Images for the background slider
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
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
    <main>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center py-32 md:py-20 relative overflow-hidden bg-gradient-to-br from-purple-100 to-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-8 relative z-10">
          <div className="hero-content text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <SplitText delay={0.03}>
                Your Journey to Mental Wellness Starts Here
              </SplitText>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Discover personalized tools, expert guidance, and a supportive community to help you achieve lasting mental wellness and emotional balance.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center md:justify-start">
              <Button 
                onClick={() => scrollToSection('get-started')}
                className="bg-purple-900 hover:bg-purple-700 text-white py-6 px-8 text-lg"
              >
                Start Your Journey
              </Button>
              <Button 
                onClick={() => scrollToSection('features')}
                variant="outline"
                className="text-purple-900 border-purple-900 hover:bg-purple-900 hover:text-white py-6 px-8 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="hero-visual flex justify-center items-center">
            <Card className="w-full max-w-sm bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl border-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl p-16 text-white text-center">
              <CardContent className="p-0">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold">MindHub</h3>
                <p className="text-purple-100 mt-2">Mental Wellness App</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Interactive Wellness Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive features designed to support every aspect of your mental health journey.
            </p>
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

      {/* CTA Section with Background Image Slider */}
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
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Mental Wellness?</h2>
          <p className="text-xl text-white/90 mb-10">
            Join thousands of others who have already started their journey to better mental health with MindHub.
          </p>
          
          <Button 
            className="bg-white text-purple-900 font-bold py-6 px-10 text-lg hover:bg-gray-100"
            size="lg"
          >
            Join Us!
          </Button>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Get in Touch</h3>
            
            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-2">
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                📧
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Email</h4>
                <a href="mailto:support@mindhub.com" className="text-gray-600 transition-all duration-300 hover:text-purple-900">
                  support@mindhub.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-2">
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                📞
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Phone</h4>
                <a href="tel:+1234567890" className="text-gray-600 transition-all duration-300 hover:text-purple-900">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-2">
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:bg-purple-600 hover:scale-110">
                📍
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Address</h4>
                <p className="text-gray-600">
                  123 Wellness Street<br />
                  Mindful City, MC 12345
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-2">
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
            </div>
          </div>
          
          <Card className="p-10">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    type="text" 
                    id="name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    rows="5"
                    className="mt-2"
                  />
                </div>
                <Button 
                  className="w-full bg-purple-900 hover:bg-purple-700 py-6 text-lg"
                >
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Main;