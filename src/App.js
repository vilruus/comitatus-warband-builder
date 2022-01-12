import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NationSelector from './components/NationSelector'
import UnitList from './components/UnitList'
import UserWarband from './components/UserWarband'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [allNationData, setAllNationData] = useState([])
  const [selectedNation, setSelectedNation] = useState(null)
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


  console.log('App was rendered')
  return (
    <div>
      <h1>Warband builder</h1>
      <h3>Choose your faction and point limit</h3>
      <NationSelector handleNationChange={handleNationChange}/>
      <div className='container'>
        {selectedNation &&
          <UnitList 
            unitsData={allNationData} 
            selectedNation={selectedNation} 
            handleAdd={addUnitToWarband}
          />
        }
        <UserWarband 
          warband={warband}
          removeUnit={removeUnitFromWarband}
          updateUnitInWarband={updateUnitInWarband}
        />
      </div>
    </div>
  )
}

export default App
