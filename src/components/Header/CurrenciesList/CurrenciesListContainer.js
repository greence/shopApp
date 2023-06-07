import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { getData } from '../../../fetches'
import { setCurrencies, changeCurrentCurrency } from '../../Cart/cartSlice'
import CurrenciesList from './CurrenciesList'

class CurrenciesListContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currencyShown: false,
		}
	}

	domNodeRef = createRef()

	handleDocumentClick = e => {
		if (this.domNodeRef.current && !this.domNodeRef.current.contains(e.target)) {
			this.setState({
				currencyShown: false,
			})
		}
	}

	componentDidMount() {
		const query = `
		{
			currencies{
				label 
				symbol
			}
		}`
		getData(query, setCurrencies, 'currencies')
		document.addEventListener('click', this.handleDocumentClick, true)
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, true)
	}

	changeCurrencyListState = () => {
		this.setState({ currencyShown: !this.state.currencyShown })
	}

	render() {
		return (
			this.props.allCurrencies.length > 0 &&
			<CurrenciesList
				allCurrencies={this.props.allCurrencies}
				currentCurrency={this.props.currentCurrency}
				currencyShown={this.state.currencyShown}
				changeCurrentCurrency={this.props.changeCurrentCurrency}
				changeCurrencyListState={this.changeCurrencyListState}
				domNodeRef={this.domNodeRef}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		allCurrencies: state.cart.allCurrencies,
		currentCurrency: state.cart.currentCurrency,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeCurrentCurrency: currentCurrency => dispatch(changeCurrentCurrency(currentCurrency))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesListContainer)