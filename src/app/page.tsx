"use client";

import React, { useState } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

interface WorkflowStepProps {
  number: string;
  title: string;
  description: string;
}

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans text-gray-800 dark:text-gray-100 bg-lime-50 dark:bg-emerald-950 min-h-screen">
      <section
        className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 relative pt-16"
        style={{
          backgroundImage: `
      linear-gradient(to bottom, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0.3)),
      linear-gradient(to top, rgba(107, 114, 128, 0.3), rgba(16, 185, 129, 0.3)),
      url('https://example.com/grass-and-farm.jpg')
    `,
          backgroundSize: "cover, cover, cover",
          backgroundPosition: "center, center, center",
        }}
      >


        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg animate-slide-up-1">
            AgriTrace – Trust at Every Step
          </h1>
          <p className="text-lg text-lime-100 drop-shadow-md animate-slide-up-2">
            Empowering farmers and consumers with blockchain-backed
            transparency, fair pricing, and safer food supply chains.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up-3">
            <button
              onClick={() => scrollToSection("features")}
              className="px-8 py-4 bg-lime-400 text-emerald-900 font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-lime-500 hover:scale-105 transform"
            >
              Explore Features
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-emerald-800 transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-4 max-w-7xl mx-auto bg-green-100 rounded-3xl shadow-2xl mt-16 animate-fade-in"
      >
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">
          Features that Empower
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM12 20a8 8 0 1 1 8-8A8 8 0 0 1 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
            title="Real-Time Tracking"
            description="Farmers log crop details through smartphones or kiosks. Data is securely stored on IPFS with unique identifiers, ensuring tamper-proof records."
          />
          <FeatureCard
            icon="M14.9 12.3c-.6-.7-1.3-1-2.2-1.3l-.2-.1c-.5-.2-.9-.3-1.1-.6-.2-.2-.3-.5-.3-.9 0-.4.1-.7.4-.9.3-.2.6-.3 1-.3.5 0 .9.2 1.2.4.3.2.5.5.6.9l1.7-.5c-.2-1-.7-1.7-1.5-2.2-.8-.6-1.8-.8-2.9-.8-1.1 0-2.1.3-2.9.8s-1.4 1.3-1.6 2.2c-.3 1.1 0 2.1.7 2.9.6.7 1.3 1 2.2 1.3l.2.1c.5.2.9.3 1.1.6.2.2.3.5.3.9 0 .4-.1.7-.4.9-.3.2-.6.3-1 .3-.5 0-.9-.2-1.2-.4-.3-.2-.5-.5-.6-.9l-1.7.5c.2 1 .7 1.7 1.5 2.2.8.6 1.8.8 2.9.8 1.1 0 2.1-.3 2.9-.8s1.4-1.3 1.6-2.2c.3-1.1 0-2.1-.7-2.9Z"
            title="Verified Distribution"
            description="Distributors scan QR codes, add transport and pricing details, and upload verified data onto IPFS, ensuring consistent and secure tracking."
          />
          <FeatureCard
            icon="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20ZM12 20a8 8 0 1 1 8-8A8 8 0 0 1 12 20ZM12 11a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3ZM12 7a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3ZM12 15a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3Z"
            title="Consumer Confidence"
            description="Retailers share verified produce data through QR codes. Consumers scan and access blockchain records, ensuring safe, fair, and transparent purchases."
          />
        </div>
      </section>

      {/* How It Works Section with Flow Details */}
      <section
        id="how-it-works"
        className="py-24 px-4 max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl mt-16 animate-fade-in"
      >
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">
          How Our System Works
        </h2>
        <div className="space-y-12">
          <WorkflowStep
            number="1"
            title="Farmer's Input"
            description="Farmers log crop details including type, harvest date, and quality. Data is uploaded securely to IPFS via Infura API, generating a unique CID."
          />
          <WorkflowStep
            number="2"
            title="QR Code Creation"
            description="A QR code embedding the CID is generated, allowing distributors to access verified crop data without additional tools or authentication."
          />
          <WorkflowStep
            number="3"
            title="Distributor Verification"
            description="Distributors scan the QR, add transport and pricing details, and store the updated data on IPFS, creating a new CID and QR for retailers."
          />
          <WorkflowStep
            number="4"
            title="Retailer Update"
            description="Retailers scan distributor QR, verify data, add inventory details, and generate a new QR linking to tamper-proof records."
          />
          <WorkflowStep
            number="5"
            title="Consumer Transparency"
            description="Consumers scan the QR to view complete transaction history on the blockchain—timestamps, locations, and pricing—all secured and immutable."
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-24 px-4 max-w-7xl mx-auto bg-gradient-to-r from-green-100 to-lime-100 rounded-3xl shadow-2xl mt-16 animate-fade-in"
      >
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">
          Benefits for All
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <BenefitCard
            icon="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            title="Fair Pricing"
            description="Transparent records empower farmers to negotiate better rates and consumers to purchase confidently."
          />
          <BenefitCard
            icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            title="Decentralized Trust"
            description="Immutable records stored across networks prevent manipulation and fraud, building trust in every transaction."
          />
          <BenefitCard
            icon="M13 10V3L4 14h7v7l9-11h-7z"
            title="Accessible Technology"
            description="User-friendly interfaces and affordable setups ensure that farmers everywhere can benefit from this technology."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-24 px-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl mt-16 animate-fade-in"
      >
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-50 p-8 rounded-3xl shadow-md text-center">
            <p className="text-gray-600 mb-4">
              "AgriTrace has revolutionized how we track our crops. The
              transparency is unmatched!"
            </p>
            <p className="font-bold text-emerald-800">- Farmer John</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl shadow-md text-center">
            <p className="text-gray-600 mb-4">
              "As a consumer, I feel confident knowing the origin of my food.
              Great platform!"
            </p>
            <p className="font-bold text-emerald-800">- Consumer Sarah</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl shadow-md text-center">
            <p className="text-gray-600 mb-4">
              "Easy to use and secure. AgriTrace is the future of agriculture."
            </p>
            <p className="font-bold text-emerald-800">- Distributor Mike</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-4 bg-gradient-to-r from-emerald-700 to-green-700 text-white text-center rounded-3xl shadow-2xl mt-16 mb-16 animate-fade-in"
      >
        <h2 className="text-4xl font-bold mb-8">Join the Movement</h2>
        <p className="mb-10 max-w-2xl mx-auto leading-relaxed">
          Empower your farm, build trust in the food supply, and ensure fair
          transactions. Start using AgriTrace today and transform agriculture
          for the better.
        </p>
        <button
          onClick={() => scrollToSection("features")}
          className="px-10 py-5 bg-lime-400 text-emerald-900 font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-lime-500 hover:scale-105 transform"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">AgriTrace</h3>
          <p className="mb-4">
            Building trust in agriculture through blockchain technology.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-lime-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              LinkedIn
            </a>
          </div>
          <p className="mt-4">&copy; 2023 AgriTrace. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4 text-emerald-800">
              Contact Us
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 border border-gray-300 rounded-lg h-32"
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
      <div className="p-4 rounded-full bg-emerald-100 mb-6 transition-all duration-300 group-hover:bg-lime-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-emerald-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={icon} />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-emerald-700">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="flex items-start space-x-6 transform transition-transform duration-300 hover:scale-105">
      <div className="w-16 h-16 flex items-center justify-center bg-emerald-600 text-white rounded-full text-2xl font-bold shadow-lg">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-2xl text-emerald-700 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform group">
      <div className="p-4 rounded-full bg-emerald-100 mb-6 transition-all duration-300 group-hover:bg-lime-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-emerald-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={icon} />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-emerald-700">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
