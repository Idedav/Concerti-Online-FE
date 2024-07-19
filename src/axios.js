import axios from "axios";
import { router } from './router';

// IMPOSTAZIONE DI DEFAULT PER LA BASE URL
axios.defaults.baseURL = "http://localhost:8080/concert-on/";

// IMPOSTAZIONE DELL HEADER AUTHORIZATION IN BASE ALLA RICHIESTA EFFETTUTATA
axios.interceptors.request.use(config => {
  // SE LA RICHIESTA DELLA URL E' AUTH/LOGIN MI TOGLIE L HEADER AUTHORIZATION PERCHE NON E' UNA CHIAMATA CHE SERVE UN AUTORIZZAZIONE
    if (config.url === 'auth/login') {
      delete config.headers.Authorization;
    } else if(config.url === 'auth/refresh-token') {
      // SE LA RICHIESTA E' REFRESH_TOKEN L HEADER AUTHORIZATION VIENE IMPOSTATO CON IL REFRESH TOKEN IMPOSTATO
      const token = localStorage.getItem('refresh_token');
      config.headers.Authorization = `Bearer ${token}`;
    }else {
      // TUTTE LE ALTRE RICHIESTE SONO CON L HEADER AUTHORIZATION IMPOSTATO CON L ACCESS TOKEN
      const token = localStorage.getItem('access_token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

// IMPOSTAZIONE DELL'INTERCEPTORE PER GESTIRE LE RISPOSTE 401 CHE QUANDO SCADE L ACCESS TOKEN INVIA LA RICHIESTA CON IL REFRESH TOKEN
// MA SE IL REFRESH TOKEN E' SCADUTO RIPORTA ALLA PAGINA DI LOGIN
let refresh = false;
axios.interceptors.response.use(resp => resp, async error =>{

    if (error.response.status === 401 && !refresh) {
      refresh = true;
      try {
        const response = await axios.post('auth/refresh-token');
        
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.data.access_token);
          localStorage.setItem('refresh_token', response.data.data.refresh_token);
          refresh = false;
          // Riprova la richiesta originale con il nuovo token
          return axios(error.config);
        }
        throw "errore";
      } catch (refreshError) {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
    refresh = false;
    return Promise.reject(error);
})
