import React, { useState } from 'react';

// Styles
import eterminal from '../../styles/Eterminal.module.css';
import charterminal from '../../styles/CharTerminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';
import CharDetailsCard from './CharDetailsCard';

// Redux
import { connect } from 'react-redux';
import { setCharacters, setCharCardVisible, setCharCardInfo, addFavourite, removeFavourite } from '../../redux/actions';

function CharTerminal({
	visible,
	setVisible,
	typeOf,
	characters,
	setCharacters,
	favourites,
	addFavourite,
	removeFavourite,
	setCharCardInfo,
	setCharCardVisible,
}) {
	return (
		<div style={{ right: !visible && '-100%' }} className={eterminal.windowContainer}>
			<div className={eterminal.header} style={{ position: !visible && 'absolute', right: !visible && '-100%' }}>
				<h3>@_criminalsDb-Terminal</h3>
			</div>
			{typeOf === 1 ? (
				<GlobalCharacters
					setVisible={setVisible}
					characters={characters}
					favourites={favourites}
					addFavourite={addFavourite}
					removeFavourite={removeFavourite}
					setCharacters={setCharacters}
					setCharCardInfo={setCharCardInfo}
					setCharCardVisible={setCharCardVisible}
				/>
			) : (
				<SelectedCharacters
					setVisible={setVisible}
					favourites={favourites}
					addFavourite={addFavourite}
					removeFavourite={removeFavourite}
					setCharCardInfo={setCharCardInfo}
					setCharCardVisible={setCharCardVisible}
				/>
			)}
		</div>
	);
}

const GlobalCharacters = ({
	setVisible,
	characters,
	favourites,
	addFavourite,
	removeFavourite,
	setCharacters,
	setCharCardInfo,
	setCharCardVisible,
}) => {
	const handleFavorite = (char) => {
		if (favourites.includes(char)) {
			removeFavourite(char.id);
		} else {
			addFavourite(char);
		}
	};

	const openCharCard = (char, origin) => {
		if (!origin.target.className.includes('searchingStatusContainer')) {
			if (!origin.target.className.includes('searchingStatusContent')) {
				setCharCardInfo(char);
				setCharCardVisible(true);
			}
		}
	};

	const closeWindow = () => {
		setVisible(false);
	};

	const fetchNextPage = () => {
		axios.get(characters.info.next).then((res) => {
			setCharacters(res.data);
		});
	};

	const fetchPrevPage = () => {
		axios
			.get(characters.info.prev)
			.then((res) => {
				setCharacters(res.data);
			})
			.catch((err) => {});
	};

	return (
		<>
			<div className={eterminal.header} style={{ position: 'absolute' }}>
				<h3>@_criminalsDb-Terminal</h3>
				<div className={eterminal.pagination}>
					<span
						className={
							characters?.info && characters.info.prev
								? eterminal.paginationButton
								: eterminal.paginationButtonDisabled
						}
						onClick={fetchPrevPage}
					>
						{'<<'}
					</span>
					<span
						className={
							characters?.info && characters.info.next
								? eterminal.paginationButton
								: eterminal.paginationButtonDisabled
						}
						onClick={fetchNextPage}
					>
						{'>>'}
					</span>
				</div>
				<span onClick={closeWindow} className={eterminal.closeButton}>
					X
				</span>
			</div>
			<div className={eterminal.registerContainer}>
				{characters?.results &&
					characters.results?.map((char) => {
						return (
							<div
								className={eterminal.register}
								style={{
									backgroundColor:
										char.status === 'Dead' ? '#4b000099' : char.status === 'unknown' && '#00585799',
								}}
								onClick={(e) => openCharCard(char, e)}
								key={char.id}
							>
								<div
									onClick={() => handleFavorite(char)}
									style={{ border: '2px solid #21d94354' }}
									className={`${charterminal.searchingStatusContainer} ${charterminal.searchingStatusContainerScaled}`}
								>
									<div
										className={`${charterminal.searchingStatusContent} ${
											favourites.includes(char) && charterminal.activeScaled
										}`}
									></div>
								</div>
								<Image
									src={char.image}
									width={100}
									height={100}
									className={eterminal.registerPhoto}
									alt={`${char.name} image photo`}
									style={{
										filter:
											char.status === 'Dead'
												? 'sepia(1) hue-rotate(310deg) contrast(0.9) saturate(1.5)'
												: char.status === 'unknown' &&
												  'sepia(1) hue-rotate(120deg) contrast(0.9) saturate(1.5)',
									}}
								/>
								<p
									style={{
										color: char.status === 'Dead' ? 'red' : char.status === 'unknown' && '#00d0ff',
									}}
								>
									{char.name.toLowerCase()}
								</p>
							</div>
						);
					})}
			</div>
		</>
	);
};

