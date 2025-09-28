// pages/Home.tsx (or app/page.tsx)

"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import ScrollToPlugin

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Component Prop Types ---
// These are kept here for components that are part of the Home content
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  linkText: string;
}

interface WorkflowStepProps {
  number: string;
  title: string;
  description: string;
}

interface ImpactStoryProps {
  title: string;
  subtitle: string;
  progress: number;
  goal: string;
  imageAlt: string;
}

// --- Reusable UI Components (Kept for completeness) ---

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText,
}) => {
    return (
        <div className="feature-card bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl transform group relative overflow-hidden">
        {/* Icon/Visual Area */}
        <div className="absolute top-0 left-0 p-4 opacity-5">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-[#51CC6E]" 
            viewBox="0 0 24 24"
            fill="currentColor"
            >
            <path d={icon} />
            </svg>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
            <div className="mb-4">
            <p className="text-sm font-semibold uppercase text-gray-500">{linkText.split(' ')[0]}</p>
            <h3 className="text-2xl font-extrabold mt-1 text-[#1A1A1A]">{title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
        </div>

        {/* Footer/Action */}
        <div className="flex justify-end items-center mt-6">
            <button className="flex items-center space-x-2 text-[#51CC6E] font-semibold transition-all duration-300 group-hover:text-[#1A1A1A]">
            <span className="text-lg">{linkText}</span>
            <div className="w-8 h-8 flex items-center justify-center border-2 border-[#51CC6E] rounded-full transition-all duration-300 group-hover:bg-[#51CC6E] group-hover:text-white">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                />
                </svg>
            </div>
            </button>
        </div>
        </div>
    );
};

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
}) => {
    return (
        <div className="flex items-start space-x-6 transform transition-transform duration-300 workflow-step">
        <div className="w-16 h-16 flex items-center justify-center bg-[#51CC6E] text-white rounded-full text-2xl font-extrabold shadow-xl flex-shrink-0">
            {number}
        </div>
        <div>
            <h3 className="font-extrabold text-2xl text-[#1A1A1A] mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        </div>
    );
};

