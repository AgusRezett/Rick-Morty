import React, { useEffect, useState } from 'react';

// Styles
import home from '../../styles/Home.module.css';
import charterminal from '../../styles/CharTerminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';
import Draggable from 'react-draggable';
import { Rings } from 'react-loader-spinner';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

export const CharDetailsCard = (props) => {
	const { visible, setVisible, charInfo, myFavorites, addFav, removeFav, getAllBands } = props;
	const [isFav, setIsFav] = useState(false);

	const closeWindow = () => {
		setVisible(false);
	};

	const handleFavorite = () => {
		console.log('hols');
		getAllBands();
		//isFav ? removeFav(charInfo.id) : addFav(charInfo);
	};

	/* useEffect(() => {
		myFavorites?.forEach((fav) => {
			if (fav.id === charInfo.id) {
				setIsFav(true);
			}
		});
	}, [myFavorites]); */

	const consoleWarn = console.warn;
	const SUPPRESSED_WARNINGS = ['Warning: findDOMNode is deprecated in StrictMode.'];

	console.warn = function filterWarnings(msg, ...args) {
		if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
			consoleWarn(msg, ...args);
		}
	};

	return (
		<Draggable defaultPosition={{ x: 0, y: 0 }} position={null} grid={[25, 25]} scale={1}>
			<div style={{ bottom: !visible ? '-100%' : '100px' }} className={charterminal.windowContainer}>
				<div className={charterminal.header} style={{ position: 'absolute' }}>
					<h3>@_criminal@Details</h3>

					<span onClick={closeWindow} className={charterminal.closeButton}>
						X
					</span>
				</div>
				{charInfo && (
					<div className={charterminal.detailsContainer}>
						<div className={charterminal.imageContainer}>
							<Rings
								height="150"
								width="150"
								color="#4fa94d"
								radius="6"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
								ariaLabel="rings-loading"
							/>
							<Image
								src={charInfo.image}
								width={150}
								height={150}
								className={charterminal.imagePhoto}
								alt={`${charInfo.name} image photo`}
							/>
						</div>
						<h2 className={charterminal.detailRow}>{charInfo.name}</h2>
						<p className={charterminal.detailRow}>Specie: {charInfo.species}</p>
						<p className={charterminal.detailRow}>
							Gender:{' '}
							{charInfo.gender === 'Male'
								? '♂'
								: charInfo.gender === 'Female'
								? '♀'
								: charInfo.gender === 'Genderless'
								? '⚤'
								: '�'}
						</p>
						<p className={charterminal.detailRow}>Origin: {charInfo.origin.name}</p>
						<p className={charterminal.detailRow}>Last seen: {charInfo.location.name}</p>
						<span className={charterminal.searchingStatusRow}>
							<div onClick={handleFavorite} className={charterminal.searchingStatusContainer}>
								<div
									className={`${charterminal.searchingStatusContent} ${isFav && charterminal.active}`}
									/* style={{ width: '6px', height: '6px' }} */
								></div>
							</div>
							<p>Active searching</p>
						</span>
					</div>
				)}
			</div>
		</Draggable>
	);
};

export const mapStateToProps = (state) => {
	return {
		bands: state.bands,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		getAllBands: () => dispatch(actions.getAllBands()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharDetailsCard);

/* export const mapStateToProps = (state) => {
	return {
		myFavorites: state.myFavorites,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		addFav: (character) => dispatch(actions.addFav(character)),
		removeFav: (id) => dispatch(actions.removeFav(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharDetailsCard); */
