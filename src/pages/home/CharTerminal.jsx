import React, { useState } from 'react';

// Styles
import eterminal from '../../styles/Eterminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';
import CharDetailsCard from './CharDetailsCard';

// Redux
import { connect } from 'react-redux';
import { setCharacters, addFavourite, removeFavourite } from '../../redux/actions';

function CharTerminal({
	visible,
	setVisible,
	typeOf,
	characters,
	setCharacters,
	favourites,
	addFavourite,
	removeFavourite,
}) {
	const [selectedCharacterId, setSelectedCharacterId] = useState();
	const [charDetailsCardVisible, setCharDetailsCardVisible] = useState(false);

	return (
		<div style={{ right: !visible && '-100%' }} className={eterminal.windowContainer}>
			<div className={eterminal.header} style={{ position: !visible && 'absolute', right: !visible && '-100%' }}>
				<h3>@_criminalsDb-Terminal</h3>
				{/* <p>{JSON.stringify(myFavorites)}</p> */}
			</div>
			{typeOf === 1 ? (
				<GlobalCharacters
					setVisible={setVisible}
					characters={characters}
					setCharacters={setCharacters}
					setSelectedCharacterId={setSelectedCharacterId}
					setCharDetailsCardVisible={setCharDetailsCardVisible}
				/>
			) : (
				<SelectedCharacters
					setVisible={setVisible}
					favourites={favourites}
					addFavourite={addFavourite}
					removeFavourite={removeFavourite}
					setSelectedCharacterId={setSelectedCharacterId}
					setCharDetailsCardVisible={setCharDetailsCardVisible}
				/>
			)}

			<CharDetailsCard
				visible={charDetailsCardVisible}
				setVisible={setCharDetailsCardVisible}
				charInfo={selectedCharacterId}
			/>
		</div>
	);
}

const GlobalCharacters = ({
	setVisible,
	characters,
	setCharacters,
	setSelectedCharacterId,
	setCharDetailsCardVisible,
}) => {
	const openCharCard = (char) => {
		setSelectedCharacterId(char);
		setCharDetailsCardVisible(true);
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
					characters.results?.map((char) => (
						<div
							className={eterminal.register}
							style={{
								backgroundColor:
									char.status === 'Dead' ? '#4b000099' : char.status === 'unknown' && '#00585799',
							}}
							onClick={() => openCharCard(char)}
							key={char.id}
						>
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
					))}
			</div>
		</>
	);
};

const SelectedCharacters = ({
	setVisible,
	favourites,
	addFavourite,
	removeFavourite,
	setSelectedCharacterId,
	setCharDetailsCardVisible,
}) => {
	const openCharCard = (char) => {
		setSelectedCharacterId(char);
		setCharDetailsCardVisible(true);
	};

	const closeWindow = () => {
		setVisible(false);
	};

	return (
		<>
			<div className={eterminal.header} style={{ position: 'absolute' }}>
				<h3>@_wantedCriminals-Terminal</h3>
				<span className={eterminal.pagination}>
					Sort
					<div className={eterminal.sortingColumn}>
						<span className={eterminal.sortingButton}>▲</span>
						<span className={eterminal.sortingButton}>▼</span>
					</div>
				</span>
				<span onClick={closeWindow} className={eterminal.closeButton}>
					X
				</span>
			</div>
			<div className={eterminal.registerContainerColumn}>
				{favourites?.map((char) => (
					<div
						className={eterminal.register}
						style={{
							backgroundColor:
								char.status === 'Dead' ? '#4b000099' : char.status === 'unknown' && '#00585799',
						}}
						onClick={() => openCharCard(char)}
						key={char.id}
					>
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
				))}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	characters: state.main.characters,
	favourites: state.main.favourites,
});

const mapDispatchToProps = {
	setCharacters: setCharacters,
	addFavourite: addFavourite,
	removeFavourite: removeFavourite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharTerminal);
