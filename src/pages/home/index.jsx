import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Styles
import styles from '../../styles/Home.module.css';
import menu from '../../styles/Menu.module.css';

// Components
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from 'next/router';
import CharTerminal from './CharTerminal';
import CharSearcher from './CharSearcher';
import Plate from '../../assets/svgs/placa.svg';
import CharDetailsCard from './CharDetailsCard';

// Redux
import { connect } from 'react-redux';
import { setCharacters, setCharCardVisible } from '../../redux/actions';

function Home({ setCharacters, favourites, selectedCharCard, setCharCardVisible }) {
	const [autoLogWritting, setAutoLogWritting] = useState(true);
	const [selectedOption, setSelectedOption] = useState(0);
	const [blockedMenu, setBlockedMenu] = useState(false);
	const router = useRouter();

	const [charSearcherVisible, setCharSearcherVisible] = useState(false);
	const [charTerminalVisible, setCharTerminalVisible] = useState(false);
	const [charTerminalTypeOf, setCharTerminalTypeOf] = useState(1);

	const options = [
		{
			value: 0,
			name: 'Show all',
			action: () => toggleCharTerminal(1),
		},
		{
			value: 1,
			name: 'List selected',
			action: () => toggleCharTerminal(2),
		},
		{
			value: 2,
			name: 'Search',
			action: () => toggleCharTerminal(3),
		},
		{
			value: 3,
			name: 'Exit console',
			action: () => {
				setCharCardVisible(false), router.back();
			},
		},
	];

	const toggleCharTerminal = (typeOf) => {
		if (typeOf === 3) {
			setCharSearcherVisible(!charSearcherVisible);
		} else {
			if (charTerminalVisible && charTerminalTypeOf === typeOf) {
				setCharTerminalVisible(false);
			} else if (charTerminalVisible && charTerminalTypeOf !== typeOf) {
				setCharTerminalVisible(false);
				setTimeout(() => {
					setCharTerminalTypeOf(typeOf);
					setCharTerminalVisible(true);
				}, 200);
			} else if (!charTerminalVisible) {
				setCharTerminalTypeOf(typeOf);
				setCharTerminalVisible(true);
			}
		}
	};

	const handleSelectOption = (option) => {
		setSelectedOption(option);
	};

	const handleArrowUp = () => {
		if (selectedOption > 0) {
			setSelectedOption(selectedOption - 1);
		}
	};

	const handleArrowDown = () => {
		if (selectedOption < options.length - 1) {
			setSelectedOption(selectedOption + 1);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'ArrowUp') {
			handleArrowUp();
		} else if (event.key === 'ArrowDown') {
			handleArrowDown();
		} else if (event.key === 'Enter') {
			const optionSelected = options.find((option) => {
				return option.value === selectedOption;
			});
			optionSelected.action();
			//setBlockedMenu(false);

			//console.log(selectedOption);
			//document.getElementById('menuOption' + selectedOption).click();
			handleSelectOption(selectedOption);
		}
	};

	const useKeyDown = (callback, keys) => {
		const onKeyDown = (event) => {
			const wasAnyKeyPressed = keys.some((key) => event.key === key);
			handleKeyPress(event);
			/* console.log(event.key);
			if (wasAnyKeyPressed) {
				event.preventDefault();
				callback();
			} */
		};
		useEffect(() => {
			if (!blockedMenu) {
				document.addEventListener('keydown', onKeyDown);
				return () => {
					document.removeEventListener('keydown', onKeyDown);
				};
			}
		}, [onKeyDown]);
	};

	// Example usage:
	useKeyDown(() => {
		someCallback();
	}, ['Escape']);

	useEffect(() => {
		axios.get('https://rickandmortyapi.com/api/character').then((res) => {
			setCharacters(res.data);
		});

		return () => {};
	}, []);

	return (
		<>
			<Head>
				<title>Rick & Morty - Home</title>
				<meta name="description" content="Henry API proyect" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap"></link>
			</Head>
			<div className={styles.scanlines} />
			<main className={styles.main}>
				<Image
					src={Plate}
					width={300}
					height={300}
					className={styles.plate}
					alt={'official plate'}
					priority
					unoptimized
				/>
				<div style={{ zIndex: 2, width: '100%' }}>
					<h1>Welcome back Morty@B-308</h1>

					<TypeAnimation
						style={{ whiteSpace: 'pre-line', display: 'block', lineHeight: '15px' }}
						sequence={[
							`
						ᗩᒪᒪᓰᘉ ᕼᗩᘻᑘSᕴᗩᖻᖽᐸᓰᑢᕼᓰᖽᐸ\n
						ᗩᒪSᓰᕴ’ᓰᖽᐸᑘᘉᗩᖶᗩ ᘻᗩSᖽᐸᕼᗩSᕵᗩ\n
						...ᖽᐸᑘᖶᓰᑢᕼᓰᖻ\n
						FATALL: ᎮᏗᎤᏬᏋᏖᏋ ፈᏂᎥᏁᏦᏗፈᏂᎥᎩ\n
						ᏰᏬᏕፈᏗᏁᎴᎧ ፈᏒᎥᎷᎥᏁᏗᏝᏋᏕ\n
						...\n
						∀`,
							() => {
								setAutoLogWritting(false);
							},
						]}
						speed={99}
						cursor={false}
						repeat={1}
					/>

					{!autoLogWritting && (
						<>
							<div style={{ width: '100%' }}>
								<p style={{ marginTop: '14px' }}>================ criminals ==================</p>
								{options.map(
									(option) =>
										option.value !== options.length - 1 && (
											<div
												style={{ marginTop: '14px' }}
												id={'menuOption' + option.value}
												key={option.value}
												className={
													selectedOption === option.value ? menu.menuSelectedOption : ''
												}
											>
												| {selectedOption === option.value ? `> ${option.name}` : option.name} |
											</div>
										)
								)}
								<p style={{ marginTop: '14px' }}>=============================================</p>
								{options.map(
									(option) =>
										option.value === options.length - 1 && (
											<div
												style={{ marginTop: '14px' }}
												id={'menuOption' + option.value}
												key={option.value}
												className={
													selectedOption === option.value ? menu.menuSelectedOption : ''
												}
											>
												{selectedOption === option.value ? `> ${option.name}` : option.name}
											</div>
										)
								)}
							</div>
						</>
					)}
				</div>

				<CharTerminal
					visible={charTerminalVisible}
					setVisible={setCharTerminalVisible}
					typeOf={charTerminalTypeOf}
				/>
				<CharSearcher visible={charSearcherVisible} setVisible={setCharSearcherVisible} />
				<CharDetailsCard
					visible={selectedCharCard.visible}
					setVisible={setCharCardVisible}
					charInfo={selectedCharCard.info}
				/>
			</main>
		</>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
