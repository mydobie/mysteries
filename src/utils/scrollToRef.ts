import React from 'react';

const scrollToSection = (
  mySectionRef: React.RefObject<HTMLInputElement | null>,
) => {
  if (mySectionRef.current) {
    mySectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // aligns the top of the element with the top of the scrollable area
    });
  }
};

export default scrollToSection;
