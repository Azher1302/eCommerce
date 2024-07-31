import React from 'react';
import Head from '../components/Head';
import Layout from '../layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
  const contactData = [
    {
      id: 1,
      title: 'Email Us',
      info: 'We are here to answer your questions and help you get started.',
      icon: faEnvelope,
      contact: 'info@initsolutions.in',
      href: 'mailto:info@initsolutions.in',
    },
    {
      id: 2,
      title: 'Call Us',
      info: 'Reach out to us by phone for immediate assistance.',
      icon: faPhone,
      contact: '+91 0484 359 9557',
      href: 'tel:+9104843599557',
    },
    {
      id: 3,
      title: 'Location',
      info: 'Visit our office for in-person support and consultations.',
      icon: faMapMarkerAlt,
      contact: 'init solution',
      href: 'https://www.google.com/maps/search/46/2769-F,+Second+Floor,+SA+Plaza,+Vivekananda+Rd,+Vennala,+Kochi,+Kerala+682028',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 container mx-auto px-4 py-12">
        <Head title="Contact Us" />
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {contactData.map((data) => (
            <div key={data.id} className="bg-white shadow-lg rounded-lg p-8 text-center">
              <div className="flex justify-center text-4xl text-indigo-600 mb-6">
                <FontAwesomeIcon icon={data.icon} />
              </div>
              <h5 className="text-2xl font-semibold mb-4 text-gray-800">{data.title}</h5>
              <p className="mb-4 text-base text-gray-600">
                <a href={data.href} className="text-indigo-600 hover:underline">
                  {data.contact}
                </a>
                <span className="block mt-2">{data.info}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
