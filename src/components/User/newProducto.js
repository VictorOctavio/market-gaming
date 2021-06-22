import React from 'react'
import categorias  from '../../services/categorias'

//Components
import ListadoProductos from './listProductos'

const NewProducto = ({handleGetData, handleSubmit, handleGetImage, newProducto, edit, handleEdit}) => {

    return (
        <React.Fragment>
        <div className="container">
            <div className="row adminUser" style={{marginTop: '100px'}}>
            
                <div className="col-md-12 form-add pt-5">

                    <div className="col-10 mx-auto">
                        <h3 className="pb-2">{edit ? 'Editar Producto' : 'Agregar Producto'}</h3>
                    </div>

                    <form className="col-12 col-md-10 mx-auto" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <input name="producto" className="form-control m-0" placeholder="Producto" type="text" onChange={handleGetData} value={newProducto.producto} maxLength="30"/>
                        </div>

                        <div className="form-group">
                            <input name="precio" className="form-control m-0" placeholder="Precio" type="number" onChange={handleGetData} value={newProducto.precio}/>
                        </div>

                        <div className="form-group">         
                            <input name="image" disabled={edit} className="form-control m-0" type="file" onChange={handleGetImage} placeholder="CARGAR IMAGE"/>
                        </div>

                        <div className="form-group">            
                            <textarea style={{minHeight: '200px', maxHeight: '200px'}} name="descripcion" className="form-control m-0" placeholder="Descripción y Caracteristicas" onChange={handleGetData} value={newProducto.descripcion}/>
                        </div>

                        <div className="form-group">
                            <select value={newProducto.categoria}  name="categoria" className="form-control m-0" onChange={handleGetData}>
                               {
                                    categorias.map((categ, i) => (
                                        <option key={i}>{categ.name}</option>
                                    ))
                                } 
                            </select>
                        </div>

                        <div className="form-group">        
                            <input name="email" className="form-control m-0" placeholder="Email Contacto" type="email" onChange={handleGetData} value={newProducto.email}/>
                        </div>

                        <div className="form-group">
                            <label className="mb-0">Por ejemplo: 3794235612</label>
                            <input name="phone" className="form-control m-0" placeholder="+54 Whatsapp" type="number" onChange={handleGetData} value={newProducto.phone}/>
                        </div>
    
                        {
                        !edit ? (
                            <button className="btn btn-success btn-block my-3">Publicar</button>
                        ):(
                            <button className="btn btn-warning btn-block my-3">Editar</button>
                        )   
                        }
                    </form>
                </div>
           </div> 
        </div>

        <ListadoProductos
            handleEdit={handleEdit}
        />

        </React.Fragment>
    )
}

export default NewProducto
