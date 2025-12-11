
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
                            <i className="fas fa-print text-white text-sm"></i>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">Marketing & Print Media</span>
                    </div>
                    <h1 className="hero-stagger text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Amplify</span> Your
                        <br />Brand <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Nationwide</span>
                    </h1>
                    <Interactive variant="text">
                        <p className="hero-stagger text-base sm:text-lg lg:text-xl mb-10 text-gray-300 leading-relaxed max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                            Create compelling campaigns that resonate with New Zealand audiences. From strategic planning to creative execution, we deliver marketing solutions that drive measurable results.
                        </p>
                    </Interactive>
                    <div className="hero-stagger flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full sm:w-auto">
                        <Magnetic>
                            <Interactive>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="group relative w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-xl shadow-secondary/25 hover:shadow-secondary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                                    Start Your Campaign <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </a>
                            </Interactive>
                        </Magnetic>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center mt-8 lg:mt-0 perspective-1000">
                    <div className="hero-image relative transform-style-3d hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-700 ease-out">
                        <img src={assets.hero.marketing} alt="Marketing Services" className="w-full h-auto rounded-3xl shadow-2xl shadow-secondary/20 border border-glass-border object-cover" style={{ maxWidth: '600px' }} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ServiceOverview: React.FC = () => {
    const services = [
        { icon: 'fa-bullseye', title: 'Campaign Strategy', description: 'Comprehensive campaign planning including audience research, channel strategy, and performance metrics across all regions of New Zealand.' },
        { icon: 'fa-palette', title: 'Creative Development', description: 'Award-winning creative design, copywriting, and visual storytelling that captures your brand essence and resonates with your target audience.' },
        { icon: 'fa-newspaper', title: 'Print Media', description: 'Strategic print advertising across newspapers, magazines, and local publications with optimal placement and timing for maximum impact.' },
        { icon: 'fa-shopping-cart', title: 'Media Buying', description: 'Expert media procurement and placement optimization to maximize your advertising budget and reach the right audience at the right time.' },
        { icon: 'fa-crown', title: 'Brand Development', description: 'Complete brand identity creation and refinement including logo design, brand guidelines, and messaging frameworks that differentiate your business.' },
        { icon: 'fa-chart-bar', title: 'Performance Analytics', description: 'Comprehensive campaign tracking, ROI measurement, and detailed reporting with actionable insights for continuous optimization.' }
    ];
    return (
        <section className="bg-secondary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Marketing That Moves Markets</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto">From audience research to campaign execution, we create marketing strategies that connect with your customers and deliver real business results across New Zealand.</p></Interactive>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={service.title} className="reveal-card bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md text-center">
                            <div className={`w-16 h-16 ${i % 2 !== 0 ? 'bg-primary' : 'bg-secondary'} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
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
        { title: 'Research & Strategy', description: 'Deep-dive market research, competitor analysis, and audience profiling to create data-driven strategies that resonate with your target market across New Zealand\'s diverse regions.' },
        { title: 'Creative & Production', description: 'Development of compelling creative concepts, professional design execution, and high-quality production of all marketing materials from concept to final delivery.' },
        { title: 'Media Planning & Buying', description: 'Strategic media planning and procurement across print, digital, and traditional channels with optimal timing and placement to maximize reach and engagement.' },
        { title: 'Launch & Optimization', description: 'Campaign launch with real-time monitoring, performance tracking, and continuous optimization to ensure maximum ROI and campaign effectiveness throughout the campaign lifecycle.' }
    ];
    return (
        <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                 <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">From Strategy to Success</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-2xl mx-auto">Our proven methodology ensures every campaign delivers maximum impact and measurable results</p></Interactive>
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-glass-border -z-10"></div>
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                             <div key={index} className="relative pl-12">
                                <div className="absolute left-4 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center ring-8 ring-dark-bg">
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
        { icon: 'fa-chart-bar', title: 'Measurable Results', description: 'Every campaign comes with clear KPIs, detailed tracking, and comprehensive reporting so you can see exactly how your marketing investment is performing.' },
        { icon: 'fa-map-marked-alt', title: 'National Reach', description: 'Extensive network of media partnerships and deep understanding of regional markets ensure your message reaches the right audience across all of New Zealand.' },
        { icon: 'fa-award', title: 'Award-Winning Creative', description: 'Our creative team has a proven track record of developing campaigns that not only drive results but also win industry recognition for excellence.' },
        { icon: 'fa-dollar-sign', title: 'Cost-Effective Solutions', description: 'Maximize your marketing budget with our strategic approach to media buying and campaign optimization, ensuring every dollar works harder for your business.' }
    ];
    return (
        <section className="bg-secondary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                 <div className="text-center mb-16">
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Marketing Excellence, Delivered</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {reasons.map((reason, i) => (
                        <div key={reason.title} className="reveal-card bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-4 mb-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${i % 2 !== 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'} text-white shadow-lg`}>
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
    <section className="py-16 sm:py-20 text-white bg-gradient-to-r from-secondary/20 via-dark-bg to-primary/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Amplify Your Brand?</h2>
            <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl mb-8 opacity-90">Let's create a marketing campaign that gets your business noticed across New Zealand</p></Interactive>
            <div className="reveal-text flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic>
                    <Interactive>
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="w-full sm:w-auto text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center">
                            Launch Your Campaign <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        </a>
                    </Interactive>
                </Magnetic>
            </div>
        </div>
    </section>
);


const MarketingPrintMediaPage: React.FC<ServicePageProps> = ({ onNavigate }) => {
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
            <OurProcess />
            <WhyChooseUs />
            <CTA onNavigate={onNavigate} />
        </main>
    );
};

export default MarketingPrintMediaPage;
