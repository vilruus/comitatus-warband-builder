import React from 'react'

const UnitCard = ({ unit, addUnitToWarband }) => {

  const handleAddLocal = (event) => {
    event.preventDefault()
    const addableUnit = unit
    addUnitToWarband(addableUnit)
  }
  
  return(
    <div className='unitcard'>
      <p><b>{unit.name}</b></p>
      <p><b>{unit.denarii}</b></p>
      <button value={unit.name} onClick={handleAddLocal}>Add</button>
    </div>
  )
}
export default UnitCard