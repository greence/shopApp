import { Component } from 'react'
import classNames from 'classnames'

class CartIcon extends Component {

	render() {

		return (
			<>
				<div className="cart-header__icon" />
				<div className={classNames('cart-header__icon_items-quantity', { 'hidden': this.props.totalItems === 0 })}>{this.props.totalItems}</div>
			</>

		)
	}

}

export default CartIcon