import eu from '../assets/eu.jpg';

const Home = () => {
  return (
    // Hero Section
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <p className="text-pink text-lg mb-2">Hello, I'm</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="gradient-text">Clara Cayres</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-lightPurple">Aspiring Full-Stack Developer</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                Exploring APIs, Python, and scalable systems — with a growing passion for Data Science and advancing in Front-End development.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a href="#contact" className="btn-gradient px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-pink/20">
                        Contact me
                    </a>
                    <a href="#projects" className="bg-transparent border border-purple px-8 py-3 rounded-full font-medium hover:bg-purple/10 transition-colors">
                        View Projects
                    </a>
                </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink to-purple opacity-20 blur-xl animate-pulse"></div>
                    <div className="absolute inset-4 rounded-full bg-darkBlue border-2 border-purple/30 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={eu}
                            alt="Maria Clara"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="text-purple hover:text-pink transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </a>
        </div>
    </section>
  );
};

export default Home;