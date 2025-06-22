const Footer = () => {
  return (
    <footer className="bg-[#333] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="footer-about">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🧠</span>
            <span className="text-2xl font-bold">MindHub</span>
          </div>
          <p className="text-white text-opacity-70 mb-6">
            Your mental wellness companion, helping you achieve balance and peace of mind through science-backed tools and community support.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all duration-300 hover:bg-[#10002b] hover:-translate-y-1">
              📱
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all duration-300 hover:bg-[#10002b] hover:-translate-y-1">
              💻
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all duration-300 hover:bg-[#10002b] hover:-translate-y-1">
              📘
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center transition-all duration-300 hover:bg-[#10002b] hover:-translate-y-1">
              🐦
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4 className="text-xl mb-6">Company</h4>
          <ul>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                About Us
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
               
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Press
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Blog
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4 className="text-xl mb-6">Resources</h4>
          <ul>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Help Center
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Privacy Policy
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Terms of Service
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4 className="text-xl mb-6">Connect</h4>
          <ul>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Therapists
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Partnerships
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Community
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white text-opacity-70 hover:text-white hover:pl-1 transition-all duration-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center pt-12 mt-8 border-t border-white border-opacity-10 text-white text-opacity-50 text-sm max-w-[1200px] mx-auto px-8">
        <p>&copy; 2025 MindHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;