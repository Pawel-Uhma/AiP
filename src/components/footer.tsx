"use client";

import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/sarahandmichael2024",
    color: "hover:text-pink-500",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/sarahandmichael2024",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/sarahandmichael2024",
    color: "hover:text-blue-400",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sarahandmichael@email.com",
    href: "mailto:sarahandmichael@email.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "The Grand Ballroom, Paradise Valley",
    href: "https://maps.google.com/?q=The+Grand+Ballroom+123+Wedding+Lane+Paradise+Valley+CA+90210",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Couple Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Heart className="h-6 w-6 text-rose-500" />
              <h3 className="font-handwriting text-2xl font-semibold text-gray-800">
                Amelia & Paweł
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Thank you for being part of our special day. We can&apos;t wait to celebrate with you!
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-400 transition-colors duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-semibold text-gray-800 mb-6">Contact Us</h4>
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <div key={contact.label} className="flex items-center justify-center md:justify-start gap-3">
                  <contact.icon className="h-5 w-5 text-rose-500 flex-shrink-0" />
                  <a
                    href={contact.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Wedding Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-semibold text-gray-800 mb-6">Wedding Details</h4>
            <div className="space-y-3 text-gray-600">
              <div>
                <p className="font-medium">Date</p>
                <p>June 15, 2024</p>
              </div>
              <div>
                <p className="font-medium">Ceremony</p>
                <p>4:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Reception</p>
                <p>5:30 PM - 11:00 PM</p>
              </div>
              <div>
                <p className="font-medium">RSVP Deadline</p>
                <p>May 15, 2024</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} Sarah & Michael. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a
                href="#hero"
                className="hover:text-rose-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Back to Top
              </a>
              <span>•</span>
              <a
                href="#rsvp"
                className="hover:text-rose-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                RSVP
              </a>
            </div>
          </div>
        </motion.div>

        {/* Special Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-rose-50 to-gold-50 rounded-2xl p-8">
            <Heart className="h-8 w-8 text-rose-500 mx-auto mb-4" />
            <p className="font-serif text-lg text-gray-700 italic">
            &quot;The best thing to hold onto in life is each other.&quot;            </p>
            <p className="text-gray-600 mt-2">— Audrey Hepburn</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
