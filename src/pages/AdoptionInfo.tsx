import { useState } from "react";
import { ChevronDown, ChevronUp, PawPrint } from "lucide-react";

const faqs = [
  {
    q: "How much does adoption cost?",
    a: "Most adoptions are free or charge only for medical/vaccination expenses."
  },
  {
    q: "Can I return a pet if things don’t work out?",
    a: "Returns are handled directly between adopter and owner/shelter. Please make sure you’re fully committed before adopting."
  },
  {
    q: "Are pets vaccinated or neutered?",
    a: "This depends on the owner/shelter. Always verify documents and health status before adoption."
  },
  {
    q: "Can I adopt more than one pet?",
    a: "Yes, as long as you can provide the time, care, and resources needed."
  }
];

export default function AdoptionInfoPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <PawPrint className="w-12 h-12 mx-auto text-pink-500" />
        <h1 className="text-3xl font-bold">Adoption Info & FAQ</h1>
        <p className="text-gray-600">
          Learn more about the adoption process, FAQs, and important guidelines.
        </p>
      </div>

      {/* Why Adopt */}
      <section className="bg-white shadow-md rounded-2xl p-6 space-y-2">
        <h2 className="text-xl font-semibold">❤️ Why Adopt?</h2>
        <p className="text-gray-700">
          Adopting a pet saves lives, reduces abandonment, and gives animals a
          second chance at love. By adopting, you’re also discouraging unethical
          breeding and supporting a kinder society.
        </p>
      </section>

      {/* Process */}
      <section className="bg-white shadow-md rounded-2xl p-6 space-y-2">
        <h2 className="text-xl font-semibold">📋 Adoption Process</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700">
          <li>Browse Pets – Explore the listings by category, breed, or location.</li>
          <li>Start a Conversation – Connect with the current owner or shelter via chat.</li>
          <li>Meet & Verify – Arrange a safe meeting to understand the pet’s needs and temperament.</li>
          <li>Finalize Adoption – If both parties agree, complete the adoption and give the pet a forever home.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">🙋 Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-xl">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex justify-between items-center w-full px-4 py-3 text-left text-gray-800 font-medium"
              >
                {faq.q}
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white shadow-md rounded-2xl p-6 space-y-2">
        <h2 className="text-xl font-semibold">🌟 Features of Adopting Through Our Platform</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Direct connection between adopters and pet owners</li>
          <li>No middlemen or hidden charges</li>
          <li>Chat system for secure communication</li>
          <li>Location-based search to find nearby pets</li>
          <li>Photo verification to reduce fraud</li>
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="bg-red-50 border-l-4 border-red-400 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold text-red-700">⚠️ Disclaimer</h2>
        <p className="text-sm text-red-800 mt-2">
          Our platform <strong>only facilitates connections</strong> between adopters and pet owners/shelters.  
          <br />- We <strong>do not guarantee</strong> the health, behavior, or authenticity of pets listed.  
          <br />- Users are responsible for verifying all details, arranging safe meetings, and making informed decisions.  
          <br />- We are <strong>not liable</strong> for disputes, damages, or issues that arise during or after the adoption process.  
        </p>
      </section>
    </div>
  );
}
