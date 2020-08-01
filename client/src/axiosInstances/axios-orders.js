import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localHost:5000'
    // baseURL: ''
});

export default instance;