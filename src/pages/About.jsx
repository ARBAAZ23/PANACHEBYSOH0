import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { FaUsers, FaHandshake, FaLightbulb, FaAward } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: 'Experienced Team',
      description:
        'Our team is made up of highly skilled professionals with years of experience in their respective fields.',
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-500" />,
      title: 'Innovative Solutions',
      description:
        'We embrace creativity and innovation to provide fresh, unique approaches tailored to your needs.',
    },
    {
      icon: <FaHandshake className="text-3xl text-green-600" />,
      title: 'Client-Centric',
      description:
        'We prioritize transparency, communication, and long-term partnerships with our clients.',
    },
    {
      icon: <FaAward className="text-3xl text-purple-600" />,
      title: 'Proven Excellence',
      description:
        'Our reputation is built on delivering quality outcomes and consistently exceeding expectations.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 border-t overflow-hidden">
      {/* Section Title */}
      <div className="text-center text-3xl mb-12 animate-fade-in-up">
        <Title text1="ABOUT" text2="US" />
        <p className="mt-2 text-gray-500 text-sm max-w-xl mx-auto">
          Learn more about who we are, what we do, and the values that drive our team forward.
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="w-full md:w-1/2 animate-slide-in-left">
          <img
            src={assets.about_us}
            alt="Team at work"
            className="w-full h-auto rounded-xl shadow-xl object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-gray-700 space-y-6 animate-slide-in-right">
          <h3 className="text-3xl font-semibold text-black">Who We Are</h3>
          <p className="leading-relaxed">
            We’re a dynamic team of designers, developers, and strategists passionate about crafting
            purposeful digital experiences. We partner with visionary brands to build creative,
            scalable, and user-focused solutions that drive results.
          </p>
          <p className="leading-relaxed">
            Our journey has been fueled by curiosity, innovation, and a dedication to excellence.
            Every project we undertake is a reflection of our values—collaboration, trust, and
            delivering measurable impact.
          </p>
          <p className="leading-relaxed">
            We look forward to growing together, breaking boundaries, and creating digital
            experiences that matter.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mt-20 animate-fade-in-up">
        <Title text1="WHY " text2="CHOOSE US" />
        <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
          Here's why our clients choose to work with us—and why you should too.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300 animate-fade-in-up"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
