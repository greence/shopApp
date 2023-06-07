import store from "./store"
const baseUrl = 'http://localhost:4000/graphql?query='

export const getData = (query, actionCreator, field) => {
	fetch(`${baseUrl}+${query}`)
		.then(response => response.json())
		.then(data => {
			store.dispatch(actionCreator(data.data[field]))
			}
		)
}