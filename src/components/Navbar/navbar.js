import React from 'react'
import './navbar.css'

import { Link, withRouter } from 'react-router-dom'

import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { Navbar, NavDropdown, Nav, Form, FormControl, Dropdown, Button } from 'react-bootstrap'

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../redux/userDuck';
import { getCategoriaProductos } from '../../redux/appDuck';

//uri
import Config from '../../config';

//Categorias
import Categorias from '../../services/categorias'


const img = 'https://firebasestorage.googleapis.com/v0/b/fir-roles-d3174.appspot.com/o/Icon.png?alt=media&token=68f7ff0a-e9a0-4f06-924d-33a322506517'

const NavbarComponent = (props) => {
	//States
	const [search, setSearch] = React.useState('')

	const dispatch = useDispatch()

	const token = useSelector(store => store.user.token)
	const activeAdmin = useSelector(store => store.administrador.admin) //admin access

	const handleLogin = () => {
		props.history.push('/ingresar')
	}

	const handleLogout = () => {
		dispatch(logoutUserAction())
		window.location.href = `${Config.URL}/ingresar`;
	}

	const handleMicuenta = () => {
		props.history.push(`/micuenta/${token}`)
	}

	const handleCategory = (e) => {
		const categoria = e.target.name;
		props.history.push(`/productos/${categoria}`)
		dispatch(getCategoriaProductos())
	}

	const handleSearch = e => {
		e.preventDefault();

		if (!search.trim()) return console.log('ingresa algo')
		props.history.replace(`/productos/${search}`)
		window.location.reload();
	}

	const handleGuardados = e => {
		props.history.push(`/guardados/${token}`)
	}

	return (

		<header>
			<React.StrictMode>
				<Navbar className="navegation" variant="dark" expand="lg" fixed="top" style={{ backgroundColor: 'rgb(32, 32, 32)' }}>
					<div className="container">
						<Navbar.Brand><a href={`${Config.URL}`} className="logo-icon text-light"><img src={img} width="40px" alt="gaming" /> GU</a></Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />

						<Navbar.Collapse id="basic-navbar-nav">

							<Form inline onSubmit={handleSearch} className="form-search">
								<FormControl type="search" className="mr-sm-2" placeholder="Buscar" onChange={e => setSearch(e.target.value)} value={search} />
								<Button variant="light" type="submit"><BiSearch /></Button>
							</Form>

							<Nav className="ml-auto">
								<NavDropdown title="Productos" id="collasible-nav-dropdown">
									<NavDropdown.Item name="all" onClick={handleCategory}>Todos</NavDropdown.Item>
									<NavDropdown.Divider />
									{
										Categorias.map(item => (
											<NavDropdown.Item key={item.name} name={item.name} onClick={handleCategory}>{item.name.toLocaleUpperCase()}</NavDropdown.Item>
										))
									}
								</NavDropdown>

								{
									token !== null ? (
										<NavDropdown id="dropdown-basic-button" variant="inherit" title={<BiUserCircle style={{ color: '#ccc', fontSize: '25px' }} />}>
											<Dropdown.Item onClick={handleMicuenta}>Mi Cuenta</Dropdown.Item>
											<Dropdown.Item onClick={handleGuardados}>Guardados</Dropdown.Item>
											{
												activeAdmin && (
													<Dropdown.Item onClick={() => props.history.push('/admin')}>Admin</Dropdown.Item>
												)
											}
											<Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
										</NavDropdown>
									) : (
										<button className="btn" style={{ color: '#fff', fontWeight: 300 }} onClick={handleLogin}>Empezar a vender</button>
									)
								}

							</Nav>

						</Navbar.Collapse>

					</div>
				</Navbar>
			</React.StrictMode>
		</header>

	)
}

export default withRouter(NavbarComponent)

