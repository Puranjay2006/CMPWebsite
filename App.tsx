
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
import SearchOverlay from './components/SearchOverlay';
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
    onToggleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onToggleSearch }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);
    
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, page: string, hash?: string) => {
        e.preventDefault();
        if (page === 'company-directories') {
            setIsDirectoryModalOpen(true);
            setIsMobileMenuOpen(false);
            return;
        }
        onNavigate(page, hash);
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', page: 'home' },
        { name: 'About', page: 'about' },
        { name: 'Services', page: 'home', hash: 'services' },
        { name: 'Business', page: 'company-directories' },
        { name: 'Contact', page: 'contact' },
    ];
    
    const servicesSubLinks = [
        { name: 'Business Advisory', page: 'service-business', icon: 'fa-business-time' },
        { name: 'Marketing & Print', page: 'service-marketing', icon: 'fa-print' },
        { name: 'Technology & AI', page: 'service-tech', icon: 'fa-microchip' },
        { name: 'Insurance Advisory', page: 'service-insurance', icon: 'fa-shield-alt' },
    ];

    useEffect(() => {
        if(isMobileMenuOpen || isDirectoryModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen, isDirectoryModalOpen]);

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
                <div className="hidden lg:flex items-center gap-8">
                    <nav className="flex items-center space-x-8">
                        {navLinks.map((link) => {
                            // Calculate active state
                            let isEffectiveActive = false;
                            if (link.name === 'Services') {
                                isEffectiveActive = ['service-business', 'service-marketing', 'service-tech', 'service-insurance'].includes(currentPage);
                            } else {
                                isEffectiveActive = currentPage === link.page;
                            }

                            if (link.name === 'Services') {
                                return (
                                    <div 
                                        key={link.name}
                                        className="relative group" 
                                        onMouseEnter={() => setHoveredLink('Services')} 
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <div className="relative py-2">
                                            <Interactive>
                                                <a 
                                                    href={link.hash ? `#${link.hash}` : '#'} 
                                                    onClick={(e) => handleNav(e, link.page, link.hash)} 
                                                    className={`text-sm font-medium hover:text-secondary transition-colors duration-300 uppercase tracking-widest flex items-center gap-1 ${isEffectiveActive ? 'text-secondary' : 'text-light-text'}`}
                                                >
                                                    {link.name} <i className="fas fa-chevron-down text-[10px] opacity-70 transition-transform group-hover:rotate-180"></i>
                                                </a>
                                            </Interactive>
                                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${isEffectiveActive ? 'scale-x-100' : ''}`}></span>
                                        </div>

                                        <AnimatePresence>
                                            {hoveredLink === 'Services' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full -left-12 w-64 bg-[#0F172A] border border-glass-border rounded-xl shadow-2xl p-2 overflow-hidden z-50 backdrop-blur-xl"
                                                >
                                                    {servicesSubLinks.map(sub => (
                                                        <Interactive key={sub.name}>
                                                            <a 
                                                                href="#"
                                                                onClick={(e) => handleNav(e, sub.page)}
                                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                                            >
                                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                                                    <i className={`fas ${sub.icon} text-xs`}></i>
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-300 group-hover/item:text-white">{sub.name}</span>
                                                            </a>
                                                        </Interactive>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <Magnetic key={link.name}>
                                    <div className="relative group">
                                        <Interactive>
                                            <a href={link.hash ? `#${link.hash}` : '#'} onClick={(e) => handleNav(e, link.page, link.hash)} className={`text-sm font-medium hover:text-secondary transition-colors duration-300 uppercase tracking-widest ${isEffectiveActive ? 'text-secondary' : 'text-light-text'}`}>
                                                {link.name}
                                            </a>
                                        </Interactive>
                                        <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-secondary transform transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${isEffectiveActive ? 'scale-x-100' : ''}`}></span>
                                    </div>
                                </Magnetic>
                            );
                        })}
                    </nav>

                    {/* Search Trigger Desktop */}
                    <Magnetic>
                        <Interactive>
                            <button 
                                onClick={onToggleSearch}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-light-text hover:text-secondary transition-all border border-transparent hover:border-glass-border"
                                aria-label="Search"
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </Interactive>
                    </Magnetic>
                </div>

                {/* Mobile Controls (Search + Menu) */}
                <div className="lg:hidden flex items-center gap-4 text-light-text">
                    <button onClick={onToggleSearch} className="w-10 h-10 flex items-center justify-center">
                        <i className="fas fa-search text-xl"></i>
                    </button>
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
                                    const isActive = currentPage === link.page;
                                    // For mobile, standard active check is fine, though we could refine Services too.
                                    
                                    if (link.name === 'Services') {
                                        return (
                                            <div key={link.name} className="flex flex-col">
                                                <a 
                                                    href={`#${link.hash}`} 
                                                    onClick={(e) => handleNav(e, link.page, link.hash)}
                                                    className={`py-2 border-b border-white/10 hover:text-secondary transition-colors flex justify-between items-center ${isActive ? 'text-secondary' : 'text-white'}`}
                                                >
                                                    {link.name}
                                                </a>
                                                <div className="pl-4 mt-2 flex flex-col space-y-3 border-l border-white/10">
                                                    {servicesSubLinks.map(sub => (
                                                        <a
                                                            key={sub.name}
                                                            href="#"
                                                            onClick={(e) => handleNav(e, sub.page)}
                                                            className="text-base text-gray-400 hover:text-secondary transition-colors"
                                                        >
                                                            {sub.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <a 
                                            key={link.name} 
                                            href={link.hash ? `#${link.hash}` : '#'} 
                                            onClick={(e) => handleNav(e, link.page, link.hash)}
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

            {/* Business Directory Modal (Revamped) */}
            <AnimatePresence>
                {isDirectoryModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDirectoryModalOpen(false)}
                            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-[#0F172A] border border-glass-border p-1 overflow-hidden rounded-3xl shadow-2xl max-w-lg w-full z-10"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <div className="bg-dark-bg/60 backdrop-blur-xl rounded-[22px] p-8 sm:p-10 relative overflow-hidden">
                                {/* Close Button */}
                                <button 
                                    onClick={() => setIsDirectoryModalOpen(false)}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                                >
                                    <i className="fas fa-times"></i>
                                </button>

                                <div className="flex flex-col items-center text-center">
                                    {/* Animated Icon */}
                                    <div className="relative w-20 h-20 mb-6">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                                        />
                                        <motion.div 
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-2 rounded-full border-2 border-dashed border-secondary/30"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <i className="fas fa-network-wired text-3xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary"></i>
                                        </div>
                                    </div>

                                    <motion.h3 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-3xl font-bold text-white mb-3"
                                    >
                                        Building the Hub
                                    </motion.h3>
                                    
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-gray-300 mb-8 leading-relaxed"
                                    >
                                        We are curating an exclusive directory of New Zealand's most trusted businesses. A place to connect, collaborate, and grow together.
                                    </motion.p>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="w-full"
                                    >
                                        <div className="px-6 py-4 bg-white/5 border border-glass-border rounded-xl">
                                             <p className="text-sm text-gray-400">
                                                Expected Launch: <span className="text-secondary font-bold">Late 2025</span>
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
        <SearchOverlay 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          onNavigate={navigate} 
        />
        <div className="relative z-10">
          <Header 
            onNavigate={navigate} 
            currentPage={page} 
            onToggleSearch={() => setIsSearchOpen(true)}
          />
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