const ImpactStory: React.FC<ImpactStoryProps> = ({
  title,
  subtitle,
  progress,
  goal,
  imageAlt,
}) => {
    return (
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden story-card">
        {/* Image Placeholder (Mocking the central image in the Inspiring Journeys section) */}
        <div className="h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Image: {imageAlt}</p>
        </div>
        
        {/* Donate Button (Mocking the button on the image) */}
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 bg-[#51CC6E] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-green-600">
            VIEW TRACE
        </button>

        {/* Text Content */}
        <div className="p-6">
            <h4 className="text-lg font-bold text-[#1A1A1A]">{title}</h4>
            <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

            {/* Progress Bar (Mocking the progress bar in the image) */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
                className="bg-[#51CC6E] h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
            <span>{goal}</span>
            <span className="font-bold text-[#51CC6E]">{progress}%</span>
            </div>
        </div>
        </div>
    );
};

// --- Main Home Component ---

export default function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    // Clean up all ScrollTriggers on unmount
    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    // --- Global Animations Setup ---

    // Hero Content Fade In
    gsap.fromTo(
      ".hero-content-item",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.3, duration: 1.2, ease: "power3.out" }
    );

    // Section Headers Fade In
    gsap.utils.toArray("h2").forEach((heading) => {
        gsap.from(heading as Element, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: heading as Element,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    });

    // Workflow Section Animations (Staggered Fade In)
    gsap.utils.toArray(".workflow-step").forEach((step, i) => {
      gsap.from(step as Element, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power2.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: step as Element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Card Fade In (Feature, Impact, Testimonial)
    gsap.utils.toArray(".feature-card, .story-card, .testimonial-card").forEach((card) => {
      gsap.from(card as Element, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card as Element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle Hover Animation
      const targetCard = card as HTMLElement;
      // Capture initial style attributes for safe reset
      const initialShadow = targetCard.style.boxShadow; 

      targetCard.addEventListener("mouseenter", () => {
        gsap.to(targetCard, {
          scale: 1.02,
          boxShadow: "0 20px 40px -10px rgba(81, 204, 110, 0.2)", // Green shadow on hover
          duration: 0.3,
          ease: "power1.inOut",
        });
      });
      targetCard.addEventListener("mouseleave", () => {
        gsap.to(targetCard, {
          scale: 1,
          boxShadow: initialShadow || "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power1.inOut",
        });
      });
    });
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-[#FAF7F0] min-h-screen relative overflow-x-hidden">
      
      {/* Note: The Navbar is REMOVED here. It should be rendered in a layout file. */}

      {/* Hero Section (Simplified, welcoming, high contrast) */}
      <section
        className="min-h-[80vh] w-full flex flex-col justify-center items-center text-center px-4 relative pt-24 pb-16 bg-[#F4F1E9]"
      >
        <div className="relative z-10 max-w-4xl hero-content">
          <div className="hero-content-item">
            <p className="text-lg font-semibold uppercase text-[#51CC6E] mb-3">Blockchain for a Greener Future</p>
          </div>
          <h1 className="hero-content-item text-5xl md:text-7xl font-extrabold mb-6 text-[#1A1A1A]">
            AgriTrace is <span className="text-[#51CC6E]">Trust</span>
          </h1>
          <p className="hero-content-item text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering farmers and consumers with **transparent** and **fair** food supply chains, secured by blockchain technology.
          </p>
          <div className="hero-content-item flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={() => scrollToSection("features")}
              className="px-8 py-4 bg-[#51CC6E] text-white font-extrabold text-lg rounded-full shadow-xl transition-all duration-300 hover:bg-green-600 hover:scale-[1.03] transform"
            >
              Explore Traceability
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="px-8 py-4 border-2 border-[#8A847B] text-[#1A1A1A] font-extrabold text-lg rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              See Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Features Section (What We Do) */}
      <section
        id="features"
        className="py-24 px-4 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#1A1A1A] mb-16">
          Providing Trust and Transparency
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM12 20a8 8 0 1 1 8-8A8 8 0 0 1 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
            title="Farm Registration"
            description="Farmers contribute today to log initial crop data, harvest methods, and supply-chain readiness documentation."
            linkText="Start Registration"
          />
          <FeatureCard
            icon="M14.9 12.3c-.6-.7-1.3-1-2.2-1.3l-.2-.1c-.5-.2-.9-.3-1.1-.6-.2-.2-.3-.5-.3-.9 0-.4.1-.7.4-.9.3-.2.6-.3 1-.3.5 0 .9.2 1.2.4.3.2.5.5.6.9l1.7-.5c-.2-1-.7-1.7-1.5-2.2-.8-.6-1.8-.8-2.9-.8-1.1 0-2.1.3-2.9.8s-1.4 1.3-1.6 2.2c-.3 1.1 0 2.1.7 2.9.6.7 1.3 1 2.2 1.3l.2.1c.5.2.9.3 1.1.6.2.2.3.5.3.9 0 .4-.1.7-.4.9-.3.2-.6.3-1 .3-.5 0-.9-.2-1.2-.4-.3-.2-.5-.5-.6-.9l-1.7.5c.2 1 .7 1.7 1.5 2.2.8.6 1.8.8 2.9.8 1.1 0 2.1-.3 2.9-.8s1.4-1.3 1.6-2.2c.3-1.1 0-2.1-.7-2.9Z"
            title="Get Verified Trace"
            description="Access vital resources, supply chain financial aid, and verifiable journey data for your produce in time of need."
            linkText="View Resources"
          />
          <FeatureCard
            icon="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20ZM12 20a8 8 0 1 1 8-8A8 8 0 0 1 12 20ZM12 11a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3ZM12 7a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3ZM12 15a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3Z"
            title="Join Our Network"
            description="Join our team of distribution partners and retailers to support secure supply chains and make a positive impact."
            linkText="Join Our Team"
          />
        </div>
      </section>

      {/* Inspiring Journeys/Impact Section */}
      <section
        id="impact"
        className="py-24 px-4 bg-[#F4F1E9] w-full"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-[#1A1A1A] mb-4">
            Inspiring Journeys
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Of Transparent Pricing and Fair Trade
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactStory
              title="John Smith, Farmer"
              subtitle="Harvested in Stage 2 Fair Trade Program"
              progress={72}
              goal="$16,545.15 Raised"
              imageAlt="Happy farmer with crops"
            />
            <ImpactStory
              title="Local Produce Co."
              subtitle="Secured Funding for Blockchain Integration"
              progress={90}
              goal="$120,000 Goal"
              imageAlt="Distributor warehouse"
            />
            <ImpactStory
              title="Green Grocers Retail"
              subtitle="Achieved 100% Traceability"
              progress={100}
              goal="100% Traceability"
              imageAlt="Retail shelf with QR codes"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section with Flow Details */}
      <section
        id="how-it-works"
        className="py-24 px-4 max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#1A1A1A] mb-16">
          How Our System Works
        </h2>
        <div className="space-y-12 relative">
          {/* Vertical Line for Flow Visual */}
          <div className="absolute left-7 top-0 bottom-0 w-1 bg-gray-200 hidden sm:block"></div>
          
          <WorkflowStep
            number="1"
            title="Farmer's Input & CID"
            description="Farmers log crop details (type, harvest, quality) via a mobile app. Data is uploaded securely to **IPFS** via an API, generating a unique **Content Identifier (CID)**."
          />
          <WorkflowStep
            number="2"
            title="QR Code Initialization"
            description="A printable QR code embedding the CID is generated, which is physically attached to the produce packaging for distributors to scan and verify."
          />
          <WorkflowStep
            number="3"
            title="Distributor Verification & Update"
            description="Distributors scan the QR, add transport/pricing details, and store the updated data on IPFS, creating a **new CID** and a QR for retailers."
          />
          <WorkflowStep
            number="4"
            title="Retailer Data Finalization"
            description="Retailers verify the distributor's data, add final inventory details, and generate the consumer-facing QR linking to the immutable record."
          />
          <WorkflowStep
            number="5"
            title="Consumer Transparency"
            description="Consumers scan the in-store QR to view the complete transaction history on the blockchain—timestamps, locations, and pricing—ensuring a secure and transparent purchase."
          />
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section
        id="contact"
        className="py-24 px-4 bg-[#51CC6E] text-white text-center rounded-3xl shadow-2xl max-w-7xl mx-auto my-16"
      >
        <h2 className="text-5xl font-extrabold mb-8">
          Join Us In Making A Difference
        </h2>
        <p className="mb-10 max-w-3xl mx-auto text-lg leading-relaxed text-green-100">
          Empower your farm, build trust in the food supply, and ensure fair
          transactions. Start using AgriTrace today and transform agriculture for the better.
        </p>
        <div className="flex justify-center gap-6">
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-5 bg-white text-[#51CC6E] font-extrabold text-lg rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 transform"
            >
                VOLUNTEER NOW (Start Trace)
            </button>
            <button
                onClick={() => scrollToSection("features")}
                className="px-10 py-5 border-2 border-white text-white font-extrabold text-lg rounded-full hover:bg-white/10 transition-colors duration-300"
            >
                LEARN MORE
            </button>
        </div>
      </section>

      {/* Testimonials Section (Matching the news/updates structure) */}
      <section
        id="testimonials"
        className="py-24 px-4 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#1A1A1A] mb-16">
          Updates From AgriTrace
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg testimonial-card">
            <p className="text-gray-600 mb-4 leading-relaxed">
              "AgriTrace has revolutionized how we track our crops. The
              transparency is unmatched, and our profits have increased by 15%."
            </p>
            <p className="font-bold text-[#51CC6E]">- Farmer Adam</p>
            <p className="text-sm text-gray-400 mt-2">June 12, 2025</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg testimonial-card">
            <p className="text-gray-600 mb-4 leading-relaxed">
              "Our team expands to **50 verified distributors** across the region, securing better trade for smallholder farms."
            </p>
            <p className="font-bold text-[#51CC6E]">- Team Update</p>
            <p className="text-sm text-gray-400 mt-2">June 5, 2025</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg testimonial-card">
            <p className="text-gray-600 mb-4 leading-relaxed">
              "Consumers can now access **full environmental impact reports** directly from the QR code at our retail outlets."
            </p>
            <p className="font-bold text-[#51CC6E]">- Retail Partner</p>
            <p className="text-sm text-gray-400 mt-2">June 2, 2025</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg testimonial-card">
            <p className="text-gray-600 mb-4 leading-relaxed">
              "A new feature allows for **instant cryptocurrency payment** to farmers upon successful harvest verification. The future is here."
            </p>
            <p className="font-bold text-[#51CC6E]">- Dev Log</p>
            <p className="text-sm text-gray-400 mt-2">May 29, 2025</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-extrabold mb-4">Agri<span className="text-[#51CC6E]">Trace</span></h3>
          <p className="mb-8 max-w-md mx-auto text-gray-400">
            Building trust in agriculture through decentralized ledger technology.
          </p>
          <div className="flex justify-center space-x-6 text-gray-300">
            <a href="#" className="hover:text-[#51CC6E] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#51CC6E] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#51CC6E] transition-colors">
              Support
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            &copy; 2024 AgriTrace. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full transform modal-content">
            <h3 className="text-3xl font-extrabold mb-6 text-[#1A1A1A]">
              Get In Touch
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#51CC6E] focus:ring-1 focus:ring-[#51CC6E] transition-all duration-200 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#51CC6E] focus:ring-1 focus:ring-[#51CC6E] transition-all duration-200 outline-none"
              />
              <textarea
                placeholder="Message"
                className="w-full p-4 border-2 border-gray-200 rounded-xl h-32 focus:border-[#51CC6E] focus:ring-1 focus:ring-[#51CC6E] transition-all duration-200 outline-none"
              ></textarea>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#51CC6E] text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}