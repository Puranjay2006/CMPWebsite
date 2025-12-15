
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../contexts/CursorContext';
import Magnetic from './Magnetic';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

// Helper component for interactive elements
const Interactive: React.FC<{children: React.ReactElement<any>, variant?: 'link' | 'text'}> = ({ children, variant = 'link' }) => {
  const { setCursorVariant } = useCursor();
  return React.cloneElement(children, {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant('default'),
  });
};

interface HomePageProps {
    onNavigate: (page: string, hash?: string) => void;
}

// ----------------------------------------------------------------------
// Sub-components for sections
// ----------------------------------------------------------------------

const Hero: React.FC<{onNavigate: HomePageProps['onNavigate']}> = ({ onNavigate }) => {
  const allLogos = [...assets.clients.logos, ...assets.clients.logos];

  // 1. Create Refs for the elements we want to Parallax
  const heroRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  // 2. Add Layout Effect specifically for Hero Parallax
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        
        // Common scroll trigger settings
        const scrollConfig = {
            trigger: heroRef.current,
            start: "top top",      // Start when Hero top meets screen top
            end: "bottom top",     // End when Hero bottom leaves screen top
            scrub: true,           // Link animation to scrollbar
            ease: "none"
        };

        // A. Marquee Parallax (Moves slowly)
        gsap.to(marqueeRef.current, {
            y: 200, // Moves down slightly, feels heavy/anchored
            scrollTrigger: scrollConfig
        });

        // B. Main Text Parallax (Moves faster = feels closer)
        gsap.to(textRef.current, {
            y: 200, // Moves down faster than marquee
            scrollTrigger: scrollConfig
        });

        // C. Rating Section (Moves fastest = feels closest)
        gsap.to(ratingRef.current, {
            y: 5, 
            scrollTrigger: scrollConfig
        });

        // D. Spline Element (Moves slowly = feels far away/background)
        gsap.to(splineRef.current, {
            y: 200, // Moves slower than text, creating depth between text and 3D model
            scrollTrigger: scrollConfig
        });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    // Attached heroRef here
    <section ref={heroRef} id="home" className="relative flex flex-col justify-start pt-28 pb-12 overflow-hidden min-h-screen lg:min-h-[100dvh]">
      <div className="parallax-bg absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" data-speed="0.5"></div>
      <div className="parallax-bg absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" style={{animationDelay: '2s'}} data-speed="0.3"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/20 via-transparent to-transparent z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col">
        
        {/* Trusted By Section (Marquee) - Attached marqueeRef */}
        <div ref={marqueeRef} className="w-full pointer-events-auto hero-stagger z-30 mb-6 mt-4 lg:mt-2 relative group">
            <div className="relative w-full mx-auto">
                <div className="rounded-2xl p-[1px] bg-gradient-to-r from-primary/50 via-purple-500/50 to-secondary/50 shadow-2xl">
                    <div className="relative w-full overflow-hidden rounded-[calc(1rem-1px)] py-8 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-md">
                        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-dark-bg/50 to-transparent pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-dark-bg/50 to-transparent pointer-events-none"></div>
                        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center group/track">
                            {allLogos.map((logo, index) => (
                                <div key={index} className="mx-4 sm:mx-6 transition-all duration-500 group-hover/track:opacity-30 group-hover/track:grayscale group-hover/track:blur-[2px] hover:!opacity-100 hover:!filter-none hover:!blur-0 hover:z-30">
                                    <Magnetic>
                                        <Interactive>
                                            <a href={logo.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-32 h-20 sm:w-40 sm:h-24 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] hover:border-secondary hover:scale-[1.35] transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) relative overflow-hidden group/card p-4 ring-0 hover:ring-2 hover:ring-secondary/50">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                                                   <img src={`${assets.clients.basePath}${logo.file}`} className="max-h-full max-w-full w-auto object-contain rounded-lg filter group-hover/card:scale-110 transition-transform duration-500" alt={`Client logo ${index + 1}`} />
                                            </a>
                                        </Interactive>
                                    </Magnetic>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-7 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover:translate-y-0 pointer-events-none">
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">Trusted by NZ Businesses</span>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 lg:-mt-52 items-center pointer-events-none">
            
            {/* Text Content - Attached textRef */}
            <div ref={textRef} className="text-center lg:text-left z-20 pointer-events-auto flex flex-col justify-center relative">
                <div className="hero-stagger inline-flex items-center justify-center lg:justify-start mb-4">
                   <div className="px-4 py-1.5 rounded-full border border-secondary/50 bg-secondary/10 backdrop-blur-sm pointer-events-auto">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse inline-block"></span>
                      <span className="text-xs font-bold tracking-widest text-secondary uppercase">New Zealand's Trusted Business Partner</span>
                   </div>
                </div>
                <h1 className="hero-stagger text-4xl sm:text-5xl lg:text-7xl font-bold mb-5 leading-[1.1] tracking-tight text-light-text drop-shadow-2xl pointer-events-auto">
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Businesses</span>,
                  <br />Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-cyan-300 to-primary">Success</span>
                </h1>
                <div className="pointer-events-auto max-w-xl mx-auto lg:mx-0">
                  <Interactive variant="text">
                      <p className="hero-stagger text-base sm:text-lg text-muted-text mb-8 leading-relaxed font-light drop-shadow-lg">
                          We help startups, SMEs, and enterprises succeed in New Zealand with tailored business advisory, innovative marketing solutions, and cost-effective strategies.
                      </p>
                  </Interactive>
                </div>
                <div className="hero-stagger flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pointer-events-auto w-full sm:w-auto mb-10">
                  <Magnetic>
                      <Interactive>
                          <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base lg:text-lg rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                              Start Your Business <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                          </a>
                      </Interactive>
                  </Magnetic>
                   <Magnetic>
                      <Interactive>
                          <a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('home', 'services'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold text-base lg:text-lg rounded-xl shadow-xl shadow-secondary/25 hover:shadow-secondary/40 transition-all duration-300 backdrop-blur-md flex items-center">
                              Explore Services
                          </a>
                      </Interactive>
                  </Magnetic>
                </div>

                {/* 5-Star Rating Section - Attached ratingRef */}
                <div ref={ratingRef} className="hero-stagger pointer-events-auto flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full border-2 border-dark-bg bg-white flex items-center justify-center overflow-hidden"><img src={assets.clients.basePath + "Harcourts_Co_Logo.png"} className="w-full h-full object-contain p-1" alt="Harcourts" /></div>
                        <div className="w-10 h-10 rounded-full border-2 border-dark-bg bg-white flex items-center justify-center overflow-hidden"><img src={assets.clients.basePath + "Amos_Detailing_Ltd_Logo.png"} className="w-full h-full object-contain p-1" alt="Amos Detailing Ltd" /></div>
                        <div className="w-10 h-10 rounded-full border-2 border-dark-bg bg-white flex items-center justify-center overflow-hidden"><img src={assets.clients.basePath + "Fivestar_Automotive_Logo.png"} className="w-full h-full object-contain p-1" alt="Fivestar" /></div>
                        <div className="w-10 h-10 rounded-full border-2 border-dark-bg bg-gray-800 flex items-center justify-center text-xs font-bold text-white">+50</div>
                    </div>
                    <div className="flex flex-col text-center sm:text-left">
                         <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-400 text-sm">
                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Rated 5.0 by industry leaders</p>
                    </div>
                </div>
            </div>

            {/* Spline Element - Attached splineRef */}
            <div ref={splineRef} className="hidden lg:block w-full h-[600px] lg:h-[800px] relative pointer-events-auto z-10 hero-stagger">
                 <div className="absolute inset-0 w-full h-full">
                     <div className="absolute w-[140%] h-[140%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-mt-20">
                         {/* @ts-ignore */}
                         <spline-viewer url="https://prod.spline.design/O4luuHSWUL9kVJMQ/scene.splinecode"></spline-viewer>
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC<{onNavigate: HomePageProps['onNavigate']}> = ({ onNavigate }) => {
    return (
        <section id="about" className="relative py-12 lg:py-24 border-t border-glass-border">
            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-10 order-2 lg:order-1">
                        <div>
                            <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                                <span className="text-sm font-bold tracking-widest text-secondary uppercase">Who We Are</span>
                            </div>
                            <h2 className="reveal-text text-3xl sm:text-4xl sm:text-5xl font-bold text-light-text leading-tight">We turn ambition into <span className="text-secondary italic">lasting momentum</span></h2>
                        </div>
                         <Interactive variant="text">
                            <div className="reveal-text space-y-6 text-base sm:text-lg text-muted-text font-light leading-relaxed">
                                <p>
                                    Founded in Aotearoa, Capital Media Partners blends business advisory, marketing, and technology into one partnership. 
                                </p>
                                <p>
                                    We guide founders, SMEs, and enterprise teams through critical decisions—from incorporation and compliance to building brands people remember.
                                </p>
                            </div>
                        </Interactive>
                         <div className="reveal-text pt-4">
                             <Magnetic>
                                <Interactive>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="inline-flex items-center gap-3 text-secondary font-semibold hover:text-light-text transition-colors group">
                                            <span className="border-b border-secondary group-hover:border-light-text transition-colors pb-0.5">Learn More About Us</span>
                                            <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                </Interactive>
                            </Magnetic>
                        </div>
                    </div>
                    {/* Image with Persistent 3D Effect */}
                    <div className="relative order-1 lg:order-2 h-[250px] sm:h-[350px] lg:h-[420px] w-full reveal-card perspective-1000 group p-2 sm:p-0">
                       <div className="w-full h-full rounded-3xl overflow-hidden border border-glass-border transform transition-all duration-700 ease-out rotate-y-6 rotate-x-6 scale-95 hover:rotate-y-0 hover:rotate-x-0 hover:scale-100 shadow-2xl hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)]">
                           <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                           <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                           <img src={assets.hero.about} alt="About Capital Media Partners" className="w-full h-full object-cover filter brightness-90 contrast-110" />
                       </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const HowWeWork: React.FC = () => {
  const steps = [
    { icon: 'fa-search', title: 'Discovery Workshops', description: 'Clarify objectives, regulatory needs, and customer insights with our advisory team.' },
    { icon: 'fa-map-marked-alt', title: 'Integrated Roadmaps', description: 'Build one plan that connects finance, marketing, technology, and risk milestones.' },
    { icon: 'fa-rocket', title: 'Embedded Delivery', description: 'Activate the right specialists when you need them and iterate with transparent reporting.' },
  ];
  return (
    <section className="py-12 lg:py-24 relative border-t border-glass-border">
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
            <span className="text-sm font-bold tracking-widest text-secondary uppercase">Our Process</span>
          </div>
          <h2 className="reveal-text text-3xl sm:text-4xl sm:text-5xl font-bold text-light-text leading-tight mb-6">How We Work</h2>
          <Interactive variant="text">
            <p className="reveal-text text-lg sm:text-xl text-muted-text leading-relaxed max-w-2xl mx-auto">Our proven three-step process ensures your success from discovery to delivery.</p>
          </Interactive>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mx-auto perspective-1000">
          {steps.map((step, index) => (
            <div key={index} className="reveal-card group relative bg-white/5 border border-glass-border p-6 sm:p-10 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-secondary/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 font-bold text-6xl text-light-text font-outfit pointer-events-none group-hover:opacity-20 transition-opacity">
                  0{index + 1}
              </div>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-primary/30 transform group-hover:rotate-6 transition-transform duration-300">
                  <i className={`fas ${step.icon}`}></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-light-text mb-4 group-hover:text-secondary transition-colors">{step.title}</h3>
              <Interactive variant="text">
                <p className="text-muted-text leading-relaxed group-hover:text-light-text transition-colors">{step.description}</p>
              </Interactive>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services: React.FC<{onNavigate: HomePageProps['onNavigate']}> = ({ onNavigate }) => {
    const serviceList = [
        {
            icon: 'fa-business-time',
            title: 'Business & Startup Advisory',
            description: 'Simplify incorporation, compliance, and strategic planning with experts who understand New Zealand regulation.',
            page: 'service-business'
        },
        {
            icon: 'fa-print',
            title: 'Marketing & Print Media',
            description: 'Create campaigns that resonate nationwide with authentic storytelling, data-backed placements, and measurable ROI.',
            page: 'service-marketing'
        },
        {
            icon: 'fa-microchip',
            title: 'Technology & AI Solutions',
            description: 'Deploy AkoDesk AI and bespoke automations to streamline customer engagement, workflows, and decision-making.',
            page: 'service-tech'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Insurance Advisory',
            description: 'Secure the right level of protection for your people and assets without compromising on cost or coverage.',
            page: 'service-insurance'
        }
    ];

    return (
        <section id="services" className="relative py-12 lg:py-24 border-t border-glass-border">
            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                                    <span className="text-sm font-bold tracking-widest text-secondary uppercase">What We Do</span>
                                </div>
                                <h2 className="reveal-text text-3xl sm:text-4xl sm:text-5xl font-bold text-light-text leading-tight mt-4">Tailored services for <span className="text-primary">every stage</span></h2>
                            </div>
                            <Interactive variant="text">
                                <p className="reveal-text text-base sm:text-lg text-muted-text leading-relaxed">
                                    Whether you're launching, scaling, or modernising, we assemble specialists across advisory, marketing, technology, and risk to move your business forward.
                                </p>
                            </Interactive>
                            <div className="reveal-text">
                                <Magnetic>
                                    <Interactive>
                                        <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform transition-all duration-300 flex items-center w-max">
                                                Book a Consultation <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                        </a>
                                    </Interactive>
                                </Magnetic>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid md:grid-cols-2 gap-6 perspective-1000">
                        {serviceList.map((service, index) => (
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(service.page); }} key={index} className="reveal-card group bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
                                <span className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 border border-glass-border">
                                    <i className={`fas ${service.icon} text-2xl`}></i>
                                </span>
                                <h3 className="text-2xl font-bold text-light-text mb-3 group-hover:translate-x-1 transition-transform">{service.title}</h3>
                                 <Interactive variant="text"><p className="text-muted-text leading-relaxed flex-grow text-sm sm:text-base">{service.description}</p></Interactive>
                                <div className="mt-8 pt-6 border-t border-glass-border">
                                    <Magnetic>
                                        <Interactive>
                                            <span className="inline-flex flex-col group/link">
                                                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary transition-all">
                                                    Learn more <i className="fas fa-chevron-right text-xs group-hover/link:translate-x-1 transition-transform"></i>
                                                </span>
                                                <span className="h-0.5 bg-secondary w-0 group-hover/link:w-full transition-all duration-300 origin-left mt-1"></span>
                                            </span>
                                        </Interactive>
                                    </Magnetic>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const Products: React.FC<{onNavigate: HomePageProps['onNavigate']}> = ({ onNavigate }) => {
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsPlannerOpen(false);
        };
        
        if (isPlannerOpen) {
            document.body.style.overflow = 'hidden'; 
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        }
        return () => { 
            document.body.style.overflow = ''; 
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlannerOpen]);

    return (
    <>
    <section className="py-12 lg:py-24 px-4 sm:px-6 relative border-t border-glass-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="reveal-text text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-light-text">Our Products</h2>
          <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl text-muted-text max-w-2xl mx-auto">Cutting-edge solutions designed to revolutionize how businesses operate.</p></Interactive>
        </div>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto perspective-1000">
          <div className="reveal-card bg-gradient-to-b from-white/5 to-transparent p-10 rounded-3xl border border-glass-border backdrop-blur-lg flex flex-col items-center text-center hover:border-secondary/30 transition-all duration-500">
            <div className="h-32 flex items-center justify-center mb-8 w-full bg-white rounded-3xl p-6 overflow-hidden">
                 <img src={assets.products.akoDeskLogo} alt="AkoDesk Logo" className="w-auto h-full object-contain hover:scale-105 transition-transform duration-300"></img>
            </div>
            <h3 className="text-2xl font-bold text-light-text mb-4">AkoDesk AI</h3>
            <Interactive variant="text"><p className="text-muted-text leading-relaxed mb-8 flex-grow">Transform your business communications with intelligent AI voice assistants. Deploy voice AI agents that handle inbound/outbound calls, qualify leads, and provide 24/7 customer support.</p></Interactive>
            <Magnetic>
                <Interactive><a href="https://akodesk.com/" target="_blank" rel="noopener noreferrer" className="mt-auto w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 backdrop-blur-md">
                    Visit AkoDesk <i className="fas fa-external-link-alt"></i>
                </a></Interactive>
            </Magnetic>
          </div>
          <div className="reveal-card bg-gradient-to-b from-white/5 to-transparent p-10 rounded-3xl border border-glass-border backdrop-blur-lg flex flex-col items-center text-center hover:border-primary/30 transition-all duration-500">
             <div className="h-32 flex items-center justify-center mb-8 w-full bg-white/5 rounded-2xl p-2 overflow-hidden relative group cursor-pointer" onClick={() => setIsPlannerOpen(true)}>
                <img src={assets.products.wallPlanner} alt="Wall Planner" className="h-full object-contain rounded transition-transform duration-500 filter brightness-90 group-hover:brightness-100"></img>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white bg-primary/80 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                        <i className="fas fa-search-plus"></i> View Full Size
                    </span>
                </div>
             </div>
             <h3 className="text-2xl font-bold text-light-text mb-4">Community Wall Planner</h3>
            <Interactive variant="text"><p className="text-muted-text leading-relaxed mb-8 flex-grow">Our 2025-2026 Wall Planner is designed to help local businesses and community hubs stay organized. It's free, ad-supported, and community-focused!</p></Interactive>
            <div className="mt-auto w-full flex flex-col gap-3">
                 <Magnetic>
                      <Interactive><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 transition-all duration-300">
                        Get Your Planner <i className="fas fa-arrow-right"></i>
                      </a></Interactive>
                 </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>

    {isPlannerOpen && createPortal(
        <div 
            className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-none"
            onClick={() => setIsPlannerOpen(false)}
        >
            <button 
                onClick={(e) => { e.stopPropagation(); setIsPlannerOpen(false); }}
                className="absolute top-8 right-8 z-[9999] w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10"
            >
                <i className="fas fa-times text-2xl"></i>
            </button>
            <div className="w-full h-full p-0 sm:p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img 
                    src={assets.products.wallPlanner}
                    alt="Wall Planner Full Size" 
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg select-none"
                />
            </div>
        </div>,
        document.body
    )}
    </>
    );
};


const Partnership: React.FC = () => (
    <section className="py-12 lg:py-24 px-4 sm:px-6 border-t border-glass-border">
        <div className="max-w-5xl mx-auto text-center reveal-card bg-white/5 border border-primary/50 hover:border-primary transition-all duration-300 rounded-3xl p-10 sm:p-16 backdrop-blur-lg">
            <div className="inline-flex items-center px-6 py-2 rounded-full border border-pink-500/50 bg-pink-500/10 mb-8 shadow-[0_0_15px_rgba(236,72,153,0.3)] backdrop-blur-sm">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm font-bold tracking-widest text-pink-400 uppercase">Community Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-light-text">Official Partnership</h2>
            <div className="flex justify-center mb-10 transform hover:scale-105 transition-transform duration-500">
                 <a href="https://childcancer.org.nz/" target="_blank" rel="noopener noreferrer">
                    <img src={assets.clients.childCancerLogo} alt="Child Cancer Foundation Logo" className="h-24 sm:h-28 w-auto brightness-200 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"></img>
                 </a>
            </div>
            <Interactive variant="text">
                <p className="text-lg sm:text-xl text-muted-text leading-relaxed max-w-3xl mx-auto font-light">
                    Capital Media Partners is an official partner of the&nbsp;
                    <Interactive>
                        <a href="https://childcancer.org.nz/" target="_blank" rel="noopener noreferrer" className="text-pink-400 font-medium relative group">
                            <span>Child Cancer Foundation</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </a>
                    </Interactive>
                    , a trusted New Zealand organisation that provides strength and comfort to children with cancer and their families. This partnership reflects our commitment to giving back.
                </p>
            </Interactive>
             <div className="mt-12">
                <Magnetic>
                    <Interactive>
                        <a href="https://childcancer.org.nz/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#E52491] text-white font-bold rounded-full shadow-lg shadow-[#E52491]/30 hover:bg-[#c21b79] hover:shadow-[#E52491]/50 transform hover:scale-105 transition-all duration-300">
                            <i className="fas fa-heart"></i>
                            <span>Learn More About Our Partnership</span>
                        </a>
                    </Interactive>
                </Magnetic>
            </div>
        </div>
    </section>
);


const Contact: React.FC<{onNavigate: HomePageProps['onNavigate']}> = ({ onNavigate }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section id="contact" className="py-12 lg:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-glass-border">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="reveal-text text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-light-text tracking-tight">Let's Build <span className="text-secondary">Together</span></h2>
                    <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl text-muted-text max-w-2xl mx-auto">Ready to scale? We'd love to hear from you and discuss how we can help your business grow.</p></Interactive>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-12 perspective-1000">
                    <div className="reveal-card flex items-center p-8 bg-white/5 border border-glass-border rounded-3xl backdrop-blur-lg hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-3xl mr-6 flex-shrink-0">
                            <i className="fas fa-phone"></i>
                        </div>
                        <div>
                             <div className="text-sm text-muted-text uppercase tracking-wider mb-1">Phone</div>
                             <div className="flex items-center gap-3">
                                <Interactive variant="text"><span className="text-lg sm:text-xl font-bold text-light-text tracking-wide">+64 22 391 1005</span></Interactive>
                                <Interactive>
                                    <button onClick={() => copyToClipboard('+64 22 391 1005', 'phone')} className="text-gray-500 hover:text-secondary transition-colors">
                                        <i className={`fas ${copiedId === 'phone' ? 'fa-check' : 'fa-copy'} text-lg`}></i>
                                    </button>
                                </Interactive>
                             </div>
                        </div>
                    </div>
                    <div className="reveal-card flex items-center p-8 bg-white/5 border border-glass-border rounded-3xl backdrop-blur-lg hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary text-3xl mr-6 flex-shrink-0">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div>
                             <div className="text-sm text-muted-text uppercase tracking-wider mb-1">Email</div>
                             <div className="flex items-center gap-3">
                                <Interactive><a href="mailto:info@capitalmediapartners.co.nz" className="text-lg sm:text-xl font-bold text-light-text hover:text-secondary transition-colors break-all">info@capitalmediapartners.co.nz</a></Interactive>
                                <Interactive>
                                    <button onClick={() => copyToClipboard('info@capitalmediapartners.co.nz', 'email')} className="text-gray-500 hover:text-secondary transition-colors">
                                        <i className={`fas ${copiedId === 'email' ? 'fa-check' : 'fa-copy'} text-lg`}></i>
                                    </button>
                                </Interactive>
                             </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-16 reveal-text">
                     <Magnetic>
                         <Interactive><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transform transition-all duration-300">
                            <span>Schedule a Discovery Call</span><i className="fas fa-arrow-right"></i>
                         </a></Interactive>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Text Reveals (Slide Up & Fade)
            const textReveals = gsap.utils.toArray('.reveal-text');
            textReveals.forEach((element: any) => {
                gsap.from(element, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // 2. 3D Card Tilts (Perspective Reveal)
            const cards = gsap.utils.toArray('.reveal-card');
            cards.forEach((card: any, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    rotationX: 15,
                    z: -100,
                    scale: 0.9,
                    duration: 1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 60%",
                        toggleActions: "play none none reverse",
                    }
                });
            });
            
             // Hero Specific Animation
            const tl = gsap.timeline();
            tl.from(".hero-stagger", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1.0,
                ease: "power3.out",
                delay: 0.2
            });

            // 3. Parallax Effect for Background Blobs
            gsap.utils.toArray('.parallax-bg').forEach((bg: any) => {
                const speed = bg.getAttribute('data-speed') || 0.2;
                gsap.to(bg, {
                    y: (i, target) => ScrollTrigger.maxScroll(window) * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0
                    }
                });
            });

            // 4. Spline Pinning Logic
            if (window.innerWidth >= 1024) {
                 ScrollTrigger.create({
                    trigger: "#home",
                    start: "top top",
                    endTrigger: ".trusted-by-section", // Note: Class not present in simplified JSX, but logic remains valid for future use
                    end: "top center", 
                    pin: ".spline-pin-target",
                    pinSpacing: false,
                    scrub: true,
                });
            }

        }, mainRef);
        return () => ctx.revert();
    }, []);

  return (
    <main ref={mainRef} className="overflow-hidden">
      <Hero onNavigate={onNavigate} />
      <About onNavigate={onNavigate} />
      <HowWeWork />
      <Services onNavigate={onNavigate} />
      <Products onNavigate={onNavigate} />
      <Partnership />
      <Contact onNavigate={onNavigate} />
    </main>
  );
};

export default HomePage;
