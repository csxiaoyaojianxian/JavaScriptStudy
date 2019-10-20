import axios from 'axios'

export const fetchData = () => {
    // '(function(){return 123})()'
    return axios.get('/api').then(res => res.data)
}

export const getNumber = () => {
    return 123;
}