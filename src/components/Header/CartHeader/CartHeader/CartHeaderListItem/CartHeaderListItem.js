import { id } from '../../../../../services/service'
import AttributeButtons from '../../../../ProductPage/ProductPageDescription/AttributeButtons/AttributeButtons'
import './CartHeaderListItem.scss'

const CartHeaderListItem = props => {
	const item = props.item
	const priceArr = item.prices
	let amount
	priceArr.forEach(price => {
		if (price.currency.symbol === props.currentCurrency) {
			amount = price.amount
		}
		return amount
	})

	const setSelected = data => {
		console.log(item.id);
		let newData = { id: item.id, ...data }
		props.setSelected(newData)
	}

	return (

		<li key={item.id} className="cart-list__item cart-item">
			<div className="cart-item_left">
				<div className="cart_item__text">
					<div className="cart-item__title">{item.brand} {item.name}</div>
					<div className="cart-item__price">{props.currentCurrency}{amount}</div>
				</div>

				<div className="cart-item__size-options">
					<AttributeButtons
						blockSize={{ minWidth: '24px', height: '24px', fontSize: '14px', gap: '8px' }}
						attribute={item.attributes[0]}
						selected={Object.values(item.attr)[0]}
						setSelected={setSelected}
						itemId={item.id}
					/>
				</div>
			</div>

			<div className="cart-item_right">
				<div className="cart_item__img">
					<img src={item.gallery[0]} alt="img" className='cart__img' />
				</div>
				<div className="cart-item__actions">
					<div className="cart-item_button _add-small" onClick={() => props.increaseQuantity({ id: item.id, attr: item.attr })}></div>
					<div className="cart-item__quantity">{item.quantity}</div>
					<div className="cart-item_button _decrease-small" onClick={() => props.decreaseQuantity({ id: item.id, attr: item.attr })}></div>
				</div>
			</div>
		</li>
	)
}

export default CartHeaderListItem