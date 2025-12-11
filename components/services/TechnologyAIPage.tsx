
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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden perspective-1000">
        <div className="container mx-auto py-10 sm:py-16 lg:py-20 px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                     <div className="hero-stagger inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <div className="w-6 h-6 bg-secondary rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-microchip text-white text-sm"></i>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">Technology & AI Solutions</span>
                    </div>
                    <h1 className="hero-stagger text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Intelligent</span>
                        <br />Technology <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Solutions</span>
                    </h1>
                    <Interactive variant="text">
                        <p className="hero-stagger text-base sm:text-lg lg:text-xl mb-10 text-gray-300 leading-relaxed max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                            Transform your business with cutting-edge AI technology. From AkoDesk voice assistants to intelligent automation, we deploy solutions that streamline operations and enhance customer experiences.
                        </p>
                    </Interactive>
                    <div className="hero-stagger flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full sm:w-auto">
                        <Magnetic>
                            <Interactive>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                                    Deploy AI Solutions <i className="fas fa-rocket ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </a>
                            </Interactive>
                        </Magnetic>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center mt-8 lg:mt-0 perspective-1000">
                    <div className="hero-image relative transform-style-3d hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-700 ease-out">
                        <img src={assets.hero.tech} alt="AI Solutions" className="w-full h-auto rounded-3xl shadow-2xl shadow-primary/20 border border-glass-border object-cover" style={{ maxWidth: '600px' }} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const AkoDeskSpotlight: React.FC = () => (
    <section className="bg-primary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
                 <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Meet AkoDesk AI</h2>
                <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">Our flagship AI voice assistant platform that revolutionizes customer engagement with intelligent, natural conversations that scale your business 24/7.</p></Interactive>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    {[
                        { icon: 'fa-phone-volume', title: 'Intelligent Voice Calls', description: 'Handle inbound and outbound calls with natural language processing that understands context and intent.' },
                        { icon: 'fa-user-check', title: 'Lead Qualification', description: 'Automatically qualify leads, gather essential information, and route high-value prospects to your sales team.' },
                        { icon: 'fa-clock', title: '24/7 Availability', description: 'Never miss an opportunity with round-the-clock customer service that maintains your brand voice and standards.' }
                    ].map((feature, i) => (
                         <div key={feature.title} className="reveal-card flex items-start gap-4 bg-dark-bg/50 border border-glass-border p-6 rounded-2xl">
                            <div className={`w-12 h-12 ${i % 2 === 0 ? 'bg-secondary' : 'bg-primary'} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                <i className={`fas ${feature.icon} text-white text-lg`}></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <Interactive variant="text"><p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p></Interactive>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="reveal-card text-center">
                    <div className="relative inline-block">
                         <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-white animate-float max-w-md mx-auto">
                            <img src={assets.products.akoDeskLogo} alt="AkoDesk AI Logo" className="w-full h-auto object-contain max-h-24 rounded-2xl" />
                        </div>
                    </div>
                    <div className="mt-8">
                        <Magnetic>
                            <Interactive>
                                <a href="https://akodesk.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300">
                                    <span className="mr-2">Visit AkoDesk.com</span>
                                    <i className="fas fa-external-link-alt text-sm"></i>
                                </a>
                            </Interactive>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ServiceOverview: React.FC = () => {
    const services = [
        { icon: 'fa-microphone-alt', title: 'AI Voice Assistants' },
        { icon: 'fa-cogs', title: 'Process Automation' },
        { icon: 'fa-chart-line', title: 'AI-Powered Analytics' },
        { icon: 'fa-rocket', title: 'Digital Transformation' },
        { icon: 'fa-brain', title: 'Custom AI Development' },
        { icon: 'fa-plug', title: 'System Integration' }
    ];
    return (
        <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                 <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Beyond Traditional Technology</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">We implement intelligent solutions that don't just digitize your processes—they optimize them with artificial intelligence and machine learning.</p></Interactive>
                </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={service.title} className="reveal-card text-center bg-white/[0.03] border border-glass-border p-8 rounded-3xl backdrop-blur-sm">
                            <div className={`w-16 h-16 ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                <i className={`fas ${service.icon} text-white text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const OurProcess: React.FC = () => {
    const steps = [
        { title: 'Assessment & Planning', description: 'Comprehensive analysis of your current systems, identification of automation opportunities, and development of a tailored AI implementation roadmap.' },
        { title: 'Solution Design & Development', description: 'Custom AI solution development, system architecture design, and integration planning to ensure seamless operation with your existing infrastructure.' },
        { title: 'Testing & Training', description: 'Rigorous testing of AI systems, staff training programs, and gradual rollout to ensure smooth adoption and optimal performance from day one.' },
        { title: 'Deployment & Optimization', description: 'Full system deployment with continuous monitoring, performance optimization, and ongoing support to ensure maximum ROI and efficiency gains.' }
    ];
    return (
        <section className="bg-primary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">From Concept to Deployment</h2>
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-glass-border -z-10"></div>
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                             <div key={index} className="relative pl-12">
                                <div className="absolute left-4 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-8 ring-dark-bg/50">
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
        { icon: 'fa-lightbulb', title: 'Cutting-Edge Technology', description: 'We stay at the forefront of AI advancement, implementing the latest technologies and best practices to give your business a competitive edge.' },
        { icon: 'fa-shield-alt', title: 'Enterprise Security', description: 'All AI solutions are built with enterprise-grade security, ensuring your data and operations remain protected and compliant.' },
        { icon: 'fa-chart-line', title: 'Proven ROI', description: 'Our AI implementations deliver measurable results with clear ROI tracking, efficiency gains, and cost reductions that impact your bottom line.' },
        { icon: 'fa-headset', title: 'Ongoing Support', description: 'Comprehensive post-deployment support, system updates, and continuous optimization to ensure your AI solutions evolve with your business.' }
    ];
    return (
        <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                 <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Leading AI Innovation</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {reasons.map((reason, i) => (
                        <div key={reason.title} className="reveal-card bg-white/[0.03] border border-glass-border p-8 rounded-3xl">
                            <div className="flex items-center gap-4 mb-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${i % 2 === 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'} text-white shadow-lg`}>
                                    <i className={`fas ${reason.icon} text-xl`}></i>
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
    <section className="py-16 sm:py-20 text-white bg-gradient-to-r from-primary/20 via-dark-bg to-secondary/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready for AI Transformation?</h2>
            <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl mb-8 opacity-90">Discover how intelligent technology can revolutionize your business operations and customer experiences</p></Interactive>
            <div className="reveal-text flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic>
                    <Interactive>
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-white text-dark-bg font-bold rounded-xl shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center">
                            Start AI Journey <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        </a>
                    </Interactive>
                </Magnetic>
            </div>
        </div>
    </section>
);


const TechnologyAIPage: React.FC<ServicePageProps> = ({ onNavigate }) => {
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
            tl.from(".hero-stagger", { y: 80, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.2 })
              .from(".hero-image", { scale: 0.8, opacity: 0, rotationY: -15, rotationX: 10, duration: 1.5, ease: "power3.out" }, "-=1");
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="overflow-hidden">
            <Hero onNavigate={onNavigate} />
            <AkoDeskSpotlight />
            <ServiceOverview />
            <OurProcess />
            <WhyChooseUs />
            <CTA onNavigate={onNavigate} />
        </main>
    );
};

export default TechnologyAIPage;
