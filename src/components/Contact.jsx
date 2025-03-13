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
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">{t('contact.title')}</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
            {t('contact.subtitle')}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
            {t('contact.description')}
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="px-6 py-8">
            {formStatus.submitted && (
              <div className={`mb-6 p-4 rounded-md ${formStatus.success ? 'bg-green-800' : 'bg-red-800'}`}>
                <p className="text-white">{formStatus.message}</p>
              </div>
            )}
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    {t('contact.name')} *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    {t('contact.email')} *
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    {t('contact.phone')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Entreprise */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                    {t('contact.company')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Type de projet */}
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-300">
                    {t('contact.projectType')}
                  </label>
                  <div className="mt-1">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300">
                    {t('contact.budget')}
                  </label>
                  <div className="mt-1">
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-300">
                    {t('contact.timeline')}
                  </label>
                  <div className="mt-1">
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                        <label htmlFor={service.id} className="text-gray-300">
                          {service.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  {t('contact.message')} *
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 relative overflow-hidden star-citizen-sweep"
                >
                  <div className="second-sweep"></div>
                  <div className="orange-indicator"></div>
                  <span>{t('contact.send')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="mt-12 max-w-3xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="px-6 py-8">
            <h3 className="text-xl font-bold text-white mb-4">{t('contact.contactInfo.title')}</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-lg font-medium text-indigo-400">{t('contact.contactInfo.email')}</h4>
                <p className="mt-1 text-gray-300">contact@astraforge.com</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-indigo-400">{t('contact.contactInfo.phone')}</h4>
                <p className="mt-1 text-gray-300">+33 6 XX XX XX XX</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-indigo-400">{t('contact.contactInfo.address')}</h4>
                <p className="mt-1 text-gray-300">Paris, France</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-indigo-400">{t('contact.contactInfo.hours')}</h4>
                <p className="mt-1 text-gray-300">{t('contact.contactInfo.hoursText')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tarifs indicatifs */}
        <div className="mt-16 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">{t('contact.pricing.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t('contact.pricing.projectTypes')}</h4>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.website')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.websitePrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.ecommerce')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.ecommercePrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.webApp')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.webAppPrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.mobileApp')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.mobileAppPrice')}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t('contact.pricing.skills')}</h4>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.motionDesign')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.motionDesignPrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.frontendDev')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.frontendDevPrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.uiDesign')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.uiDesignPrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.graphicDesign')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.graphicDesignPrice')}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300">{t('contact.pricing.photography')}</span>
                  <span className="text-indigo-400 font-semibold">{t('contact.pricing.photographyPrice')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link to="/pricing" className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200">
              {t('pricing.ctaButton')}
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400 text-center">
            {t('contact.pricing.note')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