const SelectedCharacters = ({
	setVisible,
	favourites,
	addFavourite,
	removeFavourite,
	setCharCardInfo,
	setCharCardVisible,
}) => {
	const handleFavorite = (char) => {
		if (favourites.includes(char)) {
			removeFavourite(char.id);
		} else {
			addFavourite(char);
		}
	};

	const openCharCard = (char, origin) => {
		if (!origin.target.className.includes('searchingStatusContainer')) {
			if (!origin.target.className.includes('searchingStatusContent')) {
				setCharCardInfo(char);
				setCharCardVisible(true);
			}
		}
	};

	const closeWindow = () => {
		setVisible(false);
	};

	return (
		<>
			<div className={eterminal.header} style={{ position: 'absolute' }}>
				<h3>@_wantedCriminals-Terminal</h3>
				{/* <span className={eterminal.pagination}>
					Sort
					<div className={eterminal.sortingColumn}>
						<span className={eterminal.sortingButton}>▲</span>
						<span className={eterminal.sortingButton}>▼</span>
					</div>
				</span> */}
				<span onClick={closeWindow} className={eterminal.closeButton}>
					X
				</span>
			</div>
			<div className={eterminal.registerContainerColumn}>
				{favourites.length > 0 ? (
					favourites.map((char) => (
						<div
							className={eterminal.register}
							style={{
								backgroundColor:
									char.status === 'Dead' ? '#4b000099' : char.status === 'unknown' && '#00585799',
							}}
							onClick={(e) => openCharCard(char, e)}
							key={char.id}
						>
							<div
								onClick={() => handleFavorite(char)}
								style={{ border: '2px solid #21d94354' }}
								className={`${charterminal.searchingStatusContainer} ${charterminal.searchingStatusContainerScaled} ${charterminal.searchingStatusFavContainer}`}
							>
								<div
									className={`${charterminal.searchingStatusContent} ${
										favourites.includes(char) && charterminal.activeScaled
									}`}
								></div>
							</div>
							<Image
								src={char.image}
								width={100}
								height={100}
								className={eterminal.registerPhoto}
								alt={`${char.name} image photo`}
								style={{
									filter:
										char.status === 'Dead'
											? 'sepia(1) hue-rotate(310deg) contrast(0.9) saturate(1.5)'
											: char.status === 'unknown' &&
											  'sepia(1) hue-rotate(120deg) contrast(0.9) saturate(1.5)',
								}}
							/>
							<div
								style={{
									color: char.status === 'Dead' ? 'red' : char.status === 'unknown' && '#00d0ff',
								}}
							>
								<h3>{char.name}</h3>
								<p>Status: {char.status}</p>
								<p>Origin: {char.origin.name}</p>
								<p>Last seen: {char.location.name}</p>
							</div>
						</div>
					))
				) : (
					<h3>No hay registros añadidos</h3>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	characters: state.main.characters,
	favourites: state.main.favourites,
	selectedCharCard: state.main.selectedCharCard,
});

const mapDispatchToProps = {
	setCharacters: setCharacters,
	setCharCardVisible: setCharCardVisible,
	setCharCardInfo: setCharCardInfo,
	addFavourite: addFavourite,
	removeFavourite: removeFavourite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharTerminal);
