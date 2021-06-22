import React, { useRef } from 'react'
import './card.css'

//REDIRECT
import config from '../../config'

//Moment JS
import moment from 'moment'
import 'moment/locale/es' // Pasar a español

//Animations
import Animate from '../Animations/gsap'

const photoDefault = 'https://images-na.ssl-images-amazon.com/images/I/61j5LUeKx4L._SL1500_.jpg';

const Card = (props) => {

    //Animation
    let aniImage = useRef(null)
    React.useEffect(() => {
        Animate.loadProducts(aniImage)
    }, [])

    const handleProducto = (id) => {
        window.location.replace(`${config.URL}/producto/${id}`);
    }

    return (
        <div ref={el => { aniImage = el }} className="card card-productos" style={{ width: '100%' }} >
            <div className="card-div">
                <img loading="lazy" src={props.item.ImageURL || photoDefault} className="card-img-top" alt={props.item.descripcion || 'TITLE'} />
            </div>
            <div className="card-body">
                <p className="card-text mb-0">{props.item.producto.toUpperCase() || 'PRODUCTO TITLE'}</p>
                <div className="d-flex justify-content-between align-items-end my-2">
                    <strong style={{ color: '#5bc0de', textTransform: 'uppercase' }} className="card-text mb-0">{props.item.categoria || 'CATEGORIA'}</strong>
                    <h5 style={{ fontWeight: 300 }} className="card-text mb-0">${props.item.precio || 'PRECIO'}</h5>
                </div>
                <strong style={{ display: 'flex', justifyContent: 'start', fontWeight: '400', color: '#7B7B7B' }}>
                    {moment(props.item.createdAt).startOf('hour').fromNow()}
                </strong>
                {!props.guardado && <button className="btn btn-info btn-block" onClick={() => handleProducto(props.item._id)}>Ver producto</button>}
            </div>
        </div>
    )
}

export default Card
