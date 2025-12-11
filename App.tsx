
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { CursorProvider } from './contexts/CursorContext';
import CustomCursor from './components/CustomCursor';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import NotFoundPage from './components/NotFoundPage';
import BusinessAdvisoryPage from './components/services/BusinessAdvisoryPage';
import MarketingPrintMediaPage from './components/services/MarketingPrintMediaPage';
import TechnologyAIPage from './components/services/TechnologyAIPage';
import InsuranceAdvisoryPage from './components/services/InsuranceAdvisoryPage';
import ThreeCanvas from './components/ThreeCanvas';
import { useCursor } from './contexts/CursorContext';
import Magnetic from './components/Magnetic';
import ScrollToTop from './components/ScrollToTop';
import { assets } from './assets';

const Interactive: React.FC<{children: React.ReactElement<any>, variant?: 'link' | 'text'}> = ({ children, variant = 'link' }) => {
  const { setCursorVariant } = useCursor();
  return React.cloneElement(children, {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant('default'),
  });
};

interface HeaderProps {
    onNavigate: (page: string, hash?: string) => void;
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, page: string, hash?: string) => {
        e.preventDefault();
        onNavigate(page, hash);
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', page: 'home' },
        { name: 'About', page: 'about' },
        { name: 'Services', page: 'services-dropdown' },
        { name: 'Contact', page: 'contact' },
    ];
    
    const servicesLinks = [
        { name: 'Business Advisory', page: 'service-business', icon: 'fa-business-time', description: 'Company registration & compliance' },
        { name: 'Marketing & Print Media', page: 'service-marketing', icon: 'fa-print', description: 'Targeted campaigns & branding' },
        { name: 'Technology & AI Solutions', page: 'service-tech', icon: 'fa-microchip', description: 'AkoDesk AI & automation' },
        { name: 'Insurance Advisory', page: 'service-insurance', icon: 'fa-shield-alt', description: 'Tailored protection plans' },
    ];

    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.98, y: -10, pointerEvents: 'none' as const },
        visible: { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' as const }
    };

    const [isServicesAccordionOpen, setIsServicesAccordionOpen] = useState(false);

    useEffect(() => {
        if(isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    // Close mobile menu on resize if screen becomes large
    useEffect(() => {
        const handleResize = () => {
            // Optimised for tablets: Switch to desktop menu only on large screens (>= 1024px)
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 transition-all duration-300">
            <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 bg-dark-bg/60 backdrop-blur-md border border-glass-border rounded-xl sm:rounded-2xl shadow-lg shadow-primary/5">
                <Interactive>
                    <a href="#home" onClick={(e) => handleNav(e, 'home')} className="flex items-center gap-4 group">
                        <motion.img 
                            src={assets.logo} 
                            alt="Capital Media Partners Logo" 
                            className="w-14 h-14 object-contain"
                            whileHover={{ scale: 1.1, rotateZ: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        />
                        <div className="flex flex-col justify-center">
                            <span className="hidden sm:block text-2xl font-bold text-light-text font-outfit leading-none">Capital Media Partners</span>
                            <span className="hidden sm:block text-xs font-medium text-secondary uppercase tracking-[0.15em] leading-tight mt-1 group-hover:text-primary transition-colors duration-300">
                                Be Seen. Be Trusted. Be Remembered.
                            </span>
                        </div>
                    </a>
                </Interactive>
                {/* Desktop Nav - Visible on Large Screens */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        const isActive = currentPage === link.page;
                        if (link.page === 'services-dropdown') {
                            return (
                                <div 
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    <div className="relative">
                                      <Magnetic>
                                          <Interactive>
                                              <button 
                                                className="flex items-center gap-2 text-sm font-medium text-light-text hover:text-secondary transition-colors duration-300 uppercase tracking-widest px-2 py-1"
                                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                              >
                                                  Services 
                                                  <motion.i 
                                                      className="fas fa-chevron-down text-xs"
                                                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                                      transition={{ duration: 0.3 }}
                                                  ></motion.i>
                                              </button>
                                          </Interactive>
                                      </Magnetic>
                                      <span className={`absolute -bottom-2 left-2 w-[calc(100%-16px)] h-0.5 bg-secondary transform transition-transform duration-300 ${isServicesOpen ? 'scale-x-100' : 'scale-x-0'}`}></span>
                                    </div>
                                    <motion.div 
                                        className="absolute top-full right-0 w-[800px] origin-top-right pt-4"
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate={isServicesOpen ? "visible" : "hidden"}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >
                                      <div className="pl-4">
                                        <div className="bg-[#0f0b29] backdrop-blur-xl border border-glass-border rounded-2xl shadow-2xl p-6 overflow-hidden">
                                            <div className="grid grid-cols-2 gap-6">
                                                {servicesLinks.map(service => (
                                                    <Interactive key={service.name}>
                                                        <a href="#" onClick={(e) => {handleNav(e, service.page); setIsServicesOpen(false); }} className="group flex items-center gap-4 px-4 py-4 text-sm text-light-text hover:bg-[#581c87] rounded-xl transition-colors duration-200 border border-transparent hover:border-white/10">
                                                            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#2e1065] text-primary group-hover:bg-[#7e22ce] group-hover:text-white transition-all duration-300 flex-shrink-0">
                                                                <i className={`fas ${service.icon} text-2xl`}></i>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-bold text-white text-lg group-hover:text-white mb-1">{service.name}</p>
                                                                <p className="text-sm text-gray-400 truncate group-hover:text-gray-200">{service.description}</p>
                                                            </div>
                                                        </a>
                                                    </Interactive>
                                                ))}
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-white/10">
                                                <Interactive>
                                                    <a href="#" onClick={(e) => {handleNav(e, 'home', 'services'); setIsServicesOpen(false); }} className="group flex items-center justify-center gap-3 px-4 py-5 bg-[#2e1065] hover:bg-[#581c87] text-white font-bold rounded-xl transition-all duration-300 w-full text-lg">
                                                        <div className="w-8 h-8 rounded-full bg-[#581c87] group-hover:bg-[#7e22ce] flex items-center justify-center transition-colors">
                                                            <div className="w-2 h-2 rounded-full bg-[#c084fc]"></div>
                                                        </div>
                                                        <span>Explore All Services</span> 
                                                        <i className="fas fa-arrow-right ml-auto transition-transform group-hover:translate-x-1"></i>
                                                    </a>
                                                </Interactive>
                                            </div>
                                          </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        }
                        return (
                            <Magnetic key={link.name}>
                                <div className="relative">
                                    <Interactive>
                                        <a href={'#'} onClick={(e) => handleNav(e, link.page)} className={`text-sm font-medium hover:text-secondary transition-colors duration-300 uppercase tracking-widest ${isActive ? 'text-secondary' : 'text-light-text'}`}>
                                            {link.name}
                                        </a>
                                    </Interactive>
                                    <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-secondary transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
                                </div>
                            </Magnetic>
                        );
                    })}
                </nav>
                {/* Mobile Menu Button - Visible up to Large Screens */}
                <div className="lg:hidden text-light-text">
                    <Magnetic>
                        <button onClick={() => setIsMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center">
                            <i className="fas fa-bars text-2xl"></i>
                        </button>
                    </Magnetic>
                </div>
            </div>
             {/* Mobile Menu */}
             <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm bg-dark-bg/95 backdrop-blur-xl z-50 border-l border-glass-border shadow-2xl overflow-y-auto"
                    >
                         <div className="p-6 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-10">
                                <span className="font-bold text-lg text-white">Menu</span>
                                <Magnetic>
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-white hover:text-secondary transition-colors">
                                        <i className="fas fa-times text-2xl"></i>
                                    </button>
                                </Magnetic>
                            </div>
                            <nav className="flex flex-col space-y-6 text-xl text-white flex-grow">
                                {navLinks.map(link => {
                                    if(link.page === 'services-dropdown') {
                                        return (
                                            <div key={link.name} className="border-b border-white/10 pb-4">
                                                <button onClick={() => setIsServicesAccordionOpen(!isServicesAccordionOpen)} className="w-full flex justify-between items-center py-2 hover:text-secondary transition-colors">
                                                    <span>Services</span>
                                                    <motion.i 
                                                        className="fas fa-chevron-down text-sm"
                                                        animate={{ rotate: isServicesAccordionOpen ? 180 : 0 }}
                                                    ></motion.i>
                                                </button>
                                                <AnimatePresence>
                                                {isServicesAccordionOpen && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden pl-4 mt-2 flex flex-col gap-4 text-base"
                                                    >
                                                        {servicesLinks.map(service => (
                                                            <a href="#" key={service.name} onClick={(e) => handleNav(e, service.page)} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-2">
                                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-secondary">
                                                                    <i className={`fas ${service.icon} text-sm`}></i>
                                                                </div>
                                                                <span>{service.name}</span>
                                                            </a>
                                                        ))}
                                                    </motion.div>
                                                )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    }
                                    const isActive = currentPage === link.page;
                                    return (
                                        <a 
                                            key={link.name} 
                                            href="#" 
                                            onClick={(e) => handleNav(e, link.page)}
                                            className={`py-2 border-b border-white/10 hover:text-secondary transition-colors ${isActive ? 'text-secondary' : 'text-white'}`}
                                        >
                                            {link.name}
                                        </a>
                                    )
                                })}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Overlay for mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>
        </header>
    );
};


interface FooterProps {
    onNavigate: (page: string, hash?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const socialLinks = [
        { icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/company/capital-media-partners-limited/' },
        { icon: 'fa-facebook-f', href: 'https://www.facebook.com/people/Capital-media-partners/61578754551198/' },
        { icon: 'fa-instagram', href: 'https://www.instagram.com/Capitalmediapartners/' },
        { icon: 'fa-twitter', href: 'https://x.com/CMP2028' }
    ];
    const quickLinks = [
        { name: 'Home', page: 'home' },
        { name: 'About', page: 'about' },
        { name: 'Services', page: 'home', hash: 'services' },
        { name: 'Contact', page: 'contact' },
        { name: 'Privacy Policy', page: 'privacy' },
        { name: 'Terms & Conditions', page: 'terms' },
    ];
    const servicesLinks = [
        { name: 'Business Advisory', page: 'service-business' },
        { name: 'Marketing & Print', page: 'service-marketing' },
        { name: 'Technology & AI', page: 'service-tech' },
        { name: 'Insurance Advisory', page: 'service-insurance' },
    ];
    return (
        <footer className="py-12 sm:py-20 px-4 sm:px-6 bg-dark-bg/80 backdrop-blur-md text-light-text border-t border-glass-border relative z-10 overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                {/* Column 1: Logo and Social */}
                <div className="space-y-6">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-3 group">
                         <img 
                            src={assets.logo}
                            alt="Capital Media Partners Logo" 
                            className="h-12 w-auto object-contain transition-transform group-hover:scale-110 duration-300"
                        />
                        <span className="text-xl font-bold text-light-text font-outfit">Capital Media Partners</span>
                    </a>
                    
                    <p className="text-sm font-medium text-secondary tracking-widest uppercase">
                        Be Seen. Be Trusted. Be Remembered.
                    </p>

                    <p className="text-muted-text max-w-xs text-sm leading-relaxed">
                        We help startups, SMEs, and enterprises succeed in New Zealand with tailored business advisory, innovative marketing solutions, and cost-effective strategies.
                    </p>
                    <div className="flex space-x-3">
                        {socialLinks.map(link => (
                            <Magnetic key={link.href}>
                                <Interactive><a href={link.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 text-muted-text rounded-md flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-md">
                                    <i className={`fab ${link.icon} text-lg`}></i>
                                </a></Interactive>
                            </Magnetic>
                        ))}
                    </div>
                </div>
                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-light-text">Quick Links</h3>
                    <ul className="space-y-4">
                        {quickLinks.map(link => (
                            <li key={link.name}>
                                <Interactive>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(link.page, link.hash); }} className="relative group text-muted-text hover:text-light-text transition-colors">
                                      <span>{link.name}</span>
                                      <span className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </a>
                                </Interactive>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Column 3: Our Services */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-light-text">Our Services</h3>
                    <ul className="space-y-4">
                        {servicesLinks.map(link => (
                            <li key={link.name}>
                                <Interactive>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(link.page); }} className="relative group text-muted-text hover:text-light-text transition-colors">
                                      <span>{link.name}</span>
                                      <span className="absolute bottom-0 left-0 w-full h-px bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </a>
                                </Interactive>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-16 border-t border-glass-border pt-8 text-center text-muted-text text-sm">
                <p>&copy; {new Date().getFullYear()} Capital Media Partners. All Rights Reserved.</p>
            </div>
        </footer>
    );
};


function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [page, setPage] = useState('home');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigate = (targetPage: string, hash?: string) => {
    if (page === targetPage && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPage(targetPage);
    if(hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
        window.scrollTo(0, 0);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const renderPage = () => {
    switch (page) {
        case 'home': return <HomePage onNavigate={navigate} />;
        case 'about': return <AboutPage onNavigate={navigate} />;
        case 'contact': return <ContactPage onNavigate={navigate} />;
        case 'privacy': return <PrivacyPolicyPage onNavigate={navigate} />;
        case 'terms': return <TermsConditionsPage onNavigate={navigate} />;
        case 'service-business': return <BusinessAdvisoryPage onNavigate={navigate} />;
        case 'service-marketing': return <MarketingPrintMediaPage onNavigate={navigate} />;
        case 'service-tech': return <TechnologyAIPage onNavigate={navigate} />;
        case 'service-insurance': return <InsuranceAdvisoryPage onNavigate={navigate} />;
        default: return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <CursorProvider>
      <div className="bg-dark-bg min-h-screen text-light-text font-sans selection:bg-primary/40">
        <CustomCursor />
        <ThreeCanvas mousePosition={mousePosition} />
        <ScrollToTop />
        <div className="relative z-10">
          <Header onNavigate={navigate} currentPage={page} />
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
          <Footer onNavigate={navigate} />
        </div>
      </div>
    </CursorProvider>
  );
}

export default App;
