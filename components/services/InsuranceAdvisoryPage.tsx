
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
                            <i className="fas fa-shield-alt text-white text-sm"></i>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">Insurance Advisory Services</span>
                    </div>
                    <h1 className="hero-stagger text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Protect</span> What
                        <br />Matters <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Most</span>
                    </h1>
                    <Interactive variant="text">
                        <p className="hero-stagger text-base sm:text-lg lg:text-xl mb-10 text-gray-300 leading-relaxed max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                            Comprehensive insurance advisory services tailored to your unique needs. From risk assessment to policy optimization, we ensure you have the right protection at the right price.
                        </p>
                    </Interactive>
                    <div className="hero-stagger flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full sm:w-auto">
                        <Magnetic>
                            <Interactive>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-xl shadow-secondary/25 hover:shadow-secondary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                                    Get Protected Today <i className="fas fa-shield-alt ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </a>
                            </Interactive>
                        </Magnetic>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center mt-8 lg:mt-0 perspective-1000">
                    <div className="hero-image relative transform-style-3d hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-700 ease-out">
                        <img src={assets.hero.insurance} alt="Insurance Advisory" className="w-full h-auto rounded-3xl shadow-2xl shadow-secondary/20 border border-glass-border object-cover" style={{ maxWidth: '600px' }} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ServiceOverview: React.FC = () => {
    const services = [
        { icon: 'fa-building', title: 'Business Insurance', description: 'Comprehensive business protection including liability, property, cyber security, and professional indemnity insurance tailored to your industry.' },
        { icon: 'fa-home', title: 'Personal Insurance', description: 'Complete personal protection including home, contents, vehicle, health, and life insurance with policies that grow with your needs.' },
        { icon: 'fa-chart-pie', title: 'Risk Assessment', description: 'Thorough risk analysis and mitigation strategies to identify vulnerabilities and implement proactive protection measures.' },
        { icon: 'fa-balance-scale', title: 'Policy Optimization', description: 'Review and optimization of existing policies to eliminate gaps, reduce costs, and ensure optimal coverage for your current situation.' },
        { icon: 'fa-hands-helping', title: 'Claims Support', description: 'Expert assistance with claims management, advocacy with insurers, and guidance through the entire claims process.' },
        { icon: 'fa-gavel', title: 'Compliance Advisory', description: 'Ensure compliance with New Zealand insurance regulations and industry-specific requirements for complete peace of mind.' }
    ];
    return (
        <section className="bg-secondary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Complete Protection Strategies</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">We provide comprehensive insurance advisory services that protect your business, assets, and family with customized solutions that fit your budget and risk profile.</p></Interactive>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={service.title} className="reveal-card bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md text-center">
                            <div className={`w-16 h-16 ${i % 2 === 0 ? 'bg-secondary' : 'bg-primary'} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
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

const InsuranceTypes: React.FC = () => (
    <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
                 <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Specialized Insurance Solutions</h2>
                <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">Whether you're protecting a startup, established business, or your family, we have specialized insurance products for every situation.</p></Interactive>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                 <div className="reveal-card bg-white/[0.03] border border-glass-border p-8 rounded-3xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white shadow-lg"><i className="fas fa-briefcase text-xl"></i></div>
                        <h3 className="text-2xl font-semibold text-white">Business Protection</h3>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                        {['Public & Product Liability Insurance', 'Professional Indemnity Insurance', 'Cyber Liability & Data Protection', 'Commercial Property Insurance', 'Business Interruption Coverage', 'Directors & Officers Insurance'].map(item => (
                            <li key={item} className="flex items-start gap-3"><i className="fas fa-check-circle text-secondary mt-1 flex-shrink-0"></i><span>{item}</span></li>
                        ))}
                    </ul>
                </div>
                 <div className="reveal-card bg-white/[0.03] border border-glass-border p-8 rounded-3xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary text-white shadow-lg"><i className="fas fa-users text-xl"></i></div>
                        <h3 className="text-2xl font-semibold text-white">Personal Protection</h3>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                        {['Home & Contents Insurance', 'Vehicle Insurance (Car, Boat, Motorcycle)', 'Life & Income Protection Insurance', 'Health & Medical Insurance', 'Travel Insurance', 'Personal Liability Coverage'].map(item => (
                             <li key={item} className="flex items-start gap-3"><i className="fas fa-check-circle text-secondary mt-1 flex-shrink-0"></i><span>{item}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

const OurProcess: React.FC = () => {
    const steps = [
        { title: 'Risk Analysis & Needs Assessment', description: 'Comprehensive evaluation of your current situation, assets, liabilities, and potential risks to identify protection gaps and coverage requirements.' },
        { title: 'Market Research & Policy Comparison', description: 'Extensive research across multiple insurers to find the best coverage options, comparing terms, conditions, and pricing to ensure optimal value.' },
        { title: 'Customized Insurance Strategy', description: 'Development of a tailored insurance portfolio that provides comprehensive protection while optimizing costs and eliminating unnecessary coverage overlaps.' },
        { title: 'Implementation & Ongoing Management', description: 'Policy implementation with continuous monitoring, annual reviews, claims support, and adjustments as your circumstances change over time.' }
    ];
    return (
        <section className="bg-secondary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        <span className="text-sm font-semibold uppercase tracking-wide text-secondary">Your Protection Journey</span>
                    </div>
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Your Protection Journey</h2>
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-glass-border -z-10"></div>
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                             <div key={index} className="relative pl-12">
                                <div className="absolute left-4 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center ring-8 ring-dark-bg/50">
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


const CTA: React.FC<{onNavigate: ServicePageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="py-16 sm:py-20 text-white bg-gradient-to-r from-secondary/20 via-dark-bg to-primary/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Secure Your Future Today</h2>
            <div className="reveal-text flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic>
                    <Interactive>
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center">
                           Get Free Consultation <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        </a>
                    </Interactive>
                </Magnetic>
            </div>
        </div>
    </section>
);


const InsuranceAdvisoryPage: React.FC<ServicePageProps> = ({ onNavigate }) => {
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
            <ServiceOverview />
            <InsuranceTypes />
            <OurProcess />
            <CTA onNavigate={onNavigate} />
        </main>
    );
};

export default InsuranceAdvisoryPage;
