import React from 'react';
import conf from '../config';

const photo = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1623759122/seguridad_hjtnxf.png';
const ValidateEmail = () => {

    const handleValidateEmail = async() => {
        const token = window.location.pathname.split('/')[2];
        const URI = conf.URL;

        const config = {
            method: 'POST',
            headers: {
                'auth-token': token
            }
        }

       const res = await fetch('http://localhost:8080/api/confirmEmail', config);
       await res.json();

       window.location.replace(`${URI}/ingresar`);
    }
    
    return (
        <div style={{
            backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <div className="card" style={{width: '18rem', background: 'inherit'}}>
            <img src={photo} className="card-img-top" alt="confirm-mail" />
                <div className="card-body">
                    <button className="btn btn-warning btn-lg btn-block" onClick={handleValidateEmail}>Confirmar Email</button>
                </div>
            </div>
            
        </div>
    )
}

export default ValidateEmail
