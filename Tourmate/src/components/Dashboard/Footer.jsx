import React from "react";
import { Users, Search, MapPin, Compass } from "lucide-react";

const Footer = () => {
  return (
    <section id="about">
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-xl mb-4">Tour Mate</h4>
            <p className="text-gray-400 text-sm mb-4">
              Connecting travelers with verified local guides worldwide
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Search className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <MapPin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Compass className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4">For Travelers</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Find a guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Popular destinations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">For Guides</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Become a guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Success stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2025 Tour Mate Inc. All rights reserved
        </div>
      </footer>
    </section>
  );
};

export default Footer;
