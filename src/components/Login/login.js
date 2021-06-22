import React from 'react'
import './login.css'

//Logo
const logo = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1615289667/Login_et6qxr.png'

const Login = ({ ChangeForm, handleSubmit, handleLogin, login, err, sendEmial }) => {

    return (
        <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="card login-card  mt-5">
                    <div className="row no-gutters">

                        <div className="col-md-6 my-auto">
                            <img src={logo} alt="login" className="login-card-img" />
                        </div>

                        <div className="col-md-6  my-auto">

                            <div className="card-body">

                                {
                                    err.err && (
                                        <div className="alert alert-danger text-center" role="alert">{err.message}</div>
                                    )
                                }


                                <h4 style={{ fontWeight: 300, marginBottom: '10px' }}>{login ? 'Iniciar Sesión' : 'Registrarse'}</h4>

                                {
                                     sendEmial.err ? (
                                        <form onSubmit={handleSubmit}>
                                            {
                                                !login && (
                                                    <div className="form-group">
                                                        <input type="text" name="username" className="form-control" placeholder="Usuario" onChange={ChangeForm} />
                                                    </div>
                                                )
                                            }

                                            <div className="form-group">
                                                <input type="email" name="email" className="form-control" placeholder="Email" onChange={ChangeForm} />
                                            </div>

                                            <div className="form-group">
                                                <input type="password" name="password" className="form-control" placeholder="Password" onChange={ChangeForm} />
                                            </div>

                                            <input className="btn btn-block btn-dark" type="submit" value={login ? 'Ingresar' : 'Registrarse'} />

                                        </form>
                                    ) : (
                                        <div className="alert alert-success" role="alert">{sendEmial.message}</div>
                                    )
                                }


                                {
                                    sendEmial.err && (
                                        <button className="btn text-info btn-block text-center mt-2 p-0" onClick={handleLogin}>{!login ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</button>
                                    ) 
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
