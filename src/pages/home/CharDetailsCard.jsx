import React, { useEffect, useState } from 'react';

// Styles
import home from '../../styles/Home.module.css';
import charterminal from '../../styles/CharTerminal.module.css';

// Components
import Image from 'next/image';
import axios from 'axios';
import Draggable from 'react-draggable';
import { Rings } from 'react-loader-spinner';

// Functions

export const CharDetailsCard = ({ visible, setVisible, charInfo }) => {
	const closeWindow = () => {
		setVisible(false);
	};

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
							<div className={charterminal.searchingStatusContainer}>
								<div
									className={`${charterminal.searchingStatusContent} ${charterminal.active}`}
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
