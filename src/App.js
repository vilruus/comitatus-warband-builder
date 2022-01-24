import unitService from './services/unitdataservice'
import React, { useEffect, useState } from 'react'
import BuildingArea from './components/BuildingArea'
import NationSelector from './components/NationSelector'

const App = () => {
  const [data, setData] = useState([])
  const [selectedNation, setSelectedNation] = useState(null)
  const [pointLimit, setPointLimit] = useState(250)

  useEffect(() => {
    unitService
      .getAll()
        .then(data => {
          setData(data)
        })
  }, [])

  const handleNationChange = (event) => {
    event.preventDefault()
    event.target.value !== "null" 
      ? setSelectedNation(event.target.value)
      : setSelectedNation(null)
    handleColorThemeChange(event.target.value)
  }

  const handleColorThemeChange = (nation) => {
    const faction = data.find(n => n.name === nation)
    const root = document.documentElement
    root.style.setProperty('--nation-clr', faction.themeColor)
    root.style.setProperty('--nation-clr-dark', faction.themeColorDark)
  }

  const handleMaxPointChange = (event) => {
    event.preventDefault()
    setPointLimit(event.target.value)
  }

  return (
    <div className='app'>
      <h1>COMITATUS</h1>
      <div className='selectorDiv'>
        <NationSelector 
          handleNationChange={handleNationChange} 
          handleMaxPointChange={handleMaxPointChange}
        />
      </div>
      {selectedNation &&
        <BuildingArea 
          data={data} 
          selectedNation={selectedNation} 
          pointLimit={pointLimit} 
        />
      }
    </div>
  )
}

export default App
