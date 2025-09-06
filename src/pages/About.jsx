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
      icon: <FaGlobe className="text-2xl text-blue-600" />,
      title: "Global Perspective",
      description:
        "Our fabrics cater to a worldwide audience, blending cultural roots with modern designs.",
    },
    {
      icon: <FaRocket className="text-2xl text-red-600" />,
      title: "Future Driven",
      description:
        "We embrace innovation to bring new textures, patterns, and sustainable fabrics to life.",
    },
    {
      icon: <FaCheckCircle className="text-2xl text-green-500" />,
      title: "Quality First",
      description:
        "Each fabric is carefully sourced, inspected, and crafted to ensure premium quality.",
    },
  ];

  const features = [
    {
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: "Experienced Craftsmanship",
      description:
        "Our artisans and designers bring decades of expertise, weaving tradition into every fabric.",
    },
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
        <Title text1="ABOUT" text2="US" />
        <p className="mt-2 text-gray-500 text-sm max-w-xl mx-auto">
          Learn more about <span className="font-semibold">Panache by Soh</span>
          , our vision, and the luxury fabrics that define our brand.
        </p>
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
          <p className="text-sm leading-relaxed italic text-indigo-700 font-medium">
            “We put the Fab in Fabric.”  
            Where tradition flirts with trend. Panache by Soh transforms exquisite fabrics into statement pieces, blending cultural heritage with modern elegance.
          </p>
          <p className="text-sm leading-relaxed">
            Every stitch tells a story, every silhouette turns heads—because
            luxury isn’t just worn, <span className="font-semibold">it’s lived.</span>
          </p>
          <p className="text-sm leading-relaxed">
            At Panache by Soh, we specialize in premium fabrics that fuse tradition with modernity.
            From timeless handwoven textiles to contemporary chic designs, our
            collections are curated for those who seek elegance in every thread.
          </p>
          <p className="text-sm leading-relaxed">
            Our fabrics don’t just drape your style—they define it. Designed for
            both everyday sophistication and high-fashion statements, we deliver
            materials that inspire creativity and confidence.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-12 px-6 md:px-20 rounded-xl shadow-lg max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-10 text-gray-700">
          <div>
            <h4 className="text-xl font-semibold text-black mb-3">Our Mission</h4>
            <p className="text-sm leading-relaxed">
              To redefine the fabric industry by blending tradition with modern
              innovation—offering customers timeless materials that inspire
              unforgettable fashion.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-black mb-3">Our Vision</h4>
            <p className="text-sm leading-relaxed">
              To become a global leader in luxury fabrics, celebrated for
              heritage craftsmanship, trendsetting designs, and sustainable
              innovation.
            </p>
          </div>
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
