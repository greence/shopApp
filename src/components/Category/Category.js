import classNames from "classnames"
import { Link } from 'react-router-dom'
import './Category.scss'

const Category = props => {
	const filteredProducts = props.products.filter(item => {
		return (
			props.category === 'all'
				? props.products
				: item.category === props.category
		)
	})

	const productList = filteredProducts.map(product => {
		const priceArr = product.prices
		let amount
		priceArr.forEach(price => {
			if (price.currency.symbol === props.currentCurrency) {
				amount = price.amount
			}
			return amount
		})

		const span = !product.inStock && <span className="item_not-avaliable">out of stock</span>

		return (
			<li className="product__list-item" key={product.name + product.brand}>
				<img src={product.gallery[0]} alt={product.name} className={classNames("item__img", { "_out-of-stock_img": !product.inStock })} />
				<button
					className={classNames("item__button-add-to-cart", { "hidden": !props.isTouchDevice() })}
					onClick={() => product.inStock && props.addToCart(product)} />
				{span}
				<div className={classNames("item__description", { '_out-of-stock_text': !product.inStock })}>
					<div className="item__title">
						<Link to={product.id} className="item__title">
							{product.brand} {product.name}
						</Link>
					</div>
					<div className="item__price">{props.currentCurrency} {amount}</div>
				</div>
			</li>)
	})

	return (
		<>
			<h1 className="title">{props.category}</h1>
			<ul className="product_list">
				{productList}
			</ul>
		</>
	)
}

export default Category