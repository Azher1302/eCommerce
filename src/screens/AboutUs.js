import React from 'react';
import Head from '../components/Head';
import Layout from '../layout/Layout';

function AboutUs() {
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Head title="About us" />
        <div className="bg-white">
          <div className=" xl:py-20 py-10 px-4">
            <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
              <div>
                <h3 className="text-xl lg:text-3xl mb-2 font-bold">
                  WELCOME TO OUR ECOMMERSIO
                </h3>
                <div className="mt-3 text-base opacity-90 leading-7 font-semibold">
                  <p>
                    Holisticly seize parallel metrics and functional ROI.
                    Seamlessly revolutionize error-free internal or "organic"
                    sources before effective scenarios. Progressively
                    incentivize state of the art applications for efficient
                    intellectual capital. Credibly leverage existing distinctive
                    mindshare through cutting-edge schemas. Proactively
                    procrastinate team building paradigms coordinate
                    client-centric total transparent internal.
                  </p>

                  <p>
                    Dynamically embrace diverse customer service and installed
                    base paradigms. Credibly seize enterprise-wide experiences
                    for end-to-end data. Professionally brand flexible
                    alignments and cost effective architectures.
                    Enthusiastically incentivize seamless communities with
                    seamlessly facilitate revolutionary metrics with strategic
                    theme areas.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                  <div className="p-8 bg-deepest shadow-sm rounded-lg">
                    <span className="text-3xl block font-extrabold mb-4 text-gray-800">
                      10K
                    </span>
                    <h4 className="text-lg font-bold mb-1">LISTED PRODUCTS</h4>
                    <p className="mb-0 opacity-90 leading-7">
                      Dynamically morph team driven partnerships after vertical.{' '}
                    </p>
                  </div>
                  <div className="p-8 bg-deepest shadow-sm rounded-lg">
                    <span className="text-3xl block font-extrabold mb-4 text-gray-800">
                      8K
                    </span>
                    <h4 className="text-lg font-bold mb-1">LOVELY CUSTOMERS</h4>
                    <p className="mb-0 opacity-90 leading-7">
                      Competently productize virtual models without performance.{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <img
                  className="w-full xl:block hidden h-full rounded shadow object-cover"
                  src="/images/about2.jpg"
                  alt="logo"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
