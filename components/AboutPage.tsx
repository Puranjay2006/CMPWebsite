
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../contexts/CursorContext';
import Magnetic from './Magnetic';
import { assets } from '../assets';

gsap.registerPlugin(ScrollTrigger);

const Interactive: React.FC<{children: React.ReactElement<any>, variant?: 'link' | 'text'}> = ({ children, variant = 'link' }) => {
  const { setCursorVariant } = useCursor();
  return React.cloneElement(children, {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant('default'),
  });
};

interface AboutPageProps {
    onNavigate: (page: string, hash?: string) => void;
}

const AboutHero: React.FC<{onNavigate: AboutPageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 lg:pb-32 overflow-hidden">
        <div className="parallax-bg absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" data-speed="0.5"></div>
        <div className="parallax-bg absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" style={{animationDelay: '2s'}} data-speed="0.3"></div>

        <div className="container mx-auto py-10 sm:py-16 lg:py-20 px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="text-center lg:text-left">
                    <div className="hero-stagger inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse"></span>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">About Capital Media Partners</span>
                    </div>

                    <h1 className="hero-stagger text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                        We turn
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        &nbsp;ambition
                        </span>
                        &nbsp;into
                        <br />lasting
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                        &nbsp;momentum
                        </span>
                    </h1>
                    
                    <Interactive variant="text">
                        <p className="hero-stagger text-base sm:text-lg lg:text-xl mb-10 text-gray-300 leading-relaxed max-w-none lg:max-w-lg mx-auto lg:mx-0">
                            Founded in Aotearoa, Capital Media Partners blends business advisory, marketing, and technology into one partnership. We guide founders, SMEs, and enterprise teams through critical decisions—from incorporation and compliance to building brands people remember.
                        </p>
                    </Interactive>

                    <div className="hero-stagger flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start w-full sm:w-auto">
                        <Magnetic>
                            <Interactive>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                                    Get In Touch <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </a>
                            </Interactive>
                        </Magnetic>
                        <Magnetic>
                            <Interactive>
                                <a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('home', 'services'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-xl shadow-secondary/25 hover:shadow-secondary/40 transition-all duration-300 backdrop-blur-md flex items-center">
                                Our Services
                                </a>
                            </Interactive>
                        </Magnetic>
                    </div>
                </div>

                <div className="hidden lg:flex justify-center lg:justify-end mt-8 lg:mt-0 perspective-1000 group p-2 sm:p-0">
                    <div className="relative h-[250px] sm:h-[350px] lg:h-[420px] w-full rounded-3xl overflow-hidden border border-glass-border shadow-2xl transform transition-all duration-700 ease-out rotate-y-6 rotate-x-6 scale-95 hover:rotate-y-0 hover:rotate-x-0 hover:scale-100 hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)]">
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                        <img src={assets.hero.about} alt="About Capital Media Partners" className="w-full h-full object-cover filter brightness-90 contrast-110" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const CompanyStats: React.FC = () => (
    <section className="bg-dark-bg/50 py-16 lg:py-32 border-y border-glass-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="reveal-card text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
              <i className="fas fa-calendar-alt text-white text-2xl"></i>
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">2025</h3>
            <p className="text-gray-400">Founded in New Zealand</p>
          </div>
          <div className="reveal-card text-center">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/20">
              <i className="fas fa-users text-white text-2xl"></i>
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">10+</h3>
            <p className="text-gray-400">Happy Clients Served</p>
          </div>
          <div className="reveal-card text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
              <i className="fas fa-handshake text-white text-2xl"></i>
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
            <p className="text-gray-400">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
);

const OurStory: React.FC = () => (
    <section className="relative py-16 lg:py-32">
        <div className="parallax-bg absolute -top-40 -left-24 w-[360px] h-[360px] bg-primary/10 rounded-full blur-3xl pointer-events-none" data-speed="0.2"></div>
        <div className="parallax-bg absolute top-1/4 right-[-160px] w-[460px] h-[460px] bg-secondary/10 rounded-full opacity-40 blur-3xl pointer-events-none" data-speed="0.4"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 lg:gap-16 items-center">
                <div className="space-y-8">
                    <div>
                        <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                            <span className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse"></span>
                            <span className="text-sm font-bold tracking-widest text-secondary uppercase">Our Story</span>
                        </div>
                        <h2 className="reveal-text mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Building partnerships that matter</h2>
                    </div>
                    <Interactive variant="text">
                        <div className="reveal-text space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                        <p>
                            Capital Media Partners was born from a simple belief: businesses succeed when they have the right guidance at the right time. Founded in New Zealand, we recognized that startups and growing companies needed more than just individual services—they needed integrated solutions that work together seamlessly.
                        </p>
                        <p>
                            Our approach combines deep local market knowledge with innovative technology solutions, creating partnerships that go beyond traditional consulting. We don't just provide services; we become an extension of your team, committed to your long-term success.
                        </p>
                        </div>
                    </Interactive>
                    <div className="grid sm:grid-cols-2 gap-6 pt-4">
                        <div className="reveal-card bg-white/[0.03] border border-glass-border p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-primary/30">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white mb-4">
                                <i className="fas fa-compass text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Native market guidance</h3>
                            <Interactive variant="text"><p className="text-sm text-gray-400 leading-relaxed">Navigate legislation, culture, and opportunity with a team immersed in the New Zealand market.</p></Interactive>
                        </div>
                        <div className="reveal-card bg-white/[0.03] border border-glass-border p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-secondary/30">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary text-white mb-4">
                                <i className="fas fa-layer-group text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Integrated solutions</h3>
                            <Interactive variant="text"><p className="text-sm text-gray-400 leading-relaxed">Bring advisory, marketing, AI, and insurance into one connected roadmap shaped around your goals.</p></Interactive>
                        </div>
                    </div>
                </div>
                <div className="relative perspective-1000 group p-2 sm:p-0">
                    <div className="h-[250px] lg:h-[420px] w-full rounded-3xl overflow-hidden border border-glass-border shadow-2xl transform transition-all duration-700 ease-out rotate-y-6 rotate-x-6 scale-95 hover:rotate-y-0 hover:rotate-x-0 hover:scale-100 hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)]">
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                        <img src={assets.general.team} alt="Capital Media Partners Team" className="w-full h-full object-cover filter brightness-90 contrast-110" />
                    </div>
                    <div className="reveal-card absolute -bottom-8 -right-8 sm:bottom-6 sm:left-6 sm:right-6 bg-dark-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl shadow-xl p-6 flex items-start gap-4 z-20">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <i className="fas fa-seedling text-xl"></i>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Our promise</p>
                            <Interactive variant="text"><p className="text-sm font-medium text-light-text leading-relaxed">We stay beside you beyond launch—through compliance, scale, and every new idea.</p></Interactive>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const MissionVisionValues: React.FC = () => (
    <section className="bg-primary/5 py-16 lg:py-32 border-y border-glass-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
            <span className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-bold tracking-widest text-secondary uppercase">Our Foundation</span>
          </div>
          <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Mission, Vision & Values</h2>
          <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">The principles that guide everything we do</p></Interactive>
        </div>
  
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="reveal-card bg-white/[0.03] border border-glass-border p-8 rounded-2xl backdrop-blur-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                <i className="fas fa-eye text-xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-white">Our Vision</h3>
            </div>
            <Interactive variant="text"><p className="text-base text-gray-400 leading-relaxed">To empower businesses with the knowledge, tools, and networks they need to succeed in New Zealand's dynamic market.</p></Interactive>
          </div>
          <div className="reveal-card bg-white/[0.03] border border-glass-border p-8 rounded-2xl backdrop-blur-sm hover:border-secondary/30 transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary text-white shadow-lg">
                <i className="fas fa-bullseye text-xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
            </div>
            <Interactive variant="text"><p className="text-base text-gray-400 leading-relaxed">To deliver measurable growth and meaningful impact by combining business advisory, marketing expertise, and technology-driven solutions.</p></Interactive>
          </div>
        </div>
  
        <div className="text-center mb-16 relative">
            {/* Enhanced Text Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-10 inline-block relative z-10 tracking-tight">
                {Array.from("Our Values").map((char, index) => (
                    <span key={index} className="inline-block stagger-char opacity-0 translate-y-8">
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                {icon: 'fa-handshake', title: 'Trust', description: 'Building long-term relationships through honesty and reliability.', color: 'primary'},
                {icon: 'fa-lightbulb', title: 'Innovation', description: 'Creating smarter, future-ready solutions for business growth.', color: 'secondary'},
                {icon: 'fa-chart-line', title: 'Growth', description: 'Helping our clients scale sustainably and successfully.', color: 'primary'},
                {icon: 'fa-users', title: 'Partnership', description: 'Walking alongside businesses and communities to make a difference.', color: 'secondary'},
            ].map(value => (
                <div key={value.title} className="reveal-card bg-white/[0.03] border border-glass-border p-6 text-center rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className={`w-16 h-16 bg-${value.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-${value.color}/20`}>
                        <i className={`fas ${value.icon} text-2xl text-${value.color}`}></i>
                    </div>
                    <h4 className="font-semibold text-white mb-2">{value.title}</h4>
                    <Interactive variant="text"><p className="text-sm text-gray-400 leading-relaxed">{value.description}</p></Interactive>
                </div>
            ))}
        </div>
      </div>
    </section>
);

const OurJourney: React.FC = () => {
    const timelineItems = [
        { icon: 'fa-rocket', year: '2025 - Foundation', text: 'Capital Media Partners was founded with a vision to provide integrated business solutions for New Zealand companies. We began with a focus on combining advisory, marketing, and technology services under one trusted partnership.' },
        { icon: 'fa-handshake', year: '2025 - First Partnerships', text: 'Established our first client relationships with BASNZ, JSR Life Motors, and other forward-thinking New Zealand businesses. These partnerships validated our integrated approach to business growth.' },
        { icon: 'fa-heart', year: '2025 - Community Partnership', text: 'Became an official partner of the Child Cancer Foundation, demonstrating our commitment to giving back to the New Zealand community that supports us.' },
        { icon: 'fa-microchip', year: '2025 - Technology Innovation', text: 'Launched AkoDesk AI, our flagship voice AI solution, helping businesses automate customer engagement and streamline operations with cutting-edge technology.' },
    ];
    return (
        <section className="bg-dark-bg py-16 lg:py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse"></span>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">Our Journey</span>
                    </div>
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Building for the future</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-2xl mx-auto">Key milestones in our commitment to empowering New Zealand businesses</p></Interactive>
                </div>

                <div className="relative">
                    {/* The line */}
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-glass-border -z-10"></div>
                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                             <div key={index} className="relative pl-12">
                                <div className="absolute left-4 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-8 ring-dark-bg">
                                    <i className={`fas ${item.icon} text-white text-sm`}></i>
                                </div>
                                <div className="reveal-card bg-white/[0.03] border border-glass-border p-6 rounded-2xl backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-white mb-2">{item.year}</h3>
                                    <Interactive variant="text"><p className="text-gray-400 leading-relaxed">{item.text}</p></Interactive>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
};

const AboutCTA: React.FC<{onNavigate: AboutPageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="py-16 lg:py-32 text-white bg-gradient-to-r from-primary/20 via-dark-bg to-secondary/20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to partner with us?</h2>
        <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl mb-8 opacity-90">Let's discuss how we can help your business succeed in New Zealand</p></Interactive>
        <div className="reveal-text flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic>
                <Interactive>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center">
                        Get In Touch <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </a>
                </Interactive>
            </Magnetic>
            <Magnetic>
                <Interactive>
                    <a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('home', 'services'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center">
                        Explore Services
                    </a>
                </Interactive>
            </Magnetic>
        </div>
      </div>
    </section>
);


const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
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

            const cards = gsap.utils.toArray('.reveal-card');
            cards.forEach((card: any) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    rotationX: 10,
                    duration: 1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    }
                });
            });
            
            const tl = gsap.timeline();
            tl.from(".hero-stagger", {
                y: 80,
                opacity: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.2
            });

            // Specific animation for Our Values staggered text
            const chars = gsap.utils.toArray('.stagger-char');
            if(chars.length > 0) {
                gsap.to(chars, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(1.7)",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: chars[0] as Element, // Use the first character as the trigger
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            // Parallax Effect
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

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="overflow-hidden">
            <AboutHero onNavigate={onNavigate} />
            <CompanyStats />
            <OurStory />
            <MissionVisionValues />
            <OurJourney />
            <AboutCTA onNavigate={onNavigate} />
        </main>
    );
};

export default AboutPage;
