import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-build-a-burger-39623.firebaseio.com/'
});

export default instance;