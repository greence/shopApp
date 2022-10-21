import { Component } from 'react'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCategory } from '../../Category/productSlice'
import './Categories.scss'

class Categories extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: []
		}
	}

	getCategories = () => {
		this.props.client.query({
			query: gql`
				{
					categories {
						name
					}
				}`
		})
			.then(result => this.setState({
				categories: result.data.categories
			}))
	}

	componentDidMount() {
		this.getCategories()
	}

	render() {
		const categoriesList = this.state.categories.map(category =>
			<NavLink to={category.name} key={category.name} className="menu_item" onClick={() => this.props.dispatch(setCategory(category.name))} >
				{category.name}
			</NavLink>
		)
		return <ul className="menu__list">
			{categoriesList}
		</ul>
	}
}

const mapStateToProps = state => {
	return {
		categories: state.products.category
	}
}

export default connect(mapStateToProps)(Categories)