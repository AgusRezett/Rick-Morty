import React, { useEffect, useState } from 'react';

// Styles
import charterminal from '../../styles/CharTerminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';

// Functions

export const CharDetailsCard = ({ visible, setVisible, charInfo }) => {
	const closeWindow = () => {
		setVisible(false);
	};

	return (
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
						<Image src={charInfo.image} width={150} height={150} className={charterminal.imagePhoto} />
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
				</div>
			)}
		</div>
	);
};
