import { Link } from 'react-router-dom';

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      
      <div className="prose prose-lg">
        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you 
          browse websites. They are widely used to make websites work more efficiently and provide 
          information to the owners of the site.
        </p>

        <h2>How we use cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>
            <strong>Analytics cookies</strong> - We use Google Analytics to help us understand 
            how visitors engage with our website. These cookies collect information about your visit 
            to our website, the content you viewed, the links you followed and information about your 
            browser, device, and IP address.
          </li>
          <li>
            <strong>Functionality cookies</strong> - These are used to recognize you when you return 
            to our website. This enables us to personalize our content for you and remember your preferences.
          </li>
        </ul>

        <h2>How to control cookies</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already 
          on your computer and you can set most browsers to prevent them from being placed. If you do this, 
          however, you may have to manually adjust some preferences every time you visit a site and some 
          services and functionalities may not work.
        </p>

        <p>
          You can manage your cookie preferences through the consent banner displayed on our website, 
          or by clearing your browser cookies and reloading the site.
        </p>
        
        <div className="mt-8">
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}