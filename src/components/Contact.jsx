import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    services: [],
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const [errors, setErrors] = useState({});

  // Services proposés
  const serviceOptions = [
    { id: 'webDevelopment', label: t('contact.services.webDevelopment') },
    { id: 'mobileDevelopment', label: t('contact.services.mobileDevelopment') },
    { id: 'uiuxDesign', label: t('contact.services.uiuxDesign') },
    { id: 'branding', label: t('contact.services.branding') },
    { id: 'seo', label: t('contact.services.seo') },
    { id: 'contentCreation', label: t('contact.services.contentCreation') },
    { id: 'maintenance', label: t('contact.services.maintenance') },
  ];

  // Fourchettes de budget
  const budgetRanges = [
    { value: 'less-than-1000', label: t('contact.budgetRanges.less-than-1000') },
    { value: '1000-3000', label: t('contact.budgetRanges.1000-3000') },
    { value: '3000-5000', label: t('contact.budgetRanges.3000-5000') },
    { value: '5000-10000', label: t('contact.budgetRanges.5000-10000') },
    { value: '10000-20000', label: t('contact.budgetRanges.10000-20000') },
    { value: 'more-than-20000', label: t('contact.budgetRanges.more-than-20000') },
    { value: 'not-defined', label: t('contact.budgetRanges.not-defined') },
  ];

  // Types de projets
  const projectTypes = [
    { value: 'website', label: t('contact.projectTypes.website') },
    { value: 'e-commerce', label: t('contact.projectTypes.e-commerce') },
    { value: 'web-app', label: t('contact.projectTypes.web-app') },
    { value: 'mobile-app', label: t('contact.projectTypes.mobile-app') },
    { value: 'redesign', label: t('contact.projectTypes.redesign') },
    { value: 'branding', label: t('contact.projectTypes.branding') },
    { value: 'other', label: t('contact.projectTypes.other') },
  ];

  // Délais de réalisation
  const timelineOptions = [
    { value: 'urgent', label: t('contact.timelineOptions.urgent') },
    { value: 'short', label: t('contact.timelineOptions.short') },
    { value: 'medium', label: t('contact.timelineOptions.medium') },
    { value: 'long', label: t('contact.timelineOptions.long') },
    { value: 'not-defined', label: t('contact.timelineOptions.not-defined') },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is filled
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    let updatedServices = [...formData.services];
    
    if (checked) {
      updatedServices.push(value);
    } else {
      updatedServices = updatedServices.filter(service => service !== value);
    }
    
    setFormData({
      ...formData,
      services: updatedServices,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.name');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.email');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.message');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({
      submitted: true,
      success: false,
      message: t('contact.formStatus.submitting'),
    });

    // Préparer les données pour EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      company: formData.company,
      project_type: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      services: formData.services.join(', '),
      message: formData.message,
    };

    // Remplacez ces valeurs par vos identifiants EmailJS
    emailjs.send(
      'service_y35w7uh', // Service ID from EmailJS
      'template_w6fay1o', // Template ID from EmailJS
      templateParams,
      'EYtbkXU_q3wE4sstC' // Public Key from EmailJS
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setFormStatus({
        submitted: true,
        success: true,
        message: t('contact.formStatus.success'),
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        services: [],
        message: '',
      });
    })
    .catch((err) => {
      console.log('FAILED...', err);
      setFormStatus({
        submitted: true,
        success: false,
        message: t('contact.formStatus.error'),
      });
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-deep-space">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            {t('contact.title')}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
          <div className="lg:col-span-1">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden">
              <div className="px-6 py-8">
                <h2 className="cosmic-title text-2xl font-bold mb-6">{t('contact.contactInfo')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="forge-icon-button flex-shrink-0 h-10 w-10 rounded-[7px] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium cosmic-text">{t('contact.email')}</h3>
                      <p className="mt-1 cosmic-text">
                        <a href="mailto:contact@astraforge.com" className="hover:text-indigo-400 transition-colors duration-300">
                          contact@astraforge.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="forge-icon-button flex-shrink-0 h-10 w-10 rounded-[7px] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium cosmic-text">{t('contact.phone')}</h3>
                      <p className="mt-1 cosmic-text">
                        <a href="tel:+33612345678" className="hover:text-indigo-400 transition-colors duration-300">
                          +33 6 12 34 56 78
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="forge-icon-button flex-shrink-0 h-10 w-10 rounded-[7px] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium cosmic-text">{t('contact.location')}</h3>
                      <p className="mt-1 cosmic-text">
                        Paris, France
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="cosmic-title text-lg font-medium mb-4">{t('contact.followUs')}</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="forge-icon-button h-10 w-10 rounded-[7px] flex items-center justify-center">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="forge-icon-button h-10 w-10 rounded-[7px] flex items-center justify-center">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="forge-icon-button h-10 w-10 rounded-[7px] flex items-center justify-center">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden">
              <div className="px-6 py-8">
                {formStatus.submitted && (
                  <div className={`mb-6 p-4 rounded-[7px] ${formStatus.success ? 'bg-green-800 bg-opacity-50 backdrop-filter backdrop-blur-sm' : 'bg-red-800 bg-opacity-50 backdrop-filter backdrop-blur-sm'}`}>
                    <p className="cosmic-text">{formStatus.message}</p>
                  </div>
                )}
                
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    {/* Nom */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium cosmic-text">
                        {t('contact.name')} *
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`cosmic-input block w-full ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium cosmic-text">
                        {t('contact.email')} *
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`cosmic-input block w-full ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium cosmic-text">
                        {t('contact.phone')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="cosmic-input block w-full"
                        />
                      </div>
                    </div>

                    {/* Entreprise */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium cosmic-text">
                        {t('contact.company')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="company"
                          id="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="cosmic-input block w-full"
                        />
                      </div>
                    </div>

                    {/* Type de projet */}
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium cosmic-text">
                        {t('contact.projectType')}
                      </label>
                      <div className="mt-1">
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="cosmic-input block w-full"
                        >
                          <option value="">{t('contact.projectTypePlaceholder')}</option>
                          {projectTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium cosmic-text">
                        {t('contact.budget')}
                      </label>
                      <div className="mt-1">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="cosmic-input block w-full"
                        >
                          <option value="">{t('contact.budgetPlaceholder')}</option>
                          {budgetRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Délai */}
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium cosmic-text">
                        {t('contact.timeline')}
                      </label>
                      <div className="mt-1">
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="cosmic-input block w-full"
                        >
                          <option value="">{t('contact.timelinePlaceholder')}</option>
                          {timelineOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium cosmic-text mb-2">
                      {t('contact.services.title')}
                    </label>
                    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                      {serviceOptions.map((service) => (
                        <div key={service.id} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={service.id}
                              name="services"
                              type="checkbox"
                              value={service.id}
                              checked={formData.services.includes(service.id)}
                              onChange={handleServiceChange}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-500 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={service.id} className="cosmic-text">
                              {service.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium cosmic-text">
                      {t('contact.message')} *
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`cosmic-input block w-full ${errors.message ? 'border-red-500' : ''}`}
                      />
                      {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={formStatus.submitted && !formStatus.success}
                      className="forge-glass-button w-full flex justify-center py-3 px-4 border border-transparent rounded-[7px] shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {formStatus.submitted && !formStatus.success ? t('contact.submitting') : t('contact.submit')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
