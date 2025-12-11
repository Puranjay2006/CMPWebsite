
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

interface PrivacyPolicyPageProps {
    onNavigate: (page: string, hash?: string) => void;
}

const PrivacyHero: React.FC = () => (
    <section className="relative pt-48 pb-24 bg-dark-bg text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] pointer-events-none -z-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                <div className="hero-stagger inline-flex items-center px-4 py-1.5 bg-white/5 border border-glass-border rounded-full mb-6">
                    <div className="w-6 h-6 bg-secondary rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-shield-alt text-white text-sm"></i>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-secondary uppercase tracking-wider">Privacy Policy</span>
                </div>
                <h1 className="hero-stagger text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Your Privacy
                    </span>
                    <br />Matters to Us
                </h1>
                <Interactive variant="text">
                    <p className="hero-stagger text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                        At Capital Media Partners, we are committed to protecting your privacy and ensuring the security of your personal information in accordance with New Zealand's Privacy Act 2020.
                    </p>
                </Interactive>
            </div>
        </div>
    </section>
);

const PrivacyContent: React.FC = () => (
    <section className="bg-primary/5 py-16 sm:py-20 lg:py-24 border-y border-glass-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="reveal-card bg-dark-bg/50 border border-glass-border p-8 sm:p-12 rounded-3xl backdrop-blur-md relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10 prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-secondary hover:prose-a:text-primary transition-colors">
                    <p className="text-sm text-gray-500 mb-8">Last updated: September 2025</p>
                    
                    <h2 className="text-2xl font-bold mb-6">1. Introduction</h2>
                    <p className="mb-6">Capital Media Partners Limited ("we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                    <p className="mb-6">This policy complies with the Privacy Act 2020 and other applicable New Zealand privacy laws. By using our services, you agree to the collection and use of information in accordance with this policy.</p>

                    <h2 className="text-2xl font-bold mb-6">2. Information We Collect</h2>
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    <p className="mb-4">We may collect the following types of personal information:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Name, email address, phone number, and company details when you contact us</li>
                        <li>Business information for advisory services</li>
                        <li>Payment information for services rendered</li>
                        <li>Communication records and correspondence</li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-4">Automatically Collected Information</h3>
                    <p className="mb-4">When you visit our website, we may automatically collect:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>IP address and location data</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on our site</li>
                        <li>Referral sources</li>
                    </ul>

                    <h2 className="text-2xl font-bold mb-6">3. How We Use Your Information</h2>
                    <p className="mb-4">We use your personal information for the following purposes:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>To provide business advisory, marketing, technology, and insurance services</li>
                        <li>To communicate with you about our services and respond to inquiries</li>
                        <li>To improve our website and services</li>
                        <li>To comply with legal obligations</li>
                        <li>To send marketing communications (with your consent)</li>
                    </ul>

                    <h2 className="text-2xl font-bold mb-6">4. Information Sharing and Disclosure</h2>
                    <p className="mb-6">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>With service providers who assist us in operating our business</li>
                        <li>When required by law or to protect our rights</li>
                        <li>In connection with a business transfer or merger</li>
                        <li>With your explicit consent</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-100 mb-6">5. Data Security</h2>
                    <p className="mb-6">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Secure data encryption</li>
                        <li>Access controls and authentication</li>
                        <li>Regular security assessments</li>
                        <li>Employee training on data protection</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">6. Your Rights</h2>
                    <p className="mb-4">Under the Privacy Act 2020, you have the following rights:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Right to access your personal information</li>
                        <li>Right to correct inaccurate information</li>
                        <li>Right to request deletion of your information</li>
                        <li>Right to withdraw consent for marketing communications</li>
                        <li>Right to complain to the Privacy Commissioner</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">11. Contact Us</h2>
                    <p className="mb-4">If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
                    <div className="bg-white/5 p-6 rounded-lg border border-glass-border mb-6">
                        <p className="mb-2"><strong>Email:</strong> admin@capitalmediapartners.co.nz</p>
                        <p className="mb-2"><strong>Phone:</strong> +64 22 391 1005</p>
                        <p className="mb-2"><strong>Address:</strong> Auckland, New Zealand</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const PrivacyCTA: React.FC<{onNavigate: PrivacyPolicyPageProps['onNavigate']}> = ({ onNavigate }) => (
    <section className="py-16 sm:py-20 text-white bg-gradient-to-r from-primary/20 via-dark-bg to-secondary/20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Have Questions About Privacy?</h2>
        <Interactive variant="text"><p className="reveal-text text-lg sm:text-xl mb-8 opacity-90">We're here to help. Contact us if you need clarification about our privacy practices.</p></Interactive>
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


const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const textReveals = gsap.utils.toArray('.reveal-text');
            textReveals.forEach((element: any) => {
                gsap.from(element, { y: 60, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" } });
            });
            gsap.from('.reveal-card', { y: 100, opacity: 0, rotationX: 10, duration: 1, ease: "back.out(1.2)", scrollTrigger: { trigger: '.reveal-card', start: "top 90%", toggleActions: "play none none reverse" } });
            
            const tl = gsap.timeline();
            tl.from(".hero-stagger", { y: 80, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.2 });

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="overflow-hidden">
            <PrivacyHero />
            <PrivacyContent />
            <PrivacyCTA onNavigate={onNavigate} />
        </main>
    );
};

export default PrivacyPolicyPage;
