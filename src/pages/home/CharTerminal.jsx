import React, { useEffect, useState } from 'react';

// Styles
import eterminal from '../../styles/Eterminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';
import { CharDetailsCard } from './CharDetailsCard';

// Redux
//import { connect } from 'react-redux';
//import { removeFav } from '../../redux/actions/actions';

import { useSelector } from 'react-redux';

export const CharTerminal = ({ visible, setVisible, myFavorites, removeFav }) => {
	//const [characters, setCharacters] = useState([]);
	//const { characters } = useSelector((state) => state);
	//const [favoriteCharacters, setFavoriteCharacters] = useState([]);
	const [selectedCharacterId, setSelectedCharacterId] = useState();
	const [charDetailsCardVisible, setCharDetailsCardVisible] = useState(false);

	/* const onDeleteFav = (id) => {
		setFavoriteCharacters((oldChars) => {
			return oldChars.filter((character) => character.id !== id);
		});
	}; */

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
		<div style={{ right: !visible && '-100%' }} className={eterminal.windowContainer}>
			<div className={eterminal.header} style={{ position: !visible && 'absolute', right: !visible && '-100%' }}>
				<h3>@_criminalsDb-Terminal</h3>
				<p>{JSON.stringify(myFavorites)}</p>
			</div>
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
									char.status === 'Dead' ? '#4b000073' : char.status === 'unknown' && '#005857d9',
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
			<CharDetailsCard
				visible={charDetailsCardVisible}
				setVisible={setCharDetailsCardVisible}
				charInfo={selectedCharacterId}
				//onDeleteFav={onDeleteFav}
				removeFav={removeFav}
				myFavorites={myFavorites}
			/>
		</div>
	);
};

export default CharTerminal;

/* function mapState(state) {
	return {
		myFavorites: state.myFavorites,
	};
}
function mapDispatch(dispatch) {
	return {
		removeFav: (id) => dispatch(removeFav(id)),
	};
}

export default connect(mapState, mapDispatch)(CharTerminal); */
