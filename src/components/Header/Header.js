import { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuCategoriesContainer from './MenuCategories/MenuCategoriesContainer'
import CurrenciesListContainer from './CurrenciesList/CurrenciesListContainer'
import CartHeaderContainer from './CartHeader/CartHeaderContainer'
import classNames from 'classnames'
import './Header.scss'
class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menuShown: false,
		}
	}

	showMenu = () => {
		this.setState(!this.state.menuShown)
	}

	render() {
		return (
			<header className="header">
				<div className="header__container">
					<div className="header__menu menu">
						<div className="menu__icon" onClick={() => this.setState({ menuShown: !this.state.menuShown })}>
							<span></span>
						</div>
						<nav className={classNames("menu__body", { 'active': this.state.menuShown },)}>
							<MenuCategoriesContainer />
						</nav>
					</div>

					<Link to="/" className="logo">Logo</Link>

					<div className="header__actions actions-header" >
						<CurrenciesListContainer />
						<CartHeaderContainer />
					</div>
				</div>
			</header>
		)
	}
}

export default Header