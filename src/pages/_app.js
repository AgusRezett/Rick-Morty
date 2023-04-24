import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import withRedux from 'next-redux-wrapper';
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<Analytics />
		</Provider>
	);
}

const makeStore = () => store;

export default withRedux(makeStore)(App);
