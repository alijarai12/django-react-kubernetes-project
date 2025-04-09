// src/config.ts

// Option 1: Use environment variable if available, otherwise use relative path
// This works both in development and when deployed through Ingress
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Option 2: Always use relative path (recommended for Kubernetes with Ingress)
// const API_BASE_URL = '/api';

export default API_BASE_URL;