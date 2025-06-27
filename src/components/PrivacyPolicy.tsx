export default function PrivacyPolicy() {
  return (
    <section className="scroll-mt-20 py-20 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Privacy Policy</h2>
          <p className="text-gray-400 text-lg">
            Your privacy is important to us. Here's how we handle your data.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        <div className="space-y-8 text-gray-400">
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">1. Information We Collect</h3>
            <p>We may collect your name, email, contact details, and usage data to provide and improve our services.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">2. Use of Information</h3>
            <p>Your data is used strictly to personalize your experience, process transactions, and enhance our service offerings.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">3. Data Protection</h3>
            <p>We employ advanced security practices to keep your personal data safe and secure at all times.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">4. Third-Party Sharing</h3>
            <p>We do not sell or trade your personal information. Limited data may be shared with trusted partners who help operate our business.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
