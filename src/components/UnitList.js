import React from 'react'
import UnitCard from './UnitCard'

const UnitList = ({ unitsData, selectedNation, handleAdd }) => {
  const showableFaction = unitsData.find(faction => faction.name === selectedNation )
  
  if (showableFaction) {

    return (
      <div>
        <h1>Available units for {selectedNation}</h1>
        {showableFaction.units.map(unit => 
          <UnitCard key={unit.name}
            unit={unit}
            handleAdd={handleAdd}
          />
        )}
      </div>
    )
  } else {
      return (
        <p>No available units, pick other faction</p>
      )
  }
}

export default UnitList