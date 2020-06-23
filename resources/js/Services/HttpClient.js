import axios from 'axios';

export default function () {
    const defaultOptions = {

    };

    return {
        get: (url, options = {}) => axios.get(url, {...defaultOptions, ...options}),
        post: (url, data, options = {}) => axios.post(url, data, {...defaultOptions, ...options}),
    };
};

