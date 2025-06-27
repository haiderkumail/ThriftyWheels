export default function CookiePolicy() {
  return (
    <section className="scroll-mt-20 py-20 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Cookie Policy</h2>
          <p className="text-gray-400 text-lg">
            This page explains how we use cookies to improve your experience.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        <div className="space-y-8 text-gray-400">
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">1. What Are Cookies?</h3>
            <p>Cookies are small text files stored on your browser to help websites remember information about your visit.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">2. Why We Use Cookies</h3>
            <p>We use cookies to enhance your experience, remember preferences, and analyze traffic to improve our services.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">3. Managing Cookies</h3>
            <p>You can change your browser settings to accept or reject cookies. Disabling them may impact your experience.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">4. Types of Cookies</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Essential Cookies</li>
              <li>Performance Cookies</li>
              <li>Functionality Cookies</li>
              <li>Targeting/Advertising Cookies</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
