import axios from 'axios';

let url = `https://librarymobileapi.herokuapp.com`


export const getPagination = (numPage) => {
    return {
        type: 'GET_PAGE',
        payload: axios.get(`${url}/book/cek/lah?page=${numPage}`),

    }
};




