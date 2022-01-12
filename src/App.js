import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NationSelector from './components/NationSelector'
import UnitList from './components/UnitList'
import UserWarband from './components/UserWarband'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [allNationData, setAllNationData] = useState([])
  const [selectedNation, setSelectedNation] = useState(null)
  const [pointLimit, setPointLimit] = useState(250)
  const [warband, setWarband] = useState([])

  useEffect(() => {
    async function fetchNations() {
      const url = 'http://localhost:3001/nations'
      const response = await axios.get(url)
      setAllNationData(response.data)
    }
    fetchNations()
  }, [])

  const handleNationChange = (event) => {
    event.preventDefault()
    setWarband([])
    event.target.value !== "null" 
      ? setSelectedNation(event.target.value)
      : setSelectedNation(null)
  }

  const handleMaxPointChange = (event) => {
    event.preventDefault()
    setPointLimit(event.target.value)
    console.log(event.target.value)
  }

  const generateId = () => {
    const id = uuidv4()
    return id
  }

  const addUnitToWarband = (unit) => {
    const id = generateId()
    const newUnit = Object.assign({}, unit)
    newUnit.unitId = id
    setWarband(warband.concat(newUnit))
  }

  const removeUnitFromWarband = (removableId) => {
    const newWarband = warband.filter(u => u.unitId !== removableId)
    setWarband(newWarband)
  }

  const updateUnitInWarband = (unit) => {
    const updatedUnit = unit
    const newWarband = warband.map(u => u.unitId !== updatedUnit.unitId ? u : updatedUnit)
    setWarband(newWarband)
  }
  return (
    <div className='app'>
      <div className='selectorDiv'>
        <h1>Warband builder</h1>
        <h3>Choose your faction and point limit</h3>
        <NationSelector handleNationChange={handleNationChange} handleMaxPointChange={handleMaxPointChange}/>
      </div>
      {selectedNation &&
        <div className='container'>
          <UnitList 
            unitsData={allNationData} 
            selectedNation={selectedNation} 
            handleAdd={addUnitToWarband}
          />
          <UserWarband 
            warband={warband}
            pointLimit={pointLimit}
            removeUnit={removeUnitFromWarband}
            updateUnitInWarband={updateUnitInWarband}
          />
        </div>
        }
    </div>
  )
}

export default App
