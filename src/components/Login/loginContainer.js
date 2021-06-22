import React from 'react'

//Components
import Login from './login'

//Redux
import {useDispatch, useSelector} from 'react-redux'
import {RegisterUserAction, LoginUserAction} from '../../redux/userDuck'

//URI
import Config from '../../config'

const LoginContainer = () => {

    const dispatch = useDispatch()
    const token = useSelector(store => store.user.token);


    //States
    const [newUser, setNewUser] = React.useState({
        username: '',
        email: '',
        password: ''
    })

    const [login, setLogin] = React.useState(false);

    // VALIDACIONES ERROS
    const [err, setErr] = React.useState({err: false, message: ''});
    const [sendEmial, setSendEmail] = React.useState({err: true, message: ''});
    
    const handleLogin = () => {
        setLogin(!login)
    }


    const ChangeForm = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if(login) dispatch(LoginUserAction(newUser, setErr))  
        else dispatch(RegisterUserAction(newUser, setErr, setSendEmail))
         
        setTimeout(() => {
            setErr({err: false, message: ''})
        }, 2500)

        if(token){window.location.replace(`${Config.URL}`)}
    }
        

    return (
        <div>
            <Login
                ChangeForm={ChangeForm}
                handleSubmit={handleSubmit}
                login={login}
                handleLogin={handleLogin}
                err={err}
                sendEmial={sendEmial}
            />
        </div>
    )
}

export default LoginContainer
