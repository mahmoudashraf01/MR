// VITE_BASE_URL
/**
 * Environment Configuration
 * Centralized environment variables and configuration
 */

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Environment variable value or default
 */

const getEnv = (key, defaultValue = '') => {
    return import.meta.env[key] || defaultValue;
};

/**
 * Application environment
 */
// export const APP_ENV = getEnv('VITE_APP_ENV', 'production');

// /**
//  * Check if running in specific environment
//  */
// export const isDevelopment = APP_ENV === 'development';
// export const isStaging = APP_ENV === 'staging';
// export const isProduction = APP_ENV === 'production';


//API Configuration
export const API_BASE_URL = getEnv('VITE_BASE_URL', 'http://localhost:5000/api');

console.log('API Base URL:', API_BASE_URL);
//Export All Configurations
 export default  {
    APP_ENV,
    API_BASE_URL,
};

