import { Link } from "react-router-dom";

function HelpAndPolicies() {
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-indigo-400 border-b border-gray-700 pb-4">
          📖 Help & Policies
        </h1>

        {/* Contact Section */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-400">
            📞 Contact Us
          </h2>
          <p className="text-gray-300">
            Got a query, feedback, or facing a problem? Reach out — we're here
            to help.
          </p>
          <div className="space-y-3 text-gray-400 bg-gray-800 p-6 rounded-lg">
            <p className="flex items-center space-x-2">
              <span className="text-indigo-400">📧</span>
              <strong>Email:</strong>
              <a
                href="mailto:battleslotsofficial@gmail.com"
                className="text-indigo-400 hover:underline"
              >
                battleslotsofficial@gmail.com
              </a>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-indigo-400">📱</span>
              <strong>Instagram:</strong>
              <a
                href="https://www.instagram.com/battleslotsofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                @battleslotsofficial
              </a>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-indigo-400">🕒</span>
              <strong>Support Hours:</strong>
              <span>10:00 AM — 7:00 PM (Mon-Sat)</span>
            </p>
          </div>
        </section>

        <div className="border-t border-gray-700 my-8"></div>

        {/* Terms & Conditions Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            📜 Terms & Conditions
          </h2>

          <div className="bg-gray-800 p-6 rounded-lg">
            <ul className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <li className="flex">
                <span className="text-indigo-400 mr-2">•</span>
                <span>
                  All users must register with valid details: email, UPI ID, and
                  Valorant username.
                </span>
              </li>
              <li className="flex">
                <span className="text-indigo-400 mr-2">•</span>
                <span>
                  ₹70 entry fee is deducted per slot booking. Ensure sufficient
                  balance before proceeding.
                </span>
              </li>
              <li className="flex">
                <span className="text-indigo-400 mr-2">•</span>
                <span>
                  Prizes will be distributed after match results are declared by
                  the admin.
                </span>
              </li>
              <li className="flex">
                <span className="text-indigo-400 mr-2">•</span>
                <span>
                  30% TDS is applicable on net prize winnings as per Income Tax
                  Act rules.
                </span>
              </li>
              <li className="flex">
                <span className="text-indigo-400 mr-2">•</span>
                <span>
                  No refunds will be processed once a slot is booked unless
                  canceled by admin.
                </span>
              </li>
              <li className="flex">
                <span className="text-indigo-400 mr-2">•</span>
                <span>
                  Misconduct, cheating, or abusive behavior will lead to account
                  suspension.
                </span>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-blue-400 mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl text-indigo-400 font-medium">
                  How do I participate in tournaments?
                </h3>
                <p className="text-gray-300 mt-2">
                  Book an available slot by paying the entry fee and join the
                  match at the scheduled time.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl text-indigo-400 font-medium">
                  When will I receive my winnings?
                </h3>
                <p className="text-gray-300 mt-2">
                  Prizes are credited to your registered UPI ID within 24 hours
                  after the tournament ends.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl text-indigo-400 font-medium">
                  What happens if I miss my slot?
                </h3>
                <p className="text-gray-300 mt-2">
                  Unfortunately, entry fees are non-refundable for missed slots.
                  Please ensure you're available for your scheduled time.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-6">Last updated: April 2025</p>
        </section>

        {/* Back to Home Button */}
        <div className="pt-8 pb-10">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HelpAndPolicies;
