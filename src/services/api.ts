import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para adicionar o Token JWT em cada requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Boilerplate:token'); // Nome que você escolher

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor para tratar erros globalmente (como o seu 403 ou 400)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Se o token expirou ou acesso negado, podemos deslogar o usuário
      // localStorage.removeItem('@Boilerplate:token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;