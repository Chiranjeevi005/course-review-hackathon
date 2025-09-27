import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: September 27, 2025</p>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using the CourseFinder platform, you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not agree 
                with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700">
                CourseFinder provides an online platform for discovering, reviewing, and 
                recommending educational courses. The service includes website access, 
                course listings, user reviews, and related features.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-3">
                When you create an account with us, you must provide accurate and complete 
                information. You are responsible for maintaining the confidentiality of your 
                account and password and for restricting access to your computer.
              </p>
              <p className="text-gray-700">
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Content</h2>
              <p className="text-gray-700 mb-3">
                You are responsible for the content you post on our platform, including reviews 
                and comments. You retain all rights to your content, but you grant us a license 
                to use, display, and distribute your content on our platform.
              </p>
              <p className="text-gray-700">
                You agree not to post content that is unlawful, harmful, threatening, abusive, 
                harassing, defamatory, vulgar, obscene, or otherwise objectionable.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700">
                The service and its original content, features, and functionality are owned by 
                CourseFinder and are protected by international copyright, trademark, patent, 
                trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your account immediately, without prior notice, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-700">
                The service is provided on an "as is" and "as available" basis. CourseFinder 
                expressly disclaims all warranties of any kind, whether express or implied, 
                including but not limited to the implied warranties of merchantability, fitness 
                for a particular purpose, and non-infringement.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700">
                In no event shall CourseFinder, nor its directors, employees, partners, agents, 
                suppliers, or affiliates, be liable for any indirect, incidental, special, 
                consequential or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your access to 
                or use of or inability to access or use the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right, at our sole discretion, to modify or replace these Terms 
                at any time. We will provide notice of any significant changes by updating the 
                "Last updated" date of these Terms of Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-700 mt-2">
                Email: terms@coursefinder.com<br />
                Address: 123 Education Street, Learning City, LC 10001
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;