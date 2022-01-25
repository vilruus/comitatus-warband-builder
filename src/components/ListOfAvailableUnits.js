import React from 'react'
import UnitCard from './UnitCard'

const UnitList = ({ unitsData, selectedNation, addUnitToWarband }) => {
  const showableFaction = unitsData.find(faction => faction.name === selectedNation )

  if (showableFaction) {

    return (
      <div className='unitRoster'>
        <h2 className='unitRosterTitle'>Available units for {selectedNation}</h2>
        <div className='unitRosterCardsContainer'>
          {showableFaction.units.map(unit =>
            <UnitCard
              key={unit.name}
              unit={unit}
              addUnitToWarband={addUnitToWarband}
            />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <p>No available units, pick other faction</p>
    )
  }
}

export default UnitList