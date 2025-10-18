"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RSVPFormData {
  name: string;
  email: string;
  attendance: "yes" | "no" | "";
  diet: string;
  allergies: string;
  message: string;
}

export function RSVPSection() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    attendance: "",
    diet: "",
    allergies: "",
    message: "",
  });
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          attendance: "",
          diet: "",
          allergies: "",
          message: "",
        });
        setShowOptionalFields(false);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-mrs-saint-delafield)' }}>
            RSVP
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prosimy o potwierdzenie obecności do 1 czerwca 2026 roku
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Wprowadź swoje imię i nazwisko"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adres email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="twoj@email.com"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Czy będziesz obecny/a? *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={handleInputChange}
                      required
                      className="mr-2 text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-gray-700">Tak, będę obecny/a</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={handleInputChange}
                      required
                      className="mr-2 text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-gray-700">Nie, nie będę mógł/mogła</span>
                  </label>
                </div>
              </div>

              {/* Diet - only show if attending */}
              {formData.attendance === "yes" && (
                <div>
                  <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferencje żywieniowe *
                  </label>
                  <select
                    id="diet"
                    name="diet"
                    value={formData.diet}
                    onChange={handleInputChange}
                    required={formData.attendance === "yes"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Wybierz opcję</option>
                    <option value="normal">Zwykła</option>
                    <option value="vegetarian">Wegetariańska</option>
                    <option value="vegan">Wegańska</option>
                  </select>
                </div>
              )}

              {/* Optional Fields Toggle */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center"
                >
                  {showOptionalFields ? "Ukryj" : "Pokaż"} dodatkowe informacje
                  <span className="ml-1 transform transition-transform duration-200">
                    {showOptionalFields ? "▲" : "▼"}
                  </span>
                </button>
              </div>

              {/* Optional Fields */}
              {showOptionalFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Allergies */}
                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2">
                      Alergie pokarmowe
                    </label>
                    <textarea
                      id="allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Prosimy o informację o alergiach pokarmowych..."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Wiadomość dla pary młodej
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Podziel się z nami swoimi życzeniami..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Wysyłanie...
                    </div>
                  ) : formData.attendance === "no" ? (
                    "Potwierdź nieobecność"
                  ) : (
                    "Potwierdź obecność"
                  )}
                </Button>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-green-800 text-center">
                    ✅ Dziękujemy! Twoja odpowiedź została wysłana. Sprawdzimy ją i skontaktujemy się z Tobą wkrótce.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-800 text-center">
                    ❌ Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.
                  </p>
                </motion.div>
              )}
            </form>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Masz pytania? Skontaktuj się z nami:
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <a href="mailto:paweluhma136@gmail.com" className="text-pink-600 hover:text-pink-700 transition-colors">
              📧 paweluhma136@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
