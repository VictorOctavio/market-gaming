import React from 'react';
import Card from '../Card/card';
import '../spiner.css'
import {withRouter} from 'react-router-dom'
const Recientes = (props) => {   
    
    let productos_recientes = props.productos.docs || null; 
    
    //BTN VER MAS
    const handleProductos = () => {
        props.history.push('/productos/all')
    }
    
    return (
       <React.Fragment>
           <section style={{marginTop: '100px'}} className="text-center">
             <h1 style={{color: '#303030', fontWeight: 400, fontSize: '30px', paddingBottom: '5px', borderBottom:'1px solid #C9C9C9'}}>Ultimas Publicaciones</h1>
           </section>

           <section className="container">
               <div className="row mt-3">
                   {
                    props.loading ? (
                        <div className="contain-loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>
                    ): (
                        productos_recientes !== null ? (
                            productos_recientes.map(item => (
                                <div className="col-12 col-md-6 col-lg-3 col-xl-4 my-5" key={item._id}>
                                    <Card item={item}/>
                                </div>
                            ))
                    ): <div className="contain-loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>)
                   }     
               </div>

               <div className="col-12 text-center">
                   <button style={{padding: '6px 30px'}} onClick={handleProductos} className="btn btn-dark">ver más</button>
               </div>
           </section>
       </React.Fragment>
    )
}

export default withRouter(Recientes)
