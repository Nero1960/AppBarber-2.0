import React, { useEffect, useRef } from 'react';

const AnimationApp = ({ children } : { children: React.ReactNode}) => {
  const sectionRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                } else {
                    entry.target.classList.remove('animate-fade-up');
                }
            });
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

  return (
    <section ref={sectionRef} className="animate-fade-up animation-delay-1000">
      {children}
    </section>
  );
};

export default AnimationApp;