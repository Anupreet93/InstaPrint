// src/pages/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1497366754035-7127d5a3b71c?auto=format&fit=crop&w=1400&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            About InstaPrint
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story Section */}
        <section className="mb-16">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              At InstaPrint, we redefine digital printing with cutting-edge
              technology and exceptional quality. As a multinational printing
              firm, our journey is driven by a passion for excellence and a
              commitment to transforming ideas into tangible, high-quality prints.
              Our advanced processes and innovative approach ensure that we
              consistently deliver outstanding results for businesses around the
              globe.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16 grid md:grid-cols-2 gap-12">
          <div className="bg-white shadow-lg rounded-xl p-10">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To empower businesses and individuals by providing innovative,
              efficient, and sustainable printing solutions that bring ideas to
              life.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-10">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To be the global leader in digital printing, setting new benchmarks
              in quality, innovation, and customer satisfaction.
            </p>
          </div>
        </section>

        {/* Powered By Section */}
        <section className="mb-16">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Powered By
            </h2>
            <p className="text-xl text-gray-700">
              This project is powered by{' '}
              <span className="font-bold text-blue-600">
                Government College Of Engineering, Karad
              </span>
              .
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="mb-16">
          <div className="bg-white shadow-xl rounded-xl p-10">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 text-center">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Name:</span> Anupreet Shrikrishna
                    Dalvi
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Mobile:</span> +91-848582XXXX
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Email:</span>{' '}
                    principal@gcekarad.ac.in
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Alternate Email:</span>{' '}
                    anupreetdalvi93@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581092580495-c9b0229c222f?auto=format&fit=crop&w=400&q=80"
                  alt="Contact"
                  className="rounded-full w-48 h-48 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer-like Note */}
        <footer className="text-center mt-16">
          <p className="text-gray-600 text-lg">
            © {new Date().getFullYear()} InstaPrint. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
