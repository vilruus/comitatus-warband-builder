import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ListOfAvailableUnits from './ListOfAvailableUnits'
import UserWarband from './UserWarband'

const BuildingArea = ({ data, selectedNation, pointLimit }) => {
  const [warband, setWarband] = useState([])

  const generateId = () => {
    const id = uuidv4()
    return id
  }

  const updateUnitPrice = (unit) => {
    let cost = 0

    for (let i = 0; i < unit.equipped.length; i++) {
      if (unit.equipped[i].type === 'unit') {
        cost = cost + unit.equipped[i].denarii
      } else {
        cost += unit.quantity*unit.equipped[i].denarii
      }
    }
    cost += unit.quantity*unit.denarii
    return cost
  }

  const addUnitToWarband = (unit) => {
    const newUnit = Object.assign({}, unit)
    newUnit.cost = updateUnitPrice(unit)
    const id = generateId()
    newUnit.unitId = id
    setWarband(warband.concat(newUnit))
  }

  const removeUnitFromWarband = (removableId) => {
    const newWarband = warband.filter(u => u.unitId !== removableId)
    setWarband(newWarband)
  }

  const updateUnitInWarband = (unit) => {
    unit.cost = updateUnitPrice(unit)
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