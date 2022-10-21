import Categories from './Categories/Categories'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import classNames from 'classnames'
import CurrenciesList from './CurrenciesList/CurrenciesList'
import CartHeader from './CartHeader/CartHeader'
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
							<Categories client={this.props.client} />
						</nav>
					</div>

					<Link to="/" className="logo">Logo</Link>

					<div className="header__actions actions-header" >
						<CurrenciesList client={this.props.client} />
						<CartHeader />
					</div>
				</div>
			</header>
		)
	}
}

export default Header