import React from 'react'
import UnitCard from './UnitCard'

const UnitList = ({ unitsData, selectedNation, addUnitToWarband }) => {
  const showableFaction = unitsData.find(faction => faction.name === selectedNation )
  
  if (showableFaction) {

    return (
      <div className='unitRoster'>
        <h1>Available units for {selectedNation}</h1>
        {showableFaction.units.map(unit => 
          <UnitCard key={unit.name}
            unit={unit}
            addUnitToWarband={addUnitToWarband}
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