
import React, { useLayoutEffect, useRef, useState } from 'react';
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

interface ContactPageProps {
    onNavigate: (page: string, hash?: string) => void;
}

const ContactHero: React.FC<{onNavigate: ContactPageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 lg:pb-32 overflow-hidden perspective-1000">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="container mx-auto py-10 sm:py-16 lg:py-20 px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <div className="hero-stagger inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <div className="w-6 h-6 bg-secondary rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-envelope text-white text-sm"></i>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-secondary uppercase">Get In Touch</span>
                    </div>

                    <h1 className="hero-stagger text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Contact
                        </span>
                        <br />Our
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                            &nbsp;Team
                        </span>
                    </h1>

                    <Interactive variant="text">
                        <p className="hero-stagger text-base sm:text-lg lg:text-xl mb-10 text-gray-300 leading-relaxed max-w-3xl lg:max-w-none mx-auto lg:mx-0">
                            Ready to transform your business? Get in touch with our expert team for personalized solutions in business advisory, marketing, AI technology, and insurance services.
                        </p>
                    </Interactive>

                    <div className="hero-stagger flex flex-col sm:flex-row gap-6 justify-center lg:justify-start w-full">
                        <div className="w-full sm:w-auto">
                            <Magnetic>
                                <Interactive>
                                    <a href="#contact-section" onClick={(e) => { e.preventDefault(); onNavigate('contact', 'contact-section'); }} className="group relative w-full text-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform transition-all duration-300 overflow-hidden flex items-center">
                                        Send Us a Message <i className="fas fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                    </a>
                                </Interactive>
                            </Magnetic>
                        </div>
                        <div className="w-full sm:w-auto">
                            <Magnetic>
                                 <Interactive>
                                    <a href="#contact-info" onClick={(e) => { e.preventDefault(); onNavigate('contact', 'contact-info'); }} className="w-full text-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl shadow-xl shadow-secondary/25 hover:shadow-secondary/40 transition-all duration-300 backdrop-blur-sm flex items-center">
                                    View Contact Details
                                    </a>
                                </Interactive>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex justify-center mt-8 lg:mt-0 perspective-1000">
                    <div className="hero-image relative transform-style-3d hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-700 ease-out">
                        <img src={assets.hero.contact} alt="Contact Capital Media Partners" className="w-full h-auto rounded-3xl shadow-2xl shadow-secondary/20 border border-glass-border object-cover" style={{ maxWidth: '600px' }} />
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl -z-10 opacity-60"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ContactFormSection: React.FC<{onNavigate: ContactPageProps['onNavigate']}> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        access_key: "82939ced-5a94-4046-8212-e3acb13e23dc",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        privacy: false,
        botcheck: "",
    });
    const [result, setResult] = useState<{message: string, state: 'loading' | 'success' | 'error'} | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult({ message: 'Please wait...', state: 'loading' });
        const form = new FormData(e.currentTarget);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: form
            });
            const json = await response.json();
            if (response.ok && json.success) {
                setResult({ message: json.message || 'Form submitted successfully', state: 'success' });
                (e.target as HTMLFormElement).reset();
                setFormData(prev => ({...prev, firstName: "", lastName: "", email: "", phone: "", company: "", service: "", message: "", privacy: false}));
            } else {
                throw new Error(json.message || 'Submission failed.');
            }
        } catch (error: any) {
            setResult({ message: error.message || 'Something went wrong!', state: 'error' });
        } finally {
            setTimeout(() => {
                setResult(null);
            }, 4000);
        }
    };

    const ResultBadge = () => {
        if (!result) return null;
        const badgeClasses = {
          loading: 'bg-blue-100 text-blue-800 border-blue-200',
          success: 'bg-green-100 text-green-800 border-green-200',
          error: 'bg-red-100 text-red-800 border-red-200'
        };
        const iconMap = {
          loading: 'fa-circle-notch fa-spin',
          success: 'fa-check-circle',
          error: 'fa-exclamation-circle'
        };
        return (
            <div className="mt-6 text-center">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm ${badgeClasses[result.state]}`}>
                    <i className={`fas ${iconMap[result.state]}`}></i>
                    <span>{result.message}</span>
                </span>
            </div>
        );
    }

    return (
        <section id="contact-section" className="bg-primary/5 py-16 lg:py-32 border-y border-glass-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        <span className="text-sm font-medium text-secondary uppercase tracking-wider">Send Us a Message</span>
                    </div>
                    <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">Let's Start a Conversation</h2>
                    <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-2xl mx-auto">Fill out the form below and our team will get back to you within 24 hours to discuss your business needs.</p></Interactive>
                </div>
                <div className="reveal-card bg-dark-bg/50 border border-glass-border p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <input type="hidden" name="access_key" value={formData.access_key} />
                        <div className="grid md:grid-cols-2 gap-6">
                            {[ {id: 'firstName', name: 'First Name', icon: 'fa-user'}, {id: 'lastName', name: 'Last Name', icon: 'fa-user'} ].map(field => (
                                <div key={field.id} className="relative">
                                    <label htmlFor={field.id} className="flex items-center text-sm font-medium text-gray-300 mb-2"><i className={`fas ${field.icon} text-primary mr-2`}></i>{field.name} *</label>
                                    <input type="text" id={field.id} name={field.id} required onChange={handleChange} className="w-full pl-4 pr-4 py-3 border border-glass-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/5 text-white" />
                                </div>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                             {[ {id: 'email', name: 'Email Address', icon: 'fa-envelope', type: 'email', required: true}, {id: 'phone', name: 'Phone Number', icon: 'fa-phone', type: 'tel', required: false} ].map(field => (
                                <div key={field.id} className="relative">
                                    <label htmlFor={field.id} className="flex items-center text-sm font-medium text-gray-300 mb-2"><i className={`fas ${field.icon} text-primary mr-2`}></i>{field.name} {field.required && '*'}</label>
                                    <input type={field.type} id={field.id} name={field.id} required={field.required} onChange={handleChange} className="w-full pl-4 pr-4 py-3 border border-glass-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/5 text-white" />
                                </div>
                            ))}
                        </div>
                        <div className="relative">
                            <label htmlFor="company" className="flex items-center text-sm font-medium text-gray-300 mb-2"><i className="fas fa-building text-primary mr-2"></i>Company/Organization</label>
                            <input type="text" id="company" name="company" onChange={handleChange} className="w-full pl-4 pr-4 py-3 border border-glass-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/5 text-white" />
                        </div>
                        <div className="relative">
                            <label htmlFor="service" className="flex items-center text-sm font-medium text-gray-300 mb-2"><i className="fas fa-cogs text-primary mr-2"></i>Service Interest *</label>
                            <select id="service" name="service" required onChange={handleChange} className="w-full pl-4 pr-4 py-3 border border-glass-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/5 text-white appearance-none">
                                <option value="">Select a service...</option>
                                <option value="business-advisory">Business Advisory Services</option>
                                <option value="marketing">Marketing & Print Media</option>
                                <option value="technology-ai">Technology & AI Solutions</option>
                                <option value="insurance">Insurance Advisory</option>
                                <option value="multiple">Multiple Services</option>
                                <option value="other">Other</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-4 top-10 text-gray-400 pointer-events-none"></i>
                        </div>
                        <div className="relative">
                            <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300 mb-2"><i className="fas fa-comment-dots text-primary mr-2"></i>Message *</label>
                            <textarea id="message" name="message" rows={6} required placeholder="Tell us about your project, goals, and how we can help..." onChange={handleChange} className="w-full pl-4 pr-4 py-3 border border-glass-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none bg-white/5 text-white"></textarea>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                            <input type="checkbox" id="privacy" name="privacy" required onChange={handleChange} className="mt-1 w-4 h-4 text-primary bg-transparent border-gray-500 rounded focus:ring-primary" />
                            <label htmlFor="privacy" className="text-sm text-gray-400 leading-relaxed">
                                I agree to the <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} className="text-primary hover:underline font-medium">Privacy Policy</a> and consent to being contacted regarding my inquiry. *
                            </label>
                        </div>
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                        <div className="text-center pt-6">
                            <Magnetic>
                                <button type="submit" className="group px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                                    <span className="flex items-center justify-center relative z-10">Send Message<i className="fas fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform duration-300"></i></span>
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                    <ResultBadge />
                </div>
            </div>
        </section>
    );
};

const ContactInfoSection: React.FC = () => (
    <section id="contact-info" className="relative bg-dark-bg py-16 lg:py-32 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-l from-secondary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16">
                 <div className="reveal-text inline-flex items-center px-6 py-2 rounded-full border border-secondary/50 bg-secondary/10 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-sm">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></span>
                    <span className="text-sm font-medium text-secondary uppercase tracking-wider">Contact Information</span>
                </div>
                <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Get In Touch</span>
                </h2>
                <Interactive variant="text"><p className="reveal-text text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    <span className="font-medium text-gray-200">Multiple ways to reach our team.</span> We're here to help you grow your business with our expert services.
                </p></Interactive>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                 {[
                    { icon: 'fa-phone', title: 'Phone', content: '+64 22 391 1005', href: 'tel:+64223911005', color: 'primary' },
                    { icon: 'fa-envelope', title: 'Email', content: 'info@capitalmediapartners.co.nz', href: 'mailto:info@capitalmediapartners.co.nz', color: 'secondary' },
                    { icon: 'fa-map-marker-alt', title: 'Location', content: 'Auckland, New Zealand', subtext: 'Serving all of NZ', color: 'primary' },
                ].map(item => (
                    <div key={item.title} className="reveal-card group text-center bg-white/[0.03] border border-glass-border p-8 rounded-3xl hover:transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        <div className="relative z-10">
                            <div className={`w-20 h-20 bg-${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                                <i className={`fas ${item.icon} text-white text-3xl`}></i>
                            </div>
                            <h3 className={`text-xl font-bold text-white mb-4 group-hover:text-${item.color} transition-colors`}>{item.title}</h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                {item.href ? <a href={item.href} className="text-lg font-semibold hover:text-primary transition-colors duration-300 break-all">{item.content}</a> : <span className="text-lg font-semibold text-gray-200">{item.content}</span>}
                            </p>
                            {item.subtext && <p className="text-sm text-gray-500">{item.subtext}</p>}
                        </div>
                    </div>
                 ))}
                 <div className="reveal-card group text-center bg-white/[0.03] border border-glass-border p-8 rounded-3xl hover:transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                            <i className="fas fa-share-alt text-white text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">Connect</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">Follow us on social media</p>
                        <div className="flex justify-center gap-4">
                            {[
                                { href: "https://www.linkedin.com/company/capital-media-partners-limited/", icon: "fa-linkedin-in" },
                                { href: "https://www.facebook.com/people/Capital-Media-Partners/61578754551198/", icon: "fa-facebook-f" },
                                { href: "https://www.instagram.com/Capitalmediapartners/", icon: "fa-instagram" },
                                { href: "https://x.com/CMP2028", icon: "fa-twitter" }
                            ].map(social => (
                                <Magnetic key={social.href}>
                                    <Interactive>
                                        <a href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-secondary hover:scale-110 transition-all duration-300 shadow-lg">
                                            <i className={`fab ${social.icon} text-lg`}></i>
                                        </a>
                                    </Interactive>
                                </Magnetic>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
            <ContactHero onNavigate={onNavigate} />
            <ContactFormSection onNavigate={onNavigate} />
            <ContactInfoSection />
        </main>
    );
};

export default ContactPage;
