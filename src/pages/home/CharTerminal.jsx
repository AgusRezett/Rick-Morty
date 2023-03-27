import React, { useEffect, useState } from 'react';

// Styles
import eterminal from '../../styles/Eterminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';

// Functions

export const CharTerminal = ({ visible, setVisible }) => {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		axios.get('https://rickandmortyapi.com/api/character').then((res) => {
			setCharacters(res.data);
		});

		return () => {};
	}, []);

	return (
		<div style={{ right: !visible && '-100%' }} className={eterminal.windowContainer}>
			<div className={eterminal.header} style={{ position: !visible && 'absolute', right: !visible && '-100%' }}>
				<h3>@_criminalsDb-Terminal</h3>
			</div>
			<div className={eterminal.header} style={{ position: 'absolute' }}>
				<h3>@_criminalsDb-Terminal</h3>
			</div>
			<div id="content"></div>
			<div className={eterminal.registerContainer}>
				{characters.results &&
					characters.results.map((char) => (
						<div
							className={eterminal.register}
							style={{
								backgroundColor:
									char.status === 'Dead' ? '#4b000073' : char.status === 'unknown' && '#005857d9',
							}}
						>
							<Image
								src={char.image}
								width={100}
								height={100}
								className={eterminal.registerPhoto}
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
		</div>
	);
};
