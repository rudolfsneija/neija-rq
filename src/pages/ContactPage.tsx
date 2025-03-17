import { Phone, Mail, Building2 } from 'lucide-react';
import { useState } from 'react';
import { GoogleMap } from '../components/GoogleMap';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const locationCoords = {
    lat: 56.68927853207993,
    lng: 23.765731553843203
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});
    
    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Simple validation
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      
      if (!formData.message.trim()) {
        throw new Error('Please enter a message');
      }

      // Send data to your backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      // Success!
      setSubmitStatus({ 
        success: true, 
        message: 'Your message has been sent! We will get back to you soon.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Get in touch with us for inquiries about our services, parts, or custom builds.
        </p>

        {/* Top section: Contact Info + Map */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact info section */}
          <div>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="mt-6 space-y-5">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+371 26551197</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">agris@neija.lv</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map - Bigger and to the right */}
          <div className="h-80 lg:h-96">
            <GoogleMap 
              address="Rožu iela 12, Ozolnieki, Latvia, LV-3018"
              lat={locationCoords.lat}
              lng={locationCoords.lng}
              zoom={16}
              placeId="ChIJv7pfUB4l70YRxCKM5EyY_yc"
            />
          </div>
        </div>

        {/* Bottom section: Company Info + Contact Form */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Company information */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold">Company Information</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-4">
                <Building2 className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Company Name</p>
                  <p className="text-gray-600">SIA "NEIJA T"</p>
                </div>
              </div>
              <div className="ml-10 space-y-2">
                <div>
                  <p className="font-medium text-gray-700">Registration No.</p>
                  <p className="text-gray-600">53603022721</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">VAT No.</p>
                  <p className="text-gray-600">LV53603022721</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Legal Address</p>
                  <p className="text-gray-600">Rožu iela 12, Ozolnieki, Ozolnieku pag.,</p>
                  <p className="text-gray-600">Jelgavas nov., Latvia, LV-3018</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-lg bg-yellow-50 p-8">
            <h2 className="text-2xl font-bold text-yellow-900">Contact Form</h2>
            
            {/* Success/Error Messages */}
            {submitStatus.message && (
              <div className={`mt-4 p-3 rounded ${submitStatus.success 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block font-medium text-yellow-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium text-yellow-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-medium text-yellow-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}