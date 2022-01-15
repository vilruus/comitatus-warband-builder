import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import ListOfAvailableUnits from './ListOfAvailableUnits'
import UserWarband from './UserWarband'

const BuildingArea = ({ data, selectedNation, pointLimit }) => {
  const [warband, setWarband] = useState([])

  const generateId = () => {
    const id = uuidv4()
    return id
  }

  const addUnitToWarband = (unit) => {
    const newUnit = Object.assign({}, unit)
    const id = generateId()
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
    <div className='container'>
      <ListOfAvailableUnits 
        unitsData={data} 
        selectedNation={selectedNation} 
        addUnitToWarband={addUnitToWarband}
      />
      <UserWarband 
        warband={warband}
        pointLimit={pointLimit}
        removeUnit={removeUnitFromWarband}
        updateUnitInWarband={updateUnitInWarband}
      />
  </div>
  )
}

export default BuildingArea