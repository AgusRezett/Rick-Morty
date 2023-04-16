import React, { useEffect, useState } from 'react';

// Styles
import eterminal from '../../styles/Eterminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';
import CharDetailsCard from './CharDetailsCard';
import Draggable from 'react-draggable';

// Redux
import { connect } from 'react-redux';
import { setCharacters, setCharCardVisible, setCharCardInfo, addFavourite, removeFavourite } from '../../redux/actions';

function CharSearcher({
	visible,
	setVisible,
	favourites,
	addFavourite,
	removeFavourite,

	selectedCharCard,
	setCharCardInfo,
	setCharCardVisible,
}) {
	const [searchCharValue, setSearchCharValue] = useState('');
	const [selectedSearchChar, setSelectedSearchChar] = useState();

	const openCharCard = (char) => {
		setCharCardInfo(char);
		setCharCardVisible(true);
	};

	const closeWindow = () => {
		setVisible(false);
	};

	useEffect(() => {
		searchCharValue
			? axios.get(`https://rickandmortyapi.com/api/character/${searchCharValue}`).then((res) => {
					//console.log(res);
					setSelectedSearchChar(res.data);
			  })
			: setSelectedSearchChar();
	}, [searchCharValue]);

	const nodeRef = React.useRef(null);

	return (
		<Draggable nodeRef={nodeRef} defaultPosition={{ x: -500, y: 450 }} position={null} grid={[25, 25]} scale={1}>
			<div
				style={{ right: !visible && '-100%', width: '600px', height: 'fit-content' }}
				className={eterminal.windowContainer}
			>
				<div
					ref={nodeRef}
					className={eterminal.header}
					style={{ position: !visible && 'absolute', right: !visible && '-100%' }}
				>
					<h3>@_criminalsDb-Terminal</h3>
					{/* <p>{JSON.stringify(myFavorites)}</p> */}
				</div>

				<div className={eterminal.header} style={{ position: 'absolute' }}>
					<h3>@_searchCriminal-Terminal</h3>
					<span className={eterminal.searchCharContainer}>
						<p>criminal@ID: </p>
						<input
							type="number"
							value={searchCharValue}
							onChange={(e) =>
								searchCharValue.length < 3
									? setSearchCharValue(e.target.value)
									: setSearchCharValue(e.target.value.slice(0, 3))
							}
							maxLength={3}
						/>
					</span>
					<span onClick={closeWindow} className={eterminal.closeButton}>
						X
					</span>
				</div>
				<div className={eterminal.registerContainerColumn} style={{ marginTop: '50px' }}>
					{selectedSearchChar ? (
						selectedSearchChar.name && (
							<div
								className={eterminal.register}
								style={{
									backgroundColor:
										selectedSearchChar.status === 'Dead'
											? '#4b000099'
											: selectedSearchChar.status === 'unknown' && '#00585799',
								}}
								onClick={() => openCharCard(selectedSearchChar)}
								key={selectedSearchChar.id}
							>
								<Image
									src={selectedSearchChar.image}
									width={100}
									height={100}
									className={eterminal.registerPhoto}
									alt={`${selectedSearchChar.name} image photo`}
									style={{
										filter:
											selectedSearchChar.status === 'Dead'
												? 'sepia(1) hue-rotate(310deg) contrast(0.9) saturate(1.5)'
												: selectedSearchChar.status === 'unknown' &&
												  'sepia(1) hue-rotate(120deg) contrast(0.9) saturate(1.5)',
									}}
								/>
								<div
									style={{
										color:
											selectedSearchChar.status === 'Dead'
												? 'red'
												: selectedSearchChar.status === 'unknown' && '#00d0ff',
									}}
								>
									<h3>{selectedSearchChar.name}</h3>
									<p>Status: {selectedSearchChar.status}</p>
									<p>Origin: {selectedSearchChar.origin.name}</p>
									<p>Last seen: {selectedSearchChar.location.name}</p>
								</div>
							</div>
						)
					) : (
						<h3>No hay búsquedas</h3>
					)}
				</div>
			</div>
		</Draggable>
	);
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CharSearcher);
