import './CartItemControlButtons.scss'

const CartItemControlButtons = props => {
	return (
		<div className="cart-page_item__actions">
			<button className="cart-page_item_button _add"
				onClick={() => props.increaseQuantity({ id: props.id, attr: props.attr })} />
			<div className="cart-page_item__quantity">{props.quantity}</div>
			<button className="cart-page_item_button _decrease"
				onClick={() => props.decreaseQuantity({ id: props.id, attr: props.attr })} />
		</div>
	)
}

export default CartItemControlButtons