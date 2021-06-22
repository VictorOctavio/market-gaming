import React from 'react';
import {Row, Col, Toast} from 'react-bootstrap';

//REDUX
import {useSelector} from 'react-redux'

const avatar = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1615378019/gamer_1_njghgv.png'

const Toasts = () => {

    const active = useSelector(store => store.app.message)

    const [show, setShow] = React.useState(active.state);

    return (
        <div style={{position: 'fixed', top: '14%', right: 0 , zIndex: 100}}>
            <Row>
                <Col>
                    <Toast animation={false} onClose={() => setShow(active.state)} show={active.state} delay={2000} autohide>
                        <Toast.Header>
                            <img src={avatar} width="50px" alt="gamingMessage"/>
                            <strong className="mr-auto mx-1">{active.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{active.message}</Toast.Body>
                    </Toast>
                </Col>
            </Row>          
        </div>
    )
}

export default Toasts
