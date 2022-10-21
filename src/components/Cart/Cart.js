import { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'

class Cart extends Component {
	id = () => {
		let s4 = () => {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		//return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	render() {
		const cartList = this.props.cartList.map(item => <CartItem item={item} currentCurrency={this.props.currentCurrency} key={this.id()} />)
		return (
			<>
				<div className="cart">
					<div className="cart__title">cart</div>
					<ul className="cart__body">
						{cartList}
					</ul>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		cartList: state.cart.cartList,
		currentCurrency: state.cart.currentCurrency
	}
}

export default connect(mapStateToProps)(Cart)