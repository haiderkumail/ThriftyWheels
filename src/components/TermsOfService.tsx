export default function TermsOfService() {
  return (
    <section className="scroll-mt-20 py-20 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Terms of Service</h2>
          <p className="text-gray-400 text-lg">
            Please read these terms carefully before using our services.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        <div className="space-y-8 text-gray-400">
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">1. Use of Service</h3>
            <p>By renting our vehicles, you agree to follow all applicable traffic laws and terms outlined in this agreement.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">2. Payment & Cancellations</h3>
            <p>All payments must be made in full. Cancellation policies vary by vehicle and will be shared during booking.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">3. Liability</h3>
            <p>We are not liable for misuse or damages arising from improper use of the rented vehicle.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">4. Modifications</h3>
            <p>We reserve the right to update or change these terms at any time, and changes take effect upon posting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
