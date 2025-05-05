import React, { useEffect } from 'react';

const Header = () => {
    useEffect(() => {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        const toggleMobileMenu = () => {
            mobileMenu.classList.toggle('hidden');
        };

        mobileMenuButton.addEventListener('click', toggleMobileMenu);

        // Active nav link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        const handleScroll = () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listeners on component unmount
        return () => {
            mobileMenuButton.removeEventListener('click', toggleMobileMenu);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <nav className="fixed w-full bg-darkBlue/50 backdrop-blur-md z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold gradient-text">Clara.<span className="text-white">dev</span></a>

        <div className="hidden md:flex space-x-8">
          <a href="#home" className="nav-link active hover:text-pink transition-colors">Home</a>
          <a href="#about" className="nav-link hover:text-pink transition-colors">About Me</a>
          <a href="#projects" className="nav-link hover:text-pink transition-colors">Project</a>
          <a href="#skills" className="nav-link hover:text-pink transition-colors">Skills</a>
          <a href="#contact" className="nav-link hover:text-pink transition-colors">Contact</a>
        </div>

        <button id="mobile-menu-button" className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <div id="mobile-menu" className="hidden md:hidden bg-darkBlue/5 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a href="#home" className="nav-link active py-2 hover:text-pink transition-colors">Home</a>
          <a href="#about" className="nav-link py-2 hover:text-pink transition-colors">About Me</a>
          <a href="#projects" className="nav-link py-2 hover:text-pink transition-colors">Projects</a>
          <a href="#skills" className="nav-link py-2 hover:text-pink transition-colors">Skills</a>
          <a href="#contact" className="nav-link py-2 hover:text-pink transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
