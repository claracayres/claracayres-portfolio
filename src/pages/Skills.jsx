
const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gradient-to-b from-darkBlue to-darkBlue/95">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink to-purple mx-auto"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        These are the technologies and tools I work with daily to create efficient digital solutions.
                    </p>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
                    {[
                        { name: "HTML & CSS", percentage: 85 },
                        { name: "JavaScript", percentage: 50 },
                        { name: "React", percentage: 85 },
                        { name: "Node.js", percentage: 80 },
                        { name: "UI/UX Design", percentage: 75 },
                        { name: "Python", percentage: 50 },
                    ].map((skill, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-pink">{skill.percentage}%</span>
                            </div>
                            <div className="skill-bar">
                                <div
                                    className="skill-progress"
                                    style={{ width: `${skill.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technologies & Tools */}
                <div className="mt-20">
                    <h3 className="text-2xl font-semibold text-center mb-10 text-lightPurple">
                        Technologies & Tools
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: "fab fa-html5", color: "text-pink", name: "HTML5" },
                            { icon: "fab fa-css3-alt", color: "text-purple", name: "CSS3" },
                            { icon: "fab fa-js", color: "text-pink", name: "JavaScript" },
                            { icon: "fab fa-react", color: "text-purple", name: "React" },
                            { icon: "fab fa-node-js", color: "text-pink", name: "Node.js" },
                            { icon: "fab fa-git-alt", color: "text-purple", name: "Git" },
                            { icon: "fab fa-figma", color: "text-pink", name: "Figma" },
                            { icon: "fab fa-python", color: "text-purple", name: "Python" },
                            { icon: "fab fa-docker", color: "text-pink", name: "Docker" },
                            { icon: "fab fa-microsoft", color: "text-purple", name: "Microsoft Azure" },

                        ].map((tech, index) => (
                            <div
                                key={index}
                                className="card p-4 rounded-lg flex flex-col items-center justify-center hover:glow transition-all"
                            >
                                <i className={`${tech.icon} text-4xl ${tech.color} mb-3`}></i>
                                <span className="text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
