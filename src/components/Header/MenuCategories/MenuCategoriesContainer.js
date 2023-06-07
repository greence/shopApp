import { Component } from 'react'
import { connect } from 'react-redux'
import { setCategory } from '../../Category/productSlice'
import { getData } from '../../../fetches'
import { setCategories } from '../../Category/productSlice'
import MenuCategories from './MenuCategories'

class MenuCategoriesContainer extends Component {
	componentDidMount() {
		const query = '{categories{name}}'
		getData(query, setCategories, 'categories')
	}

	render() {
		return (
			this.props.allCategories.length > 0 &&
			<MenuCategories
				categories={this.props.categories}
				allCategories={this.props.allCategories}
				setCategory={this.props.setCategory}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		categories: state.products.category,
		allCategories: state.products.allCategories
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setCategory: categoryName => {
			dispatch(setCategory(categoryName))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategoriesContainer)