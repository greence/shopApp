import { Component, createRef } from 'react'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { changeCurrentCurrency } from '../../Cart/cartSlice'
import './CurrenciesList.scss'

class CurrenciesList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currencyShown: false,
			currencies: [],
		}
	}

	domNodeRef = createRef();

	handleDocumentClick = e => {
		if (this.domNodeRef.current && !this.domNodeRef.current.contains(e.target)) {
			this.setState({
				currencyShown: false,
			})
		}
	}

	//QUERY CURRENCY DATA FROM SERVER
	getCurrency = () => {
		this.props.client.query({
			query: gql`
				{
					currencies {
						label
						symbol
					}
				}`
		})
			.then(result => {
				this.setState({
					currencies: result.data.currencies,
				})
			})
	}

	//LAUNCH QUERY OF CURRENCIES LIST AFTER FINISHING PAGE RENDER
	componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, true)
		this.getCurrency()
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, true)
	}

	render() {
		const currencyList = this.state.currencyShown
		//CREATE CURRENCY lIST FROM PROPS
		const currenciesList = this.state.currencies.map(currency =>
			<li
				key={currency.label}
				className="currency-list_item"
				onClick={() => this.props.dispatch(changeCurrentCurrency(currency.symbol))}>
				{currency.symbol} {currency.label}
			</li>)


		return (
			<div className="actions-header__item currency-header" onClick={() => this.setState({ currencyShown: !this.state.currencyShown })} ref={this.domNodeRef}>
				<span className="currency-header__item_currency">{this.props.currentCurrency}</span>
				<span className={classNames("currency-header__item_vector-down", { 'is-opened': this.state.currencyShown }, { 'is-closed': !this.state.currencyShown })} />
				{currencyList
					? <div className='currency-header__body'>
						<ul className="currency-header__list currency-list">
							{currenciesList}
						</ul>
					</div>
					: null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentCurrency: state.cart.currentCurrency,
	}
}

export default connect(mapStateToProps)(CurrenciesList)