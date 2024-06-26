import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const Links = [
    {
      title: 'Company',
      links: [
        {
          link: '/about-us',
          name: 'About Us',
        },
        {
          link: '/faq',
          name: 'FAQ',
        },
        {
          link: '/policy',
          name: 'Policy',
        },
        {
          link: '/terms-condition',
          name: 'Condition',
        },
      ],
    },
    {
      title: 'Top Category',
      links: [
        {
          link: '/category/LUNCH',
          name: 'Lunch',
        },
        {
          link: '/category/Salad',
          name: 'Salad',
        },
        {
          link: '/category/Breakfast',
          name: 'Breakfast',
        },
        {
          link: '/category/DINNER',
          name: 'Dinner',
        },
      ],
    },
    {
      title: 'My Account',
      links: [
        // {
        //   link: '/dashboard',
        //   name: 'Dashboard',
        // },
        {
          link: '/Table',
          name: 'My Orders',
        },
      
      ],
    },
  ];
  return (
    <div className="bg-gray-50 py-4 border-t-2">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((l, i) => (
            <div
              key={i}
              className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {l.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {l.links.map((t, index) => (
                  <li className="flex items-baseline" key={index}>
                    <Link
                      to={t.link}
                      className="text-gray-600 inline-block w-full hover:text-main"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                className="w-2/4 object-contain h-12"
                src="/images/initlogo1.png"
                alt="logo"
              />
            </Link>
            <p className="leading-7 font-sans text-sm text-gray-600 mt-3">
              <span>
                987 Andre Plain Suite High Street 838, <br /> Lake Hestertown,
                Tanzania
              </span>
              <br />
              <span>Tell: +255 754661424</span>
              <br />
              <span>Email: info@zpunet.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
