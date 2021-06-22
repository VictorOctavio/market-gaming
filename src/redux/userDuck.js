import config from '../config';
import axios from 'axios';

const dataInicial = {
    token: null,
    loading: false
}

const LOADING = 'LOAGING'
const TOKEN_EXITO = 'TOKEN_EXITO'
const LOGOUT = 'LOGOUT'

//Reducer
export default function userReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING: return {...state, loading: true}

        case TOKEN_EXITO: return {...state, loading: false, token: action.payload}
        
        case LOGOUT: return {state, loading: false, token: null}

        default: return{...state}
    }
}

//Action

//REGISTRO ACCIÓN
export const RegisterUserAction = (newUser, setErr, setSendEmail) => async(dispatch) => {

    const URI = config.URI;

    try{

        const res = await axios({method: 'POST', url: `${URI}/register`, data: newUser})

        if(res.data.err) return setErr({err: true, message: res.data.message});
        if(!res.data.err) return setSendEmail({err: false, message: res.data.message});

    }catch(err){console.log(err)}

}



//LOGIN ACCIÓN
export const LoginUserAction = (user, setErr) => async(dispatch) => {

    const URI = config.URI;

    try{
        dispatch({type: LOADING})
        const User = {email: user.email, password: user.password}
        
        const res = await axios({
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            url: `${URI}/login`,
            data: User
        })  
        
        if(res.data.err) return setErr({err: true, message: res.data.message}) 
        
        localStorage.setItem('token', res.data.data.token)

        dispatch({
            type: TOKEN_EXITO,
            payload: res.data.data.token
        })

    }catch(err){console.log(err)}
} 


//LEER USUARIO ACCIÓN
export const ReadSesionAction = () => dispatch => {
    if(localStorage.getItem('token')){
        dispatch({
            type: TOKEN_EXITO,
            payload: localStorage.getItem('token')
        })
        return
    }
}


//CERRAR SESIÓN USUARIO
export const logoutUserAction = () => (dispatch) => {
    dispatch({type: LOGOUT})
    localStorage.removeItem('token')
}