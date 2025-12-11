
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../contexts/CursorContext';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Interactive: React.FC<{children: React.ReactElement<any>, variant?: 'link' | 'text'}> = ({ children, variant = 'link' }) => {
  const { setCursorVariant } = useCursor();
  return React.cloneElement(children, {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant('default'),
  });
};

interface TermsConditionsPageProps {
    onNavigate: (page: string, hash?: string) => void;
}

const TermsHero: React.FC = () => (
    <section className="relative pt-48 pb-24 bg-dark-bg text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                <div className="hero-stagger inline-flex items-center px-4 py-1.5 bg-white/5 border border-glass-border rounded-full mb-6">
                    <div className="w-6 h-6 bg-secondary rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-file-contract text-white text-sm"></i>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-secondary uppercase tracking-wider">Terms & Conditions</span>
                </div>
                <h1 className="hero-stagger text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Terms &</span>
                    <br />
                    <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Conditions</span>
                </h1>
                <Interactive variant="text">
                    <p className="hero-stagger text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                       Please read these terms and conditions carefully before using our website or engaging our services. By accessing our services, you agree to be bound by these terms.
                    </p>
                </Interactive>
            </div>
        </div>
    </section>
);

const TermsContent: React.FC = () => (
    <section className="bg-primary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="reveal-card bg-dark-bg/50 border border-glass-border p-8 sm:p-12 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="relative z-10 prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-secondary hover:prose-a:text-primary transition-colors">
                    <p className="text-sm text-gray-500 mb-8">Last updated: September 2025</p>
                    
                    {[
                        { title: '1. Acceptance of Terms', content: "By accessing and using the Capital Media Partners website and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service." },
                        { title: '2. Description of Service', content: "Capital Media Partners provides business advisory services, marketing and print media solutions, technology and AI solutions, and insurance advisory services to clients in New Zealand. Our services are provided on a professional basis and subject to these terms." },
                        { title: '4. Intellectual Property', content: "The service and its original content, features, and functionality are and will remain the exclusive property of Capital Media Partners and its licensors. The service is protected by copyright, trademark, and other laws." },
                        { title: '7. Limitation of Liability', content: "In no event shall Capital Media Partners, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service." },
                        { title: '10. Governing Law', content: "These Terms shall be interpreted and governed by the laws of New Zealand, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights." },
                        { title: '11. Changes to Terms', content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect." },
                    ].map(section => (
                        <React.Fragment key={section.title}>
                            <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                            <p className="mb-6">{section.content}</p>
                        </React.Fragment>
                    ))}

                    <h2 className="text-2xl font-bold mb-6">12. Contact Information</h2>
                    <p className="mb-4">If you have any questions about these Terms & Conditions, please contact us:</p>
                    <div className="bg-white/5 p-6 rounded-lg border border-glass-border mb-6 not-prose">
                        <p className="mb-2"><strong>Email:</strong> admin@capitalmediapartners.co.nz</p>
                        <p className="mb-2"><strong>Phone:</strong> +64 22 391 1005</p>
                        <p className="mb-2"><strong>Address:</strong> Auckland, New Zealand</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const TermsCTA: React.FC<{onNavigate: TermsConditionsPageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="py-16 sm:py-20 text-white bg-gradient-to-r from-primary/20 via-dark-bg to-secondary/20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Need Clarification?</h2>
        <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl mb-8 opacity-90">If you have questions about our terms and conditions, we're here to help.</p></Interactive>
        <div className="reveal-text flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic>
                <Interactive>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300 flex items-center">
                        Contact Us <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </a>
                </Interactive>
            </Magnetic>
        </div>
      </div>
    </section>
);

const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onNavigate }) => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-stagger", { y: 80, opacity: 0, stagger: 0.1, duration: 1.2, ease: "power3.out", delay: 0.2 });
            gsap.from('.reveal-card', { y: 100, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.reveal-card', start: "top 90%", toggleActions: "play none none reverse" } });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="overflow-hidden">
            <TermsHero />
            <TermsContent />
            <TermsCTA onNavigate={onNavigate} />
        </main>
    );
};

export default TermsConditionsPage;
