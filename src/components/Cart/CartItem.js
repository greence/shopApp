import { cutTags } from '../../services/service'
import SliderComponent from './SliderComponent/SliderComponent'
import AttributeBlock from '../ProductPage/ProductPageDescription/AttributeBlock/AttributeBlock'
import CartItemControlButtons from './CartItemControlButtons/CartItemControlButtons'
import './CartItem.scss'

const CartItem = props => {
	const product = props.item
	const priceArr = product.prices
	let amount
	priceArr.forEach(price => {
		if (price.currency.symbol === props.currentCurrency) {
			amount = price.amount
		}
		return amount
	})


	Object.keys(product.attr).map(attr =>
		<AttributeBlock attributes={props.item.attributes[0]} selected={product.attr[attr]} />
	)



	const attrBlock = attributes => {
		let content = [];

		// for (let i = 0; i < props.item.attributes.length; i++) {
		// 	let k = [props.item.attributes[i]]
		// 	for (let selected in attributes) {
		// 		const item = attributes[selected];
		// 		content.push(<AttributeBlock attributes={k} selected={item} />)
		// 	}
		// }

		props.item.attributes.forEach(element => {
			console.log(element);
			for (let selected in attributes) {
				const item = attributes[selected];
				content.push(<AttributeBlock attributes={[element]} selected={item} />)
			}
		});
		return content
	}

	//console.log(props.item.attributes);
	return (

		<li className="cart-page_item">
			<div className="cart-page_item_left">
				<div className="cart-page_item__text">
					<div className="cart-page_item__title">
						{product.name}
					</div>
					<div className="cart-page_item__subtitle">
						{cutTags(product.description)}
					</div>
					<div className="cart-page_item__price">{props.currentCurrency}{amount}</div>
				</div>
				{/* {Object.keys(product.attr).map(attr =>
					<AttributeBlock attributes={props.item.attributes} selected={product.attr[attr]} />
				)} */}
				{/* {attrBlock(product.attr)} */}
				<AttributeBlock attributes={props.item.attributes} selected={product.attr} setSelected={props.setSelected} />
			</div>

			<div className="cart-page_item_right">
				<div className="cart-page_item__img">
					<SliderComponent product={product} />
				</div>
				<CartItemControlButtons
					id={product.id}
					attr={product.attr}
					quantity={product.quantity}
					increaseQuantity={props.increaseQuantity}
					decreaseQuantity={props.decreaseQuantity}
				/>
			</div>
		</li>
	)
}

export default CartItem