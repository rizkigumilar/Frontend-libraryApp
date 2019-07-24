import axios from 'axios';

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`http://localhost:3001/user/register`, data)
    }
}

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`http://localhost:3001/user/login`, data).then( res => {
            const token = res.data.result.token
            const userid = res.data.result.userid
            const name = res.data.result.fullname
            const status = res.data.result.status
            localStorage.setItem('status', status)
            localStorage.setItem('userid', userid)
            localStorage.setItem('jwToken', token)
            localStorage.setItem('name', name)
            
        })
    }
}
