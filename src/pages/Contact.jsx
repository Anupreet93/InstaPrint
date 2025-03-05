// src/pages/Contact.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';

const Contact = () => {
  // Function to handle sending email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_btrp5pi',      // Replace with your EmailJS service ID
        'template_k1t547n',      // Replace with your EmailJS template ID
        e.target,
        'kDYH7WCIp7mFySA-D'      // Replace with your EmailJS public user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Your message has been sent successfully!');
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert('There was an error sending your message. Please try again later.');
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80" 
            alt="Office" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white">Get in Touch</h1>
          <p className="mt-4 text-xl text-white opacity-90">
            We’re here to help and answer any question you might have.
          </p>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Contact Details Card */}
          <div className="bg-white shadow-lg rounded-xl p-10 mb-10 lg:mb-0 lg:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Contact Details</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-cyan-500 text-2xl mr-4" />
                <p className="text-gray-700 text-lg">
                  Government College of Engineering, Karad (GCEK) Vidyanagar, Karad, Satara District, Maharashtra - 415124, India.
                </p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-cyan-500 text-2xl mr-4" />
                <p className="text-gray-700 text-lg">+91848582XXXX</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-cyan-500 text-2xl mr-4" />
                <p className="text-gray-700 text-lg">principal@gcekarad.ac.in</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-cyan-500 text-2xl mr-4" />
                <p className="text-gray-700 text-lg">anupreetdalvi93@gmail.com</p>
              </div>
              <div className="mt-8">
                <p className="text-gray-500 text-sm">
                  Our offices are open Monday to Friday, 9:00 AM - 6:00 PM.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white shadow-lg rounded-xl p-10 lg:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Send Us a Feedback</h2>
            <form className="space-y-6" onSubmit={sendEmail}>
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} InstaPrint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
