import React, { useEffect } from "react";

const Contact = () => {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
      
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
      
        // Enviar para o Formspree
        const formspreeUrl = 'https://formspree.io/f/xqapnorp'; 
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };
      
        try {
            await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log('Message sent to Formspree!');
            alert('Your message has been sent successfully!');
        } catch (error) {
            console.error('Error sending to Formspree:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    }
    return (
        // <!-- Contact Section -->
        <section id="contact" className="py-20 bg-gradient-to-b from-darkBlue/95 to-darkBlue">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink to-purple mx-auto"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Have a project in mind? Let's talk about how I can help turn your idea into reality.
                    </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
                    <div className="md:w-2/5">
                        <div className="card p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold mb-6 text-lightPurple">Contact Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-pink/20 flex items-center justify-center mr-4 shrink-0">
                                        <i className="fas fa-envelope text-pink"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Email</h4>
                                        <a href="mailto:clara.cayres1205@gmail.com" className="text-gray-400" >clara.cayres1205@gmail.com</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center mr-4 shrink-0">
                                        <i className="fas fa-phone-alt text-purple"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Phone</h4>
                                        <p className="text-gray-400">+1 (919) 888-1033</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-pink/20 flex items-center justify-center mr-4 shrink-0">
                                        <i className="fas fa-map-marker-alt text-pink"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Location</h4>
                                        <p className="text-gray-400">Angier, North carolina, United States</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <h4 className="font-medium mb-4">Find me on social media</h4>
                                <div className="flex space-x-4">
                                    <a href="https://www.linkedin.com/in/maria-clara-cayres-de-almeida" target="blank" className="w-10 h-10 rounded-full bg-pink/20 flex items-center justify-center hover:bg-pink/40 transition-colors">
                                        <i className="fab fa-linkedin-in text-pink"></i>
                                    </a>
                                    <a href="https://github.com/claracayres" target="blank" className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center hover:bg-purple/40 transition-colors">
                                        <i className="fab fa-github text-purple"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-3/5">
                        <div className="card p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold mb-6 text-lightPurple">Send a message</h3>
                            
                            <form id="contact-form" className="space-y-6" onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full bg-darkBlue/50 border border-purple/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink transition-colors"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full bg-darkBlue/50 border border-purple/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink transition-colors"
                                            placeholder="Your email"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block mb-2 text-sm">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full bg-darkBlue/50 border border-purple/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink transition-colors"
                                        placeholder="Message subject"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        className="w-full bg-darkBlue/50 border border-purple/30 rounded-lg px-4 py-3 focus:outline-none focus:border-pink transition-colors"
                                        placeholder="Your message..."
                                        required
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="btn-gradient px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-pink/20 w-full md:w-auto">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;