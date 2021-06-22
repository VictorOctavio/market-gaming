import React from 'react'

//ReactBootstrap
import {Carousel} from 'react-bootstrap';
import Wallpapers from '../../services/image';

import {withRouter} from 'react-router-dom'

const Slider = ({history}) => {
    return (
        <section style={{marginTop: '67px'}}>
            <Carousel>
            {
                Wallpapers !== null ? (
                    Wallpapers.map(item => (
                        <Carousel.Item key={item.name}>
                            <img src={item.photoURL} alt={item.name}  style={{height: '70vh', objectFit: 'cover', width: '100%'}}/>
                            <Carousel.Caption>
                               
                                {item.name.trim() && <h1 className="btn btn-lg btn-light font-weight-bold" onClick={() => history.push(item.href)}>{item.name.toUpperCase()}</h1> }
                                <strong style={{fontWeight: 400, fontSize: '23px'}}>{item.description}</strong>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                ): null
            }
            </Carousel>
        </section>
    )
}

export default withRouter(Slider)
