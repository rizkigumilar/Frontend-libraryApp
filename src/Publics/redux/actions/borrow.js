import axios from 'axios';
let url = `https://librarymobileapi.herokuapp.com`

export const postBorrow = (data) => {
    return {
        type: 'POST_BORROW',
        payload: axios.post(`${url}/borrow`, data,
        {
            headers: {
                "authorization": "x-control-app",
                "x-access-token": `token: ${localStorage.jwToken}`,
                "x-control-user": localStorage.userid
            }
        }
        )
    }
}

export const getBorrow = () => {
    return {
        type: 'GET_BORROW',
        payload: axios.get(`${url}/borrow`,
        {
            headers: {
                "authorization": "x-control-app",
                "x-access-token": `token: ${localStorage.jwToken}`,
                "x-control-user": localStorage.userid
            }
        })
    }
}

export const userBorrow = (idNum) => {
    return {
        type: 'USER_BORROW',
        payload: axios.get(`${url}/profile/${idNum}`,
        {
            headers: {
                "authorization": "x-control-app",
                "x-access-token": `token: ${localStorage.jwToken}`,
                "x-control-user": localStorage.userid
            }
        })
    }
}

export const updateBorrow = (idBook, data) => {
    console.log(idBook)
    return {
        type: 'PATCH_BORROW',
        payload: axios.patch(`${url}/borrow/${idBook}`, { penalty: data },
        {
            headers: {
                "authorization": "x-control-app",
                "x-access-token": `token: ${localStorage.jwToken}`,
                "x-control-user": localStorage.userid
            }
        })
    }
}