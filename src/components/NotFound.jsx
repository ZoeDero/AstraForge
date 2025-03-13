import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <h1 className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            {t('notFound.title')}
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
            {t('notFound.message')}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('notFound.backHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
