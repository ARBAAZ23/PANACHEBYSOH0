import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import {
  FaUsers,
  FaHandshake,
  FaLightbulb,
  FaAward,
  FaGlobe,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: <FaCheckCircle className="text-2xl text-green-500" />,
      title: "Quality First",
      description:
        "Each fabric is carefully sourced, inspected, and crafted to ensure premium quality.",
    },
  ];

  const features = [
    {
      icon: <FaLightbulb className="text-3xl text-yellow-500" />,
      title: "Innovative Trends",
      description:
        "We constantly reinvent fabrics, offering styles that fit both modern and timeless wardrobes.",
    },
    {
      icon: <FaHandshake className="text-3xl text-green-600" />,
      title: "Client-Centric",
      description:
        "We design with you in mind, tailoring collections that inspire confidence and individuality.",
    },
    {
      icon: <FaAward className="text-3xl text-purple-600" />,
      title: "Unmatched Elegance",
      description:
        "Our reputation is built on luxury fabrics that turn every outfit into a statement.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 border-t overflow-hidden">
      {/* Section Title */}
      <div className="text-center text-3xl mb-12 animate-fade-in-up">
        <Title text1="ABOUT " text2="US" />
      </div>

      {/* Brand Story */}
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center gap-12 mb-20">
        {/* Image */}
        <div className="w-full md:w-1/2 animate-slide-in-left">
          <img
            src={assets.about_us}
            alt="Luxury Fabrics"
            className="w-full h-auto rounded-xl shadow-xl object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-gray-700 space-y-6 animate-slide-in-right">
          <h3 className="text-2xl font-semibold text-black">Who We Are</h3>
          <p className="text-sm leading-relaxed italic text-black font-medium">
            “We put the Fab in Fabric.” Where tradition flirts with trend.
            Panache by Soh transforms exquisite fabrics into statement pieces,
            blending cultural heritage with modern elegance.
          </p>
          <p className="text-sm leading-relaxed">
            Panache by Soh is where timeless elegance meets modern
            individuality. Founded with a passion for redefining modest fashion,
            we curate unique Indo western pieces that blend contemporary
            silhouettes with cultural sophistication. Each design is
            thoughtfully created to celebrate femininity, confidence, and
            self-expression — without compromising on grace or comfort.
          </p>
          <p className="text-sm leading-relaxed">
            Our aesthetic is modern modest chic — a seamless fusion of glamour
            yet wearable styles, luxurious fabrics, and intricate detailing.
            Every piece is crafted to stand out while staying true to the values
            of refinement and originality.
          </p>
          <p className="text-sm leading-relaxed">
            At Panache, we believe fashion should be more than just beautiful —
            it should be empowering. Our collections are designed to help you
            own your style with pride. Step into your power. Make modesty
            magnetic.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-6 md:px-16 mb-20">
        <h3 className="text-center text-2xl font-semibold text-black mb-10">
          Our Core Values
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h5 className="text-lg font-semibold text-black">
                {value.title}
              </h5>
              <p className="text-sm text-gray-600 mt-2">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-6 md:px-16">
        <h3 className="text-center text-2xl font-semibold text-black mb-10">
          Why Choose Us?
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h5 className="text-lg font-semibold text-black">
                {feature.title}
              </h5>
              <p className="text-sm text-gray-600 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
