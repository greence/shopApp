import { NavLink } from 'react-router-dom'
import './MenuCategories.scss'

const MenuCategories = props => {
	const categoriesList = props.allCategories.map(category =>
		<NavLink
			to={category.name}
			key={category.name}
			className="menu_item"
			onClick={() => props.setCategory(category.name)} >
			{category.name}
		</NavLink>
	)
	return (
		<ul className="menu__list">
			{categoriesList}
		</ul>
	)
}

export default MenuCategories