import React, { useState } from 'react'
import CircleProgress from '../components/CircleProgress/CircleProgress'
import Dashboard from '../components/Dashboard/Dashboard'
import IntroductionLayout from '../components/IntroductionLayaut/IntroductionLayout'
import SearchBar from '../components/SearchBar/SearchBar'
import DataPlaceSelectContext from '../context/DataSelectPlaceContext'
import { TITLE_NAVBAR } from '../untils/consts'
import './MainPage.css'

const MainPage = () => {
	const [dataPlaceSelect, setDataPlaceSelect] = useState(
		{
			position: null,
			namePlace: '',
		}
	);
	return (
		<div className='main-page'>
			<div className="grid">
				<nav>
					<h2>{TITLE_NAVBAR}</h2>
				</nav>
				<main>
					<DataPlaceSelectContext.Provider value={[dataPlaceSelect, setDataPlaceSelect]}>
						<div className='about-container'>
							<IntroductionLayout />
						</div>
						<div className="search-bar-container">
							<SearchBar />
						</div>
						<div className="dashboard-container">
							<Dashboard />
						</div>
						<div className='circle-widget-container'>
							<CircleProgress />
						</div>
					</DataPlaceSelectContext.Provider>
				</main>
			</div>
		</div>
	)
}

export default MainPage
