
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../../contexts/CursorContext';
import Magnetic from '../Magnetic';
import { assets } from '../../assets';

gsap.registerPlugin(ScrollTrigger);

const Interactive: React.FC<{children: React.ReactElement<any>, variant?: 'link' | 'text'}> = ({ children, variant = 'link' }) => {
  const { setCursorVariant } = useCursor();
  return React.cloneElement(children, {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant('default'),
  });
};

interface ServicePageProps {
    onNavigate: (page: string, hash?: string) => void;
}

const Hero: React.FC<{onNavigate: ServicePageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-24 lg:pb-32 overflow-hidden perspective-1000">
        <div className="parallax-bg absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" data-speed="0.5"></div>
        <div className="parallax-bg absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" style={{animationDelay: '2s'}} data-speed="0.3"></div>
        <div className="container mx-auto py-10 sm:py-16 lg:py-20 px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <div className="hero-stagger inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <div className="w-6 h-6 bg-secondary rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-business-time text-white text-sm"></i>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">Business Advisory Services</span>
                    </div>
                    <h1 className="hero-stagger text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                        Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Business</span>
                        <br />Success <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Partner</span>
                    </h1>
                    <Interactive variant="text">
                        <p className="hero-stagger text-base sm:text-lg lg:text-xl mb-10 text-gray-300 leading-relaxed max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                            Expert business advisory services to guide your startup or SME through company registration, compliance, strategic planning, and sustainable growth in New Zealand.
                        </p>
                    </Interactive>
                    <div className="hero-stagger flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full sm:w-auto">
                        <Magnetic>
                            <Interactive>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                                    Start Your Business Journey <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </a>
                            </Interactive>
                        </Magnetic>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center mt-8 lg:mt-0 perspective-1000 group p-2 sm:p-0">
                    <div className="relative h-[250px] sm:h-[350px] lg:h-[420px] w-full rounded-3xl overflow-hidden border border-glass-border shadow-2xl transform transition-all duration-700 ease-out rotate-y-6 rotate-x-6 scale-95 hover:rotate-y-0 hover:rotate-x-0 hover:scale-100 hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)]">
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                        <img src={assets.hero.business} alt="Business Advisory Services" className="w-full h-full object-cover filter brightness-90 contrast-110" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ServiceOverview: React.FC = () => {
    const services = [
        { icon: 'fa-building', title: 'Company Registration', description: 'Complete company incorporation services including NZBN registration, director appointments, and statutory compliance setup.' },
        { icon: 'fa-gavel', title: 'Compliance & Governance', description: 'Ongoing compliance management, board governance frameworks, and regulatory requirement fulfillment.' },
        { icon: 'fa-chart-line', title: 'Strategic Planning', description: 'Business strategy development, market entry planning, and growth roadmap creation tailored to your goals.' },
        { icon: 'fa-handshake', title: 'Industry Integration', description: 'Network introductions, industry partnerships, and stakeholder relationship development in the NZ market.' },
        { icon: 'fa-calculator', title: 'Financial Planning', description: 'Financial structure optimization, funding strategy development, and investor readiness preparation.' },
        { icon: 'fa-users', title: 'Ongoing Support', description: 'Continuous advisory support, quarterly reviews, and strategic guidance as your business evolves.' }
    ];
    return (
        <section className="bg-primary/5 py-24 lg:py-32 border-y border-glass-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        <span className="text-sm font-medium text-secondary uppercase tracking-wider">What We Offer</span>
                    </div>
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Comprehensive Business Advisory</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">From incorporation to ongoing compliance, we provide the expertise and support your business needs to thrive in New Zealand's dynamic market.</p></Interactive>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={service.title} className="reveal-card text-center bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md hover:border-primary/30 transition-colors">
                            <div className={`w-16 h-16 ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                <i className={`fas ${service.icon} text-white text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                            <Interactive variant="text"><p className="text-gray-400 leading-relaxed text-sm">{service.description}</p></Interactive>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const OurProcess: React.FC = () => {
    const steps = [
        { title: 'Discovery & Assessment', description: 'We begin with a comprehensive consultation to understand your business goals, market objectives, and regulatory requirements. This includes market analysis and competitive landscape review.' },
        { title: 'Structure & Registration', description: 'We handle all aspects of company formation including entity structure selection, NZBN registration, director appointments, and initial compliance setup to ensure your business is legally compliant.' },
        { title: 'Strategic Planning', description: 'Development of your business strategy, market entry plan, and growth roadmap. We create actionable plans that align with your vision and market opportunities.' },
        { title: 'Implementation & Support', description: 'Ongoing support through implementation, regular compliance reviews, strategic adjustments, and continuous advisory services as your business grows and evolves.' },
    ];
    return (
        <section className="bg-dark-bg py-24 lg:py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                 <div className="text-center mb-16">
                    <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        <span className="text-sm font-semibold uppercase tracking-wide text-secondary">Our Process</span>
                    </div>
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">How We Work With You</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-2xl mx-auto">Our proven methodology ensures your business is set up for success from day one</p></Interactive>
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-glass-border -z-10"></div>
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                             <div key={index} className="relative pl-12">
                                <div className="absolute left-4 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-8 ring-dark-bg">
                                    <span className="text-white text-xs font-bold">{index+1}</span>
                                </div>
                                <div className="reveal-card bg-white/[0.03] border border-glass-border p-6 rounded-2xl backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <Interactive variant="text"><p className="text-gray-400 leading-relaxed">{step.description}</p></Interactive>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhyChooseUs: React.FC = () => {
    const reasons = [
        { icon: 'fa-map-marked-alt', title: 'Local Expertise', description: "Deep understanding of New Zealand's business environment, regulations, and market dynamics. We know the local landscape inside and out." },
        { icon: 'fa-rocket', title: 'Proven Track Record', description: 'Successfully guided numerous startups and SMEs through their business journey, from initial setup to sustainable growth and expansion.' },
        { icon: 'fa-clock', title: 'Fast & Efficient', description: 'Streamlined processes and efficient workflows ensure your business is up and running quickly without compromising on quality or compliance.' },
        { icon: 'fa-heart', title: 'Ongoing Partnership', description: "We're not just consultants - we're your long-term partners, committed to your success through every stage of your business journey." }
    ];
    return (
        <section className="bg-primary/5 py-24 lg:py-32 border-y border-glass-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Your Success is Our Priority</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {reasons.map((reason, i) => (
                        <div key={reason.title} className="reveal-card bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-4 mb-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${i % 2 === 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'} text-white shadow-lg relative group`}>
                                    <i className={`fas ${reason.icon} text-xl`}></i>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-dark-bg/95 border border-glass-border rounded-xl text-xs text-gray-300 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 backdrop-blur-md transform translate-y-2 group-hover:translate-y-0">
                                        {reason.description}
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-bg/95 border-b border-r border-glass-border transform rotate-45"></div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-white">{reason.title}</h3>
                            </div>
                            <Interactive variant="text"><p className="text-base text-gray-400 leading-relaxed">{reason.description}</p></Interactive>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const CTA: React.FC<{onNavigate: ServicePageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="py-24 lg:py-32 text-white bg-gradient-to-r from-primary/20 via-dark-bg to-secondary/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Business?</h2>
            <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl mb-8 opacity-90">Let's discuss how we can help you establish and grow your business in New Zealand</p></Interactive>
            <div className="reveal-text flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic>
                    <Interactive>
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center">
                            Get Started Today <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        </a>
                    </Interactive>
                </Magnetic>
            </div>
        </div>
    </section>
);


const BusinessAdvisoryPage: React.FC<ServicePageProps> = ({ onNavigate }) => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const textReveals = gsap.utils.toArray('.reveal-text');
            textReveals.forEach((element: any) => {
                gsap.from(element, { y: 60, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" } });
            });
            const cards = gsap.utils.toArray('.reveal-card');
            cards.forEach((card: any) => {
                gsap.from(card, { y: 100, opacity: 0, rotationX: 10, duration: 1, ease: "back.out(1.2)", scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" } });
            });
            const tl = gsap.timeline();
            tl.from(".hero-stagger", { y: 80, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.2 });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="overflow-hidden">
            <Hero onNavigate={onNavigate} />
            <ServiceOverview />
            <OurProcess />
            <WhyChooseUs />
            <CTA onNavigate={onNavigate} />
        </main>
    );
};

export default BusinessAdvisoryPage;
