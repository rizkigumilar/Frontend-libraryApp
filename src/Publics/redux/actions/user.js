import axios from 'axios';

let url = `https://librarymobileapi.herokuapp.com`

export const getUsers = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`${url}/user`,
            {
                headers: {
                    "authorization": "x-control-app",
                    "x-access-token": `token: ${localStorage.jwToken}`,
                    "x-control-user": localStorage.userid
                }
            })
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`${url}/user/register`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }
}

export const deleteMember = (userid) => {
    return {
        type: 'DELETE_USER', userid,
        payload: axios.delete(`${url}/user/member/${userid}`, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }

};

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`${url}/user/login`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        }).then(res => {
            const token = res.data.result.token
            const userid = res.data.result.userid
            const name = res.data.result.fullname
            const status = res.data.result.status
            const idNum = res.data.result.idNum
            localStorage.setItem('idNum', idNum)
            localStorage.setItem('status', status)
            localStorage.setItem('userid', userid)
            localStorage.setItem('jwToken', token)
            localStorage.setItem('name', name)

        })
    }
}
