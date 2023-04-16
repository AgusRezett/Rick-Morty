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
import { addFavourite, removeFavourite } from '../../redux/actions';

const CharDetailsCard = ({ visible, setVisible, charInfo, favourites, addFavourite, removeFavourite }) => {
	const [isFav, setIsFav] = useState(false);

	const closeWindow = () => {
		setVisible(false);
	};

	const handleFavorite = () => {
		if (isFav) {
			setIsFav(false);
			removeFavourite(charInfo.id);
		} else {
			setIsFav(true);
			addFavourite(charInfo);
		}
	};

	useEffect(() => {
		setIsFav(false);
		favourites &&
			charInfo &&
			favourites.forEach((fav) => {
				if (fav.id === charInfo.id) {
					setIsFav(true);
				}
			});
	}, [favourites, charInfo]);

	/* const consoleWarn = console.warn;
	const SUPPRESSED_WARNINGS = ['Warning: findDOMNode is deprecated in StrictMode.'];

	console.warn = function filterWarnings(msg, ...args) {
		if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
			consoleWarn(msg, ...args);
		}
	}; */

	const nodeRef = React.useRef(null);

	return (
		<Draggable nodeRef={nodeRef} defaultPosition={{ x: 0, y: 0 }} position={null} grid={[25, 25]} scale={1}>
			<div
				ref={nodeRef}
				style={{ bottom: !visible ? '-100%' : '100px' }}
				className={charterminal.windowContainer}
			>
				<div className={charterminal.header} style={{ position: 'absolute' }}>
					<h3>@_criminal@Details</h3>

					<span onClick={closeWindow} className={charterminal.closeButton}>
						X
					</span>
				</div>
				{charInfo && (
					<div className={charterminal.detailsContainer}>
						<div className={charterminal.imageContainer}>
							{isFav && (
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
							)}
							<Image
								src={charInfo.image}
								width={150}
								height={150}
								className={charterminal.imagePhoto}
								alt={`${charInfo.name} image photo`}
								style={{ borderRadius: isFav && '100%' }}
							/>
						</div>
						<h2 className={charterminal.detailRow}>{charInfo.name}</h2>
						<h3 className={charterminal.detailRow}>{charInfo.status}</h3>
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

const mapStateToProps = (state) => ({
	characters: state.main.characters,
	favourites: state.main.favourites,
});

const mapDispatchToProps = {
	addFavourite: addFavourite,
	removeFavourite: removeFavourite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharDetailsCard);
