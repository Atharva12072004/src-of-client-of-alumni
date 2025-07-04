import axios from 'axios';

//const axiosInstance = axios.create({ baseURL: 'https://almamatterserver.onrender.com' });
// const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' });
const axiosInstance = axios.create({ baseURL: 'https://server-alumni.onrender.com' });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
//        if (error.response.status === 401 && !window.location.href.includes('/login')) {
//            window.location = '/login';
//        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export const fetcherGet = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    const token= localStorage.getItem('token');

    try {
        const res = await axiosInstance.get(url, { ...config, headers: {
            "Content-Type": "application/json",
            authorization: token }});
        if (res?.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ', res.statusText);
        }
        return res?.data;
    } catch (error) {
        if (error.msg) {
            // Throw the error response so it can be handled in the calling function
            throw error.msg;
        } else {
            // Throw a generic error if there's no response
            throw new Error('Error fetching data (from utils/axiosInstance):', error);
        }
    }
};

//=============================|| Sample parameters to use when calling fetcherPost ||=========================

// const wisperContent = {
//   title: title,
//   description: description,
// };
// const url='/createContent';
// const response = await fetcherPost(url, { token, wisperContent });

export const fetcherPost = async (url, { body = {}} = {}) => {
    console.log('Post Request Body:', body)
    console.log('Post Request URL:', url)

    const token= localStorage.getItem('token');

    try {
        const res = await axiosInstance.post(
            url,
            {
                ...body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            }
        );
        return res.data;
    } catch (error) {
        if (error.msg) {
            // Throw the error response so it can be handled in the calling function
            throw error.msg;
        } else {
            // Throw a generic error if there's no response
            throw new Error('Error fetching data (from utils/axiosInstance):', error);
        }
        
    }
};


export const fetcherPut = async (url, { token = '', body = {}} = {}) => {
    try {
        const res = await axiosInstance.put(
            url,
            {
                ...body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            }
        );
        if (res.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ' + res.statusText);
        }
        return res.data;
    } catch (error) {
        if (error.msg) {
            // Throw the error response so it can be handled in the calling function
            throw error.msg;
        } else {
            // Throw a generic error if there's no response
            throw new Error('Error fetching data (from utils/axiosInstance):', error);
        }
    }
};

export const fetcherDelete = async (url, { token = '', body = {}} = {}) => {
    try {
        console.log(body);
        const res = await axiosInstance.post(
            url,
            {
                ...body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            }
        );
        if (res.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ' + res.statusText);
        }
        return res.data;
    } catch (error) {
        if (error.msg) {
            // Throw the error response so it can be handled in the calling function
            throw error.msg;
        } else {
            // Throw a generic error if there's no response
            throw new Error('Error fetching data (from utils/axiosInstance):', error);
        }
    }
};
