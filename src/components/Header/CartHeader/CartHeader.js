import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { calcTotal, increaseQuantity, decreaseQuantity, changeAttribute } from '../../Cart/cartSlice'
import { id } from '../../../services/service'
import AttributeButtons from '../../ProductPage/AttributeButtons'
import './CartHeader.scss'

class CartHeader extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cartShown: false,
		}
	}

	domNodeRef = createRef();

	handleDocumentClick = e => {
		if (this.domNodeRef.current && !this.domNodeRef.current.contains(e.target)) {
			this.setState({
				//currencyShown: false,
				cartShown: false
			})
		}
	}
	showCartList = () => {
		this.setState({ cartShown: !this.state.cartShown });
		let body = document.getElementsByTagName('body')
		if (!this.state.cartShown) {
			body[0].style.overflow = "hidden"
		} else {
			body[0].style.overflow = "visible"
		}
	}

	increaseQuantity = item => {
		this.props.dispatch(increaseQuantity(item))
		this.props.dispatch(calcTotal())
	}

	decreaseQuantity = item => {
		this.props.dispatch(decreaseQuantity(item))
		this.props.dispatch(calcTotal())
	}

	componentDidUpdate(prevProps) {
		if (this.props.currentCurrency !== prevProps.currentCurrency) {
			this.props.dispatch(calcTotal())
		}
	}

	render() {
		const cartList = this.state.cartShown
		console.log('cartHeader props:', this.props);

		//RENDER ITEMS IN THE CART
		const cartlist = this.props.cartList.map(item => {
			console.log('item:', item);
			const priceArr = item.prices
			let amount
			priceArr.forEach(price => {
				if (price.currency.symbol === this.props.currentCurrency) {
					amount = price.amount
				}
				return amount
			})

			return <li key={id()} className="cart-list__item cart-item">
				<div className="cart-item_left">
					<div className="cart_item__text">
						<div className="cart-item__title">{item.brand} {item.name}</div>
						<div className="cart-item__price">{this.props.currentCurrency}{amount}</div>
					</div>

					<div className="cart-item__size-options">
						<AttributeButtons blockSize={{ minWidth: '24px', height: '24px', fontSize: '14px', gap: '8px' }} attribute={item.attributes[0]} item={item} />
					</div>
				</div>

				<div className="cart-item_right">
					<div className="cart_item__img">
						<img src={item.gallery[0]} alt="img" className='cart__img' />
					</div>
					<div className="cart-item__actions">
						<div className="cart-item_button _add-small" onClick={() => this.increaseQuantity({ id: item.id, attr: item.attr })}></div>
						<div className="cart-item__quantity">{item.quantity}</div>
						<div className="cart-item_button _decrease-small" onClick={() => this.decreaseQuantity({ id: item.id, attr: item.attr })}></div>
					</div>
				</div>
			</li>
		})

		return (
			<div className="actions-header__item cart-header" onClick={this.showCartList} >
				<div className="cart-header__icon" />
				<div className={classNames('cart-header__icon_items-quantity', { 'hidden': this.props.totalItems === 0 })}>{this.props.totalItems}</div>

				{
					cartList
						? <div className='cart-header__body_fade' >
							<div className="cart-header__body" onClick={e => e.stopPropagation()}>
								<div className="cart-list__title"><span>My bag,</span> {this.props.totalItems} items</div>
								<ul className="cart-header__list cart-list">
									{cartlist}
								</ul>
								<div className="cart-header__price cart-price">
									<span className="cart-price_text-left">Total:</span>
									<span className="cart-price_text-right">{this.props.currentCurrency}{this.props.total}</span>
								</div>

								<div className="cart-header__buttons">
									<button className="cart__button _white-btn"><Link to="/cart">view bag</Link></button>
									<button className="cart__button _green-btn">check out</button>
								</div>
							</div>
						</div>
						: null
				}
			</div >

		)
	}

}

const mapStateToProps = state => {
	return {
		cartList: state.cart.cartList,
		currentCurrency: state.cart.currentCurrency,
		total: state.cart.total,
		totalItems: state.cart.totalItems,
	}
}

export default connect(mapStateToProps)(CartHeader)