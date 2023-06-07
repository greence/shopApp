import { Component } from 'react'
import { connect } from 'react-redux'
import { calcTotal, changeAttribute, decreaseQuantity, increaseQuantity } from './cartSlice'
import CartItem from './CartItem'

class CartListContainer extends Component {
	increaseQuantity = item => {
		this.props.increaseQuantity(item)
		this.props.calcTotal()
	}

	decreaseQuantity = item => {
		this.props.decreaseQuantity(item)
		this.props.calcTotal()
	}

	changeAttribute = data => {
		this.props.changeAttribute(data)
	}
	render() {
		const cartList = this.props.cartList
		return (
			<>
				<div className="cart">
					<div className="cart__title">cart</div>
					<ul className="cart__body">
						{cartList.map(item =>
							<CartItem
								key={item.id}
								item={item}
								currentCurrency={this.props.currentCurrency}
								increaseQuantity={this.increaseQuantity}
								decreaseQuantity={this.decreaseQuantity}
								setSelected={this.changeAttribute}
							/>)}
					</ul>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		cartList: state.cart.cartList,
		currentCurrency: state.cart.currentCurrency,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		increaseQuantity: item => dispatch(increaseQuantity(item)),
		decreaseQuantity: item => dispatch(decreaseQuantity(item)),
		changeAttribute: data => dispatch(changeAttribute(data)),
		calcTotal: () => dispatch(calcTotal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListContainer)