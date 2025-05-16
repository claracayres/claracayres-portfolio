
const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-gradient-to-b from-darkBlue/95 to-darkBlue">
                <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">My <span className="gradient-text">Projects</span></h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-pink to-purple mx-auto"></div>
                                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                                        Check out some of my most recent work. Each project represents a unique challenge that helped me grow as a developer.
                                </p>
                        </div>
                                        {/* Center the single project */}
                        <div className="flex justify-center">
                            <div className="project-card card rounded-xl overflow-hidden max-w-md">
                                <div className="h-48 bg-gradient-to-br from-pink to-purple flex items-center justify-center">
                                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Fisioella Clinic Website</h3>
                                    <p className="text-gray-400 mb-4">
                                        A website developed for Fisioella Clinic by Dr. Neila Cayres, focused to reach more women in need of pelvic physiotherapy and offer them valuable guidance and support. Built with React, Vite, CSS, and JavaScript, and deployed on Vercel.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="text-xs bg-pink/20 text-pink px-3 py-1 rounded-full">React</span>
                                        <span className="text-xs bg-purple/20 text-purple px-3 py-1 rounded-full">Vite</span>
                                        <span className="text-xs bg-lightPurple/20 text-lightPurple px-3 py-1 rounded-full">CSS</span>
                                        <span className="text-xs bg-pink/20 text-pink px-3 py-1 rounded-full">JavaScript</span>
                                        <span className="text-xs bg-purple/20 text-purple px-3 py-1 rounded-full">Vercel</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <a href="https://fisioella.vercel.app" target='blank' className="text-pink hover:text-white transition-colors">
                                            <i className="fas fa-external-link-alt"></i> Demo
                                        </a>
                                        <a href="https://github.com/claracayres/Fisioella-react" target='blank' className="text-purple hover:text-white transition-colors">
                                            <i className="fab fa-github"></i> Code
                                        </a>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                        {/* Project 1
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            <div className="project-card card rounded-xl overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-pink to-purple flex items-center justify-center">
                                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Fisioella Clinic Website</h3>
                                        <p className="text-gray-400 mb-4">
                                         A website developed for Fisioella Clinic by Dr. Neila Cayres, focused to reach more women in need of pelvic physiotherapy and offer them valuable guidance and support. Built with React, Vite, CSS, and JavaScript, and deployed on Vercel.
                                        </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="text-xs bg-pink/20 text-pink px-3 py-1 rounded-full">React</span>
                                    <span className="text-xs bg-purple/20 text-purple px-3 py-1 rounded-full">Vite</span>
                                    <span className="text-xs bg-lightPurple/20 text-lightPurple px-3 py-1 rounded-full">CSS</span>
                                    <span className="text-xs bg-pink/20 text-pink px-3 py-1 rounded-full">JavaScript</span>
                                    <span className="text-xs bg-purple/20 text-purple px-3 py-1 rounded-full">Vercel</span>
                                </div>
                                <div className="flex space-x-3">
                                    <a href="https://fisioella.vercel.app" target='blank' className="text-pink hover:text-white transition-colors">
                                        <i className="fas fa-external-link-alt"></i> Demo
                                    </a>
                                    <a href="https://github.com/claracayres/Fisioella-react" target='blank' className="text-purple hover:text-white transition-colors">
                                        <i className="fab fa-github"></i> Code
                                    </a>
                                </div>
                            </div>
                        </div>
                         */}
                                                            
                                                              {/*       <!-- Project 2 -->
                                <div className="project-card card rounded-xl overflow-hidden">
                                        <div className="h-48 bg-gradient-to-br from-purple to-pink flex items-center justify-center">
                                                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                </svg>
                                        </div>
                                        <div className="p-6">
                                                <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
                                                <p className="text-gray-400 mb-4">
                                                        A mobile app developed with React Native. Elegant interface and advanced features.
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                        <span className="text-xs bg-pink/20 text-pink px-3 py-1 rounded-full">React Native</span>
                                                        <span className="text-xs bg-purple/20 text-purple px-3 py-1 rounded-full">Firebase</span>
                                                        <span className="text-xs bg-lightPurple/20 text-lightPurple px-3 py-1 rounded-full">Redux</span>
                                                </div>
                                                <div className="flex space-x-3">
                                                        <a href="#" className="text-pink hover:text-white transition-colors">
                                                                <i className="fas fa-external-link-alt"></i> Demo
                                                        </a>
                                                        <a href="#" className="text-purple hover:text-white transition-colors">
                                                                <i className="fab fa-github"></i> Code
                                                        </a>
                                                </div>
                                        </div>
                                </div>
                                
                                <!-- Project 3 --> 
                                <div className="project-card card rounded-xl overflow-hidden">
                                        <div className="h-48 bg-gradient-to-br from-lightPurple to-purple flex items-center justify-center">
                                                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                                                </svg>
                                        </div>
                                        <div className="p-6">
                                                <h3 className="text-xl font-semibold mb-2">Web System</h3>
                                                <p className="text-gray-400 mb-4">
                                                        A complete system with a Node.js backend and React frontend. Includes authentication and database integration.
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                        <span className="text-xs bg-pink/20 text-pink px-3 py-1 rounded-full">React</span>
                                                        <span className="text-xs bg-purple/20 text-purple px-3 py-1 rounded-full">Node.js</span>
                                                        <span className="text-xs bg-lightPurple/20 text-lightPurple px-3 py-1 rounded-full">MongoDB</span>
                                                </div>
                                                <div className="flex space-x-3">
                                                        <a href="#" className="text-pink hover:text-white transition-colors">
                                                                <i className="fas fa-external-link-alt"></i> Demo
                                                        </a>
                                                        <a href="#" className="text-purple hover:text-white transition-colors">
                                                                <i className="fab fa-github"></i> Code
                                                        </a>
                                                </div>
                                        </div>
                                </div>
                                
                        </div> */}
                         
                        {/* <div className="text-center mt-12">
                                <a href="#" className="bg-transparent border border-purple px-8 py-3 rounded-full font-medium hover:bg-purple/10 transition-colors inline-flex items-center">
                                        View More Projects
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                </a>
                        </div> */}
                </div>
            
        </section>
        );
};

export default Projects;