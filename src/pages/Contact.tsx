import React from 'react';
import { MapPin, Mail, Phone, Send, Facebook, Twitter, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Address',
      value: 'Babblers Tours & Safaris, JMHH+RJ9, Arusha, Tanzania',
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@babblertours.com',
      href: 'mailto:info@babblertours.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+255 765 696 445',
      href: 'tel:+255765696445',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Instagram, href: 'https://instagram.com' },
  ];

  return (
    <div className="bg-gray-50 pt-16">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white text-center py-24"
        style={{ backgroundImage: "url('/images/contact.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto">
            Have questions or ready to plan your adventure? We're here to help!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl">
            {/* Contact Info & Image */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  {contactDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">{detail.title}</h3>
                          {detail.href ? (
                            <a href={detail.href} className="text-gray-600 hover:text-emerald-600 transition-colors">
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-gray-600">{detail.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600">
                                    <Icon className="w-6 h-6" />
                                </a>
                            )
                        })}
                    </div>
                </div>
              </div>
              <div className="mt-8 rounded-lg overflow-hidden">
                <img 
                  src="/images/contact.png" 
                  alt="Happy travelers at the Arusha Cultural Heritage Centre"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows={5} required className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 font-medium">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.643333311029!2d36.67956267580799!3d-3.368434442470018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18371de53445c995%3A0x9733b99616858523!2sBabblers%20Tours%20%26%20Safaris!5e0!3m2!1sen!2sus!4v1694553457189!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Babblers Tours & Safaris Location"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;