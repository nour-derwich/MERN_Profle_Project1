import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-700" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white">Let's Work Together</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block">Data into Insights?</span>
          </h2>
          
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's collaborate to build intelligent AI solutions that drive your business forward. 
            Whether it's machine learning, deep learning, or data analytics, I'm here to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="mailto:Keraani.naceur@gmail.com"
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center space-x-3 shadow-xl group"
            >
              <FiMail className="text-xl" />
              <span>Send Email</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="https://api.whatsapp.com/send?phone=0021695881709&text=Hello, more information!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all duration-300 hover:scale-105 flex items-center space-x-3 shadow-xl group"
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp Me</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FiMail className="text-3xl text-white mb-3 mx-auto" />
              <div className="text-white/90 font-medium mb-1">Email</div>
              <div className="text-white text-sm">Keraani.naceur@gmail.com</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FiPhone className="text-3xl text-white mb-3 mx-auto" />
              <div className="text-white/90 font-medium mb-1">Phone</div>
              <div className="text-white text-sm">+216 95 88 17 09</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FiMapPin className="text-3xl text-white mb-3 mx-auto" />
              <div className="text-white/90 font-medium mb-1">Location</div>
              <div className="text-white text-sm">Tunis, Tunisia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default CallToAction;