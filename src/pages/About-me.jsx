import React from 'react';
import eu from '../assets/eu.jpg';

const AboutMe = () => {
    return (
        <section id="about" className="py-20 bg-gradient-to-b from-darkBlue to-darkBlue/95">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink to-purple mx-auto"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-2/5">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-pink to-purple opacity-20 blur-md -m-2"></div>
                            <div className="card rounded-lg p-1 relative">
                                <div className="bg-darkBlue rounded-lg overflow-hidden">
                                    <svg
                                        className="w-full h-auto text-purple/30"
                                        viewBox="0 0 200 200"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M47.7,-57.2C59.9,-45.8,66.8,-29.1,68.7,-12.1C70.6,4.9,67.4,22.2,57.9,34.8C48.4,47.4,32.6,55.4,15.8,61.3C-1,67.2,-18.9,71,-33.6,65.2C-48.3,59.4,-59.8,44,-65.2,27.3C-70.6,10.7,-69.9,-7.2,-63.4,-22.1C-56.9,-37,-44.5,-48.9,-31.1,-59.8C-17.7,-70.7,-3.3,-80.6,10.3,-79.8C23.9,-79,47.8,-67.5,47.7,-57.2Z"
                                            transform="translate(100 100)"
                                        />
                                    </svg>
       
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={eu}
                                            alt="Maria Clara"
                                            className="w-50 h-50 md:w-75 md:h-75 object-cover rounded-full border-4 border-purple/30 shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-3/5">
                        <h3 className="text-2xl font-semibold mb-4 text-lightPurple">
                            Full Stack Developer & UI/UX Designer
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Hi! I'm Clara Cayres, a Software Engineering student passionate about technology, continuous learning, and turning ideas into real solutions. I'm currently in my 4th semester of college and pursuing the IBM Back-End Development Professional Certificate.
                        </p>
                        <p className="text-gray-300 mb-6">
                            I'm also taking the "HTML, CSS, and JavaScript for Web Developers" specialization by Johns Hopkins University, where I'm deepening my knowledge in modern web development focused on usability and best practices.
                        </p>
                        <p className="text-gray-300 mb-6">
                            My hands-on experience includes building APIs, modern web apps, and microservices using tools like Python, Flask, Django, SQL, Docker, and Kubernetes. I'm also working to enhance my Front-End skills to become a full-stack developer.
                        </p>
                        <p className="text-gray-300 mb-6">
                        Currently, I live in the United States as an au pair, which has provided me with an amazing multicultural experience and helped 
                        me grow in resilience, independence, and communication. My goal is to build a solid career as a developer and contribute to 
                        projects that truly make a difference.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {[
                                {
                                    icon: "fas fa-user-graduate",
                                    title: "Education",
                                    description: "Bachelor's in Software Engineering - grad. 2026",
                                    bgColor: "bg-pink/20",
                                    iconColor: "text-pink",
                                },
                                {
                                    icon: "fas fa-briefcase",
                                    title: "Experience",
                                    description: "<1 years of experience",
                                    bgColor: "bg-purple/20",
                                    iconColor: "text-purple",
                                },
                                {
                                    icon: "fas fa-map-marker-alt",
                                    title: "Location",
                                    description: "Angier, United States",
                                    bgColor: "bg-pink/20",
                                    iconColor: "text-pink",
                                },
                                {
                                    icon: "fas fa-laptop-code",
                                    title: "Freelance",
                                    description: "Available",
                                    bgColor: "bg-purple/20",
                                    iconColor: "text-purple",
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mr-4`}
                                    >
                                        <i className={`${item.icon} ${item.iconColor}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a
                            download="Resume-Maria-Clara-Cayres-de-Almeida.pdf"
                            href="/Resume-Maria-Clara-Cayres-de-Almeida.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gradient px-8 py-3 rounded-full font-medium inline-block hover:opacity-90 transition-opacity shadow-lg shadow-pink/20"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;