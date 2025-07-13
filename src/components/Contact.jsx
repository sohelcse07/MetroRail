import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import StatusAlert from './StatusAlert';

const Contact = ({ isModal = false }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Additional template parameters
      const templateParams = {
        ...formData,
        to_name: 'Support Team', 
        from_name: `${formData.firstname} ${formData.lastname}`.trim(),
        date: new Date().toLocaleDateString(),
        company_name: 'Metro Station'
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );
      console.log(response, 'Email sent successfully');

      setAlertStatus(200);
      setAlertMessage('Message sent successfully!');
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setAlertStatus(500);
      setAlertMessage('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAlertMessage(null);
        setAlertStatus(null);
      }, 5000);
    }
  };

  return (
    <div className={isModal ? "" : "container mx-auto my-16 px-4 sm:px-12 py-4"} id="contact">
      <div className={`flex flex-col ${isModal ? "" : "xl:flex-row"} gap-[30px]`}>
        {alertMessage && (
          <StatusAlert statusCode={alertStatus} message={alertMessage} />
        )}
        
        <div className={`${isModal ? "w-full" : "xl:w-[54%]"} bg-[#1D293A] p-6 sm:p-10 rounded-xl`}>
          {!isModal && (
            <>
              <h3 className="text-xl sm:text-4xl text-teal-400 mb-4">Let's work together</h3>
              <p className="text-white/60 mb-8">
                Hope you will find me fit for your desired work and your wishes will come true.
              </p>
            </>
          )}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                type="text" 
                name="firstname" 
                placeholder="First name" 
                value={formData.firstname} 
                onChange={handleChange} 
              />
              <Input 
                type="text" 
                name="lastname" 
                placeholder="Last name" 
                value={formData.lastname} 
                onChange={handleChange} 
              />
              <Input 
                type="email" 
                name="email" 
                placeholder="Email address" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              <Input 
                type="tel" 
                name="phone" 
                placeholder="Phone number" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="mt-6">
              <textarea
                name="message"
                className="w-full p-4 rounded-lg bg-[#00e187] text-white placeholder-gray-900 focus:border-teal-400"
                rows="5"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength="10"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="mt-6 px-6 py-3 bg-accent text-white rounded-lg transition-all duration-300 border-2 border-teal-300 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Input = ({ type, name, placeholder, value, onChange, required = false }) => {
  return (
    <input
      type={type}
      name={name}
      className="p-2 md:p-4 rounded-lg bg-[#194356d9] text-white placeholder-teal-500 focus:border-teal-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Contact;