import React, { useEffect } from "react";

const BackToTop = () => {
    useEffect(() => {
            const backToTopButton = document.getElementById('back-to-top');
        
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.remove('opacity-0', 'invisible');
                    backToTopButton.classList.add('opacity-100', 'visible');
                } else {
                    backToTopButton.classList.add('opacity-0', 'invisible');
                    backToTopButton.classList.remove('opacity-100', 'visible');
                }
            });
            
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
    }, []);
    return (
    <button id="back-to-top" className="fixed bottom-6 right-6 w-12 h-12 rounded-full btn-gradient flex items-center justify-center opacity-0 invisible transition-all z-50 cursor-pointer shadow-lg shadow-pink/20">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>
    );
}
export default BackToTop;