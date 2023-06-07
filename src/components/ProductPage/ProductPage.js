import ProductPageImages from './ProductPageImages/ProductPageImages'
import ProductPageDescription from './ProductPageDescription/ProductPageDescription'
import './ProductPage.scss'

const ProductPage = props => {
	return (
		<>
			<div className="product-page">
				<ProductPageImages images={props.gallery} />
				<div className="product-info">
					<ProductPageDescription {...props} />
				</div>
			</div>
		</>
	)
}


export default ProductPage