import { Component } from 'react'
import store from '../../store/index'
import { increaseQuantity, decreaseQuantity, calcTotal } from './cartSlice'
import { cutTags, id } from '../../services/service'
import './Cart.scss'

class CartItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeImage: 0,
			length: this.props.item.gallery.length
		}
	}

	nextImage = () => {
		this.setState({
			activeImage: this.state.activeImage >= this.state.length - 1 ? 0 : this.state.activeImage + 1
		})
	}

	prevImage = () => {
		this.setState({
			activeImage: this.state.activeImage === 0 ? this.state.length - 1 : this.state.activeImage - 1
		})
	}

	increaseQuantity = item => {
		store.dispatch(increaseQuantity(item))
		store.dispatch(calcTotal())
	}

	decreaseQuantity = item => {
		store.dispatch(decreaseQuantity(item))
		store.dispatch(calcTotal())
	}

	render() {
		const product = this.props.item

		//RENDER ATTRIBUTES' BLOCK
		let productAttr = product.attributes
		let attributes = productAttr.map(attribute => {

			let items = attribute.items.map(elem => {
				function setChecked() {
					for (let key in product.attr) {
						if (attribute.name === key && elem.id === product.attr[key]) {
							return true
						}
					}
				}

				return <label className="label-container" key={id()}>
					<input
						type="radio"
						name={product.name + ' ' + attribute.name + ' ' + product.attr[Object.keys(product.attr)[0]]}
						id={attribute.id}
						value={elem.id}
						defaultChecked={setChecked()}
						onClick={this.createCheckedObj}
					/>
					<span className="checkmark">{elem.displayValue}</span>
				</label>
			})

			return <div className="product__size-block size-block-cart" key={id()}>
				<h3 className='attribute-items__attribute-name'>{attribute.name}:</h3>
				<ul className="cart-page_item__attribute-items">
					{items}
				</ul>
			</div>
		})

		const images = product.gallery.map((elem, index) => {
			let activeImage = index === this.state.activeImage ? 'cart__image active' : 'cart__image'
			return (
				<div>
					<img src={elem} alt={elem} className={activeImage} key={id()} />
				</div>)
		})

		const arrows = this.state.length === 1
			? null
			: <div className="img_arrows">
				<button className="arrow arrow_left" onClick={this.prevImage}></button>
				<button className="arrow arrow_right" onClick={this.nextImage}></button>
			</div>

		const priceArr = product.prices
		let amount
		priceArr.forEach(price => {
			if (price.currency.symbol === this.props.currentCurrency) {
				amount = price.amount
			}
			return amount
		})

		return (
			<li className="cart-page_item" key={id()}>
				<div className="cart-page_item_left">
					<div className="cart-page_item__text">
						<div className="cart-page_item__title">
							{product.name}
						</div>
						<div className="cart-page_item__subtitle">
							{cutTags(product.description)}
						</div>
						<div className="cart-page_item__price">{this.props.currentCurrency}{amount}</div>
					</div>
					{attributes}
				</div>

				<div className="cart-page_item_right">
					<div className="cart-page_item__img">
						{images}
					</div>
					{arrows}
					<div className="cart-page_item__actions">
						<button className="cart-page_item_button _add" onClick={() => this.increaseQuantity({ id: product.id, attr: product.attr })}></button>
						<div className="cart-page_item__quantity">{product.quantity}</div>
						<button className="cart-page_item_button _decrease" onClick={() => this.decreaseQuantity({ id: product.id, attr: product.attr })}></button>
					</div>
				</div>
			</li>
		)
	}
}

export default CartItem