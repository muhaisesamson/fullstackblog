"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '@/app/components/Layout';
import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image, index }) => {
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
          delay: index * 0.2,
          duration: 0.6
        }
      } : {}}
      className="w-full"
    >
      <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-6 left-6 right-6">
            <motion.h3 
              className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
              initial={{ y: 10, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="text-primary-foreground/90 font-medium text-lg drop-shadow-md"
              initial={{ y: 10, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              {role}
            </motion.p>
          </div>
        </div>
        <CardContent className="p-8 bg-gradient-to-b from-background to-muted/30">
          <motion.p 
            className="text-muted-foreground leading-relaxed text-base"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {bio}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface StoryCardProps {
  title: string;
  content: string;
  stats?: { value: string; label: string }[];
  index: number;
  image?: string;
  reversed?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ 
  title, 
  content, 
  stats, 
  index, 
  image,
  reversed = false 
}) => {
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
          duration: 0.8
        }
      } : {}}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-16 ${
        reversed ? 'lg:grid-flow-col-dense' : ''
      }`}
    >
      <div className={`space-y-6 ${reversed ? 'lg:col-start-2' : ''}`}>
        <motion.h2 
          className="text-4xl font-bold text-primary mb-6 leading-tight"
          initial={{ x: reversed ? 50 : -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ x: reversed ? 50 : -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        >
          {content}
        </motion.p>
        {stats && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="bg-gradient-to-br from-primary/15 to-primary/5 p-6 rounded-xl text-center border border-primary/10 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <motion.div 
        className={`relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl ${reversed ? 'lg:col-start-1' : ''}`}
        initial={{ x: reversed ? -50 : 50, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 90vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        <div className="absolute inset-0 bg-primary/5" />
      </motion.div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Samson Muhaise Isingoma",
      role: "Co-Founder & CTO",
      bio: "Technology enthusiast with a passion for creating solutions that make a difference. Samson leads our technical development with a focus on user experience and data security, bringing innovative approaches to mental wellness technology.",
      image: "/images/about/smason1.jpg"
    },
    {
      name: "Nansereko Housnah",
      role: "Co-Founder & CEO",
      bio: "Mental health advocate with a passion for creating solutions to everyday problems. I envisioned MindHub to bridge the gap between professional mental health services and everyday wellness, making mental health support accessible to everyone.",
      image: "/images/about/nh.jpg"
    }
  ];

  const storySections = [
    {
      title: "The Journey Begins",
      content: "In 2025, we recognized a critical gap in mental health support. Too many people were struggling in silence, lacking accessible tools to understand and improve their mental wellness. MindHub was born from a simple belief: everyone deserves personalized, compassionate mental health support that meets them where they are in their journey.",
      image: "/images/about/journey-begins.png"
    },
    {
      title: "Understanding the Challenge",
      content: "Our extensive research revealed startling statistics about mental health accessibility and the barriers people face. Traditional approaches weren't meeting people where they are in their daily lives. We discovered that people needed immediate, personalized insights into their mental wellness patterns - something that could seamlessly adapt to their unique circumstances and provide meaningful support.",
      stats: [
        { value: "25%", label: "People affected" },
        { value: "60%", label: "Don't seek help" },
        { value: "87%", label: "Want digital tools" }
      ],
      image: "/images/about/understanding-challenge.png"
    },
    {
      title: "Our Mission",
      content: "MindHub emerged as an intelligent mental wellness companion that combines evidence-based psychology with cutting-edge technology. We're committed to creating a world where mental health support is accessible, stigma-free, and seamlessly integrated into daily life. Our platform empowers individuals with personalized insights, practical tools, and compassionate guidance on their mental wellness journey.",
      reversed: true,
      image: "/images/about/our-misssion.png"
    }
  ];

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Layout>
      <main className="relative">
        {/* Enhanced Hero Section */}
        <section className="min-h-[70vh] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70 z-20"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-6y0"></div>
            {/* Animated background elements */}
            <div className="absolute inset-0 z-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-1xl animate-pulse delay-1000"></div>
            </div>
          </div>

          <div ref={heroRef} className="max-w-7xl mx-auto px-6 relative z-30 w-full text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our <span className="text-yellow-300">Story</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                How two passionate individuals came together to revolutionize mental wellness and create meaningful change in people&apos;s lives
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet the Founders</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The passionate minds behind MindHub&apos;s vision to transform mental wellness
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Story Section */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Journey</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From recognizing a need to building a solution that matters
              </p>
            </motion.div>

            {storySections.map((section, index) => (
              <StoryCard
                key={index}
                title={section.title}
                content={section.content}
                stats={section.stats}
                index={index}
                image={section.image}
                reversed={section.reversed}
              />
            ))}
          </div>
        </section>

        {/* New Call-to-Action Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Mental Wellness Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of users who have already transformed their mental wellness with MindHub
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;