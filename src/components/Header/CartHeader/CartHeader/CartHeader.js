import { Link } from 'react-router-dom'
import CartIcon from './CartIcon/CartIcon'
import CartHeaderListItem from './CartHeaderListItem/CartHeaderListItem'
import './CartHeader.scss'

const CartHeader = props => {
	const cartlist = props.cartList.map(item => {
		return (
			<CartHeaderListItem
				key={item.id}
				item={item}
				currentCurrency={props.currentCurrency}
				increaseQuantity={props.increaseQuantity}
				decreaseQuantity={props.decreaseQuantity}
				setSelected={props.setSelected}
			/>
		)
	}
	)

	return (
		<div className="actions-header__item cart-header" onClick={props.showCartList} >
			<CartIcon totalItems={props.totalItems} />

			{props.cartShown &&
				<div className='cart-header__body_fade' >
					<div className="cart-header__body" onClick={e => e.stopPropagation()}>
						<div className="cart-list__title"><span>My bag,</span> {props.totalItems} items</div>
						<ul className="cart-header__list cart-list">
							{cartlist}
						</ul>
						<div className="cart-header__price cart-price">
							<span className="cart-price_text-left">Total:</span>
							<span className="cart-price_text-right">{props.currentCurrency}{props.total}</span>
						</div>

						<div className="cart-header__buttons">
							<button className="cart__button _white-btn"><Link to="/cart">view bag</Link></button>
							<button className="cart__button _green-btn">check out</button>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default CartHeader