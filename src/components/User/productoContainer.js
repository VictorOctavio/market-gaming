import React from 'react'

//COMPONENTS
import NewProducto from './newProducto'

//REDUX
import {useDispatch} from 'react-redux'
import {newProductoAction, updateProductoAction} from '../../redux/adminDucks'
const ProductoContainer = () => {

    const dispatch = useDispatch()

    const [edit, setEdit] = React.useState(false)

    const [newProducto, setNewProducto] = React.useState({
        producto: '',
        precio: 0,
        descripcion: '',
        categoria: 'pc',
        email: '',
        phone: ''
    })

    const [image, setImage] = React.useState(null)

    const handleGetData = e => {
        setNewProducto({
            ...newProducto,
            [e.target.name]: e.target.value
        })
    }

    const handleGetImage = e => {
        setImage(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(!edit){
            dispatch(newProductoAction(newProducto, image));
            window.location.reload();
        }else{
            dispatch(updateProductoAction(newProducto));
            window.location.reload();
        }
    }

    const handleEdit = (producto) => {
        setEdit(true)
        
        setNewProducto({
            id: producto._id,
            producto: producto.producto,
            precio: producto.precio,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            email: producto.email,
            phone: producto.phone
        })
    }

    return (
        <React.Fragment>
            <NewProducto
                newProducto={newProducto}
                handleGetData={handleGetData}
                handleSubmit={handleSubmit}
                edit={edit}
                handleEdit={handleEdit}
                handleGetImage={handleGetImage}
            />
        </React.Fragment>
    )
}

export default ProductoContainer
