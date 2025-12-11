
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursor } from '../contexts/CursorContext';
import Magnetic from './Magnetic';
import { assets } from '../assets';

const Interactive: React.FC<{children: React.ReactElement<any>, variant?: 'link' | 'text'}> = ({ children, variant = 'link' }) => {
  const { setCursorVariant } = useCursor();
  return React.cloneElement(children, {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant('default'),
  });
};

interface NotFoundPageProps {
    onNavigate: (page: string, hash?: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-item", { y: 60, opacity: 0, stagger: 0.1, duration: 1.2, ease: "power4.out", delay: 0.2 });
        }, mainRef);
        return () => ctx.revert();
    }, []);
    
    const popularPages = [
        { title: 'About Us', page: 'about', description: 'Learn about our company', icon: 'fa-users', color: 'primary' },
        { title: 'Our Services', page: 'home', hash: 'services', description: 'Explore our solutions', icon: 'fa-cogs', color: 'secondary' },
        { title: 'Contact', page: 'contact', description: 'Get in touch', icon: 'fa-envelope', color: 'primary' },
    ];

    return (
        <main ref={mainRef} className="overflow-hidden">
            <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 text-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-12 text-center reveal-item">
                            <img src={assets.general.notFound} alt="404 Error - Page Not Found" className="inline-block mb-8 rounded-2xl shadow-2xl shadow-primary/20 w-full max-w-lg" />
                        </div>

                        <div className="mb-8 reveal-item">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Oops! Page Not Found
                            </h2>
                            <Interactive variant="text">
                                <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                                    Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
                                </p>
                            </Interactive>
                        </div>

                        <div className="mb-12 reveal-item">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                <Magnetic>
                                    <Interactive>
                                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-primary-dark transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                                            <span className="flex items-center justify-center text-sm sm:text-base">
                                                <i className="fas fa-home mr-2"></i> Go to Homepage
                                            </span>
                                        </a>
                                    </Interactive>
                                </Magnetic>
                                <Magnetic>
                                    <Interactive>
                                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:bg-secondary hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                                            <span className="flex items-center justify-center text-sm sm:text-base">
                                                <i className="fas fa-phone mr-2"></i> Contact Us
                                            </span>
                                        </a>
                                    </Interactive>
                                </Magnetic>
                            </div>
                        </div>

                        <div className="reveal-item bg-dark-bg/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-glass-border">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">Popular Pages</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {popularPages.map(page => (
                                    <Interactive key={page.title}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(page.page, page.hash); }} className="group flex items-center p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-glass-border">
                                            <div className={`w-12 h-12 bg-${page.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                                <i className={`fas ${page.icon} text-white text-lg`}></i>
                                            </div>
                                            <div className="ml-4 text-left">
                                                <h4 className={`font-semibold text-white group-hover:text-${page.color} transition-colors duration-300`}>{page.title}</h4>
                                                <p className="text-sm text-gray-400">{page.description}</p>
                                            </div>
                                        </a>
                                    </Interactive>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFoundPage;
