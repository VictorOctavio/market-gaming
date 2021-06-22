import config from '../config';
import axios from 'axios';

const dataInicial = {
    mis_productos: null
}

const LOADING = 'LOAGING'
const MISPRODUCTOS_EXITO = 'MISPRODUCTOS_EXITO'

//Reducer
export default function adminReducer(state = dataInicial, action){
    switch(action.type){

        case LOADING: return {...state, loading: true}

        case MISPRODUCTOS_EXITO: return {...state, mis_productos: action.payload}

        default: return{...state}
    }
}

//Acciones
//AGREGAR NUEVO PRODUCTO
export const newProductoAction = (producto, image) => async(dispatch, getState) => {

    const URI = config.URI;
    const {token} = getState().user

    try{

        const formdata = new FormData();
        formdata.append("precio", producto.precio);
        formdata.append("descripcion", producto.descripcion);
        formdata.append("categoria", producto.categoria);
        formdata.append("email", producto.email);
        formdata.append("phone",  producto.phone);
        formdata.append("image", image, "/path/to/file");
        formdata.append("producto", producto.producto);

        const config = {
            method: 'POST',
            headers: {'auth-token': token},
            body: formdata,
            redirect: 'follow'
        };

        const res =  await fetch(`${URI}/save-producto`, config)
        const data = await res.json()

        if(data.err) return console.log(data.message)


    }catch(err){
        console.log(err)
    }
} 



//LISTAR PRODUCTOS DEL USUARIO
export const getProductosAction = () => async(dispatch, getState) => {

    const URI = config.URI;
    const {token} = getState().user

    try{
        
        const res = await axios({
            method: 'GET',
            url: `${URI}/productos?limit=1000`,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })

        const data = res.data;

        if(data.err) return console.error(data.err)

        dispatch({
            type: MISPRODUCTOS_EXITO,
            payload: data.productos
        })

    }catch(err){console.log(err)}
}



//UPDATE PRODUCTO DEL USARIO 
export const updateProductoAction = (producto) => async(dispatch, getState) => {

    const {token} = getState().user
    const {mis_productos} = getState().admin
    const URI = config.URI;

    try{
        const config = {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }

       const res = await fetch(`${URI}/update-producto/${producto.id}`, config)
       const data = await res.json();
        
       if(data.err) return console.log('ERROR')

       const arrayFiler = mis_productos.map(item => (
        item._id === producto.id ? producto : item
       ))

       dispatch({
           type: MISPRODUCTOS_EXITO,
           payload: arrayFiler
       })

    }catch(error){console.error(error)}
}



//ELIMINAR PRODUCTO DEL USUARIO
export const deleteProductoAction = (id) => async(dispatch, getState) => {
    const {token} = getState().user
    const {mis_productos} = getState().admin

    const URI = config.URI;

    try{
        
        const config = {
            method: 'DELETE',
            headers: {'auth-token': token}
        }

        const res = await fetch(`${URI}/delete-producto/${id}`, config)
        const data = await res.json()

        if(data.err) return console.log(data.err)

        const arrayFiler = mis_productos.filter(item => item._id !== id)
        
        dispatch({
            type: MISPRODUCTOS_EXITO,
            payload: arrayFiler
        })

    }catch(error){console.error(error)}
}