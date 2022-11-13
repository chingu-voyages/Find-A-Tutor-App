import React from 'react';
import Button from '../components/Button';
import hero from '../assets/hero-image.svg';

function Hero() {
  return (
    <div className="hero min-h-screen bg-secondary">
      <div className="hero-content flex-col lg:flex-row-reverse m-2">
        <img
          src={hero}
          alt="decorative tutor teaching students in a classroom"
        />
        <div className="justify-center">
          <p className="text-2xl md:text-4xl pb-6 m-6 md:m-0">
            Find high-quality education services near you. Decide who you want
            to work with, schedule your own appointments, and meet with your
            instructor online or in-person
          </p>
          <div className="flex justify-center md:justify-start">
            <Button text="Find a Tutor" custom={['w-auto']} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
