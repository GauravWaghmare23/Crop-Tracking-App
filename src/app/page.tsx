import React from "react";

export default function Home() {
  return (
    <div className="font-sans text-gray-800 dark:text-gray-100 bg-lime-50 dark:bg-emerald-950 min-h-screen">
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-emerald-700 text-white animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-up-1">AgriTrace – Your Farming Companion</h1>
        <p className="max-w-3xl mb-8 text-lg animate-slide-up-2">Helping farmers across regions monitor crops, forecast weather, and enhance yields using technology built for real-world challenges.</p>
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up-3">
          <a href="#features" className="px-8 py-4 bg-lime-400 text-emerald-900 font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-lime-500 hover:scale-105 transform">Explore Features</a>
          <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-emerald-800 transition-colors duration-300">Contact Us</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto bg-green-100 rounded-3xl shadow-2xl mt-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">Features Farmers Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="p-4 rounded-full bg-emerald-100 mb-6 transition-all duration-300 group-hover:bg-lime-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM12 20a8 8 0 1 1 8-8A8 8 0 0 1 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-emerald-700">Real-Time Crop Tracking</h3>
            <p className="text-gray-600 leading-relaxed">Track crop health and growth with ease using a simple dashboard. Stay updated and make informed decisions every day.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="p-4 rounded-full bg-emerald-100 mb-6 transition-all duration-300 group-hover:bg-lime-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.9 12.3c-.6-.7-1.3-1-2.2-1.3l-.2-.1c-.5-.2-.9-.3-1.1-.6-.2-.2-.3-.5-.3-.9 0-.4.1-.7.4-.9.3-.2.6-.3 1-.3.5 0 .9.2 1.2.4.3.2.5.5.6.9l1.7-.5c-.2-1-.7-1.7-1.5-2.2-.8-.6-1.8-.8-2.9-.8-1.1 0-2.1.3-2.9.8s-1.4 1.3-1.6 2.2c-.3 1.1 0 2.1.7 2.9.6.7 1.3 1 2.2 1.3l.2.1c.5.2.9.3 1.1.6.2.2.3.5.3.9 0 .4-.1.7-.4.9-.3.2-.6.3-1 .3-.5 0-.9-.2-1.2-.4-.3-.2-.5-.5-.6-.9l-1.7.5c.2 1 .7 1.7 1.5 2.2.8.6 1.8.8 2.9.8 1.1 0 2.1-.3 2.9-.8s1.4-1.3 1.6-2.2c.3-1.1 0-2.1-.7-2.9Z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-emerald-700">Weather Alerts</h3>
            <p className="text-gray-600 leading-relaxed">Get timely weather forecasts to plan irrigation and protect your crops from adverse conditions before it's too late.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="p-4 rounded-full bg-emerald-100 mb-6 transition-all duration-300 group-hover:bg-lime-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20ZM12 20a8 8 0 1 1 8-8A8 8 0 0 1 12 20ZM12 11a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3ZM12 7a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3ZM12 15a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3Z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-emerald-700">Yield Predictions</h3>
            <p className="text-gray-600 leading-relaxed">Understand expected harvest outcomes to better manage your time, labor, and market strategies for improved profitability.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl mt-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">How It Works</h2>
        <div className="space-y-12">
          <div className="flex items-start space-x-6 transform transition-transform duration-300 hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-600 text-white rounded-full text-2xl font-bold shadow-lg">1</div>
            <div>
              <h3 className="font-bold text-2xl text-emerald-700 mb-2">Sign Up & Add Fields</h3>
              <p className="text-gray-600 leading-relaxed">Create your farmer account and register your fields with details like crop type, soil condition, and farming practices to start tracking right away.</p>
            </div>
          </div>
          <div className="flex items-start space-x-6 transform transition-transform duration-300 hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-600 text-white rounded-full text-2xl font-bold shadow-lg">2</div>
            <div>
              <h3 className="font-bold text-2xl text-emerald-700 mb-2">Monitor Growth & Weather</h3>
              <p className="text-gray-600 leading-relaxed">Stay informed with live updates on crop health and forecasts. Receive alerts and plan irrigation and pesticide application accordingly.</p>
            </div>
          </div>
          <div className="flex items-start space-x-6 transform transition-transform duration-300 hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-600 text-white rounded-full text-2xl font-bold shadow-lg">3</div>
            <div>
              <h3 className="font-bold text-2xl text-emerald-700 mb-2">Optimize Harvest & Profits</h3>
              <p className="text-gray-600 leading-relaxed">Use yield predictions and historical data to plan harvesting, reduce waste, and maximize returns from your efforts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 max-w-7xl mx-auto bg-green-100 rounded-3xl shadow-2xl mt-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">Benefits for Farmers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-3xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <h3 className="text-2xl font-bold mb-4 text-emerald-700">Save Time</h3>
            <p className="text-gray-600 leading-relaxed">Automate monitoring tasks, so you spend less time worrying about daily crop management and more time focusing on growth strategies.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <h3 className="text-2xl font-bold mb-4 text-emerald-700">Increase Productivity</h3>
            <p className="text-gray-600 leading-relaxed">Leverage insights from data to improve farming practices, predict issues early, and enhance crop health for better yields.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <h3 className="text-2xl font-bold mb-4 text-emerald-700">Reduce Losses</h3>
            <p className="text-gray-600 leading-relaxed">Stay ahead of unfavorable weather and pest problems with proactive alerts that help you protect your crops before damage occurs.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl mt-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">What Farmers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-lime-100 p-8 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <p className="text-gray-800 leading-relaxed italic">"AgriTrace has transformed how I farm. I now get alerts on time, and planning has become much easier. Highly recommended!"</p>
            <div className="mt-6 font-bold text-emerald-700 text-lg">– Ramesh Patil, Maharashtra</div>
          </div>
          <div className="bg-lime-100 p-8 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <p className="text-gray-800 leading-relaxed italic">"The weather forecasts are accurate, and the yield prediction helps me know when to harvest. I feel more in control of my farming."</p>
            <div className="mt-6 font-bold text-emerald-700 text-lg">– Sita Devi, Uttar Pradesh</div>
          </div>
          <div className="bg-lime-100 p-8 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <p className="text-gray-800 leading-relaxed italic">"The app is simple to use and provides real benefits. My farm's productivity has noticeably increased since I started using it."</p>
            <div className="mt-6 font-bold text-emerald-700 text-lg">– Ahmed Khan, Telangana</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 max-w-5xl mx-auto bg-green-100 rounded-3xl shadow-2xl mt-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-16">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg">
            <h3 className="font-bold text-xl text-emerald-700 mb-2">Is AgriTrace suitable for small farmers?</h3>
            <p className="text-gray-600 leading-relaxed">Yes! AgriTrace is designed to be accessible and useful for farmers of all sizes, from smallholder farmers to large agricultural operations.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg">
            <h3 className="font-bold text-xl text-emerald-700 mb-2">Do I need internet access daily?</h3>
            <p className="text-gray-600 leading-relaxed">While daily access helps keep you updated with the latest information, you can view offline reports and data whenever needed.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg">
            <h3 className="font-bold text-xl text-emerald-700 mb-2">Can I track multiple fields?</h3>
            <p className="text-gray-600 leading-relaxed">Absolutely! AgriTrace allows you to add multiple fields, each with its crop details, and view them all in a single dashboard.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-emerald-700 text-white text-center rounded-3xl shadow-2xl mt-16 mb-16">
        <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
        <p className="mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of farmers using AgriTrace to make farming smarter, easier, and more productive. Sign up today and transform your farming experience!</p>
        <a href="#" className="px-10 py-5 bg-lime-400 text-emerald-900 font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-lime-500 hover:scale-105 transform">Get Started</a>
      </section>
    </div>
  );
}
