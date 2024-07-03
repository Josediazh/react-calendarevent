import axios from 'axios'
import { getEnvVariable } from '../helpers/getEnvVariable'

const { VITE_RAILWAY_API_URL } = getEnvVariable();

const calendarApi = axios.create({
    baseURL: VITE_RAILWAY_API_URL
})

calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
} );

export default calendarApi;