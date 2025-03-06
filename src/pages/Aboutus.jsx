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
               <img alt="Profile for Govt. College of Engineering Karad शासकीय ..." id="dimg_yrbJZ8DmELaq4-EPufTlwQ4_2" src="data:image/png;base64,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" data-csiid="yrbJZ8DmELaq4-EPufTlwQ4_1" data-atf="1"/>
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
