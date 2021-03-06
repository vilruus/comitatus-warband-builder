import FinalUnitCard from './FinalUnitCard'
import React from 'react'

const UserWarband = ({ warband, pointLimit, removeUnit, updateUnitInWarband }) => {

  const listOfUnitCosts = warband.map(unit => unit.cost)
  const totalWarbandCost = listOfUnitCosts.reduce((previous, current) => previous + current, 0)

  const sortUnitsByType = (listOfUnits) => {
    const compare = (a, b) => {
      if ((a.type === 'Infantry Hero' || a.type === 'Cavalry Hero') && ((b.type === 'Infantry Hero' || b.type === 'Cavalry Hero'))) {
        return 0
      } else if (a.type === 'Infantry Hero' || a.type === 'Cavalry Hero') {
        return -1
      } else if (b.type === 'Infantry Hero' || b.type === 'Cavalry Hero') {
        return 1
      }
      return 0
    }

    return listOfUnits.sort(compare)
  }

  return (
    <div className='warbandView'>
      <h2>YOUR WARBAND {totalWarbandCost}/{pointLimit}</h2>
      {sortUnitsByType(warband).map(unit =>
        <FinalUnitCard key={unit.unitId} unit={unit} removeUnit={removeUnit} updateUnitInWarband={updateUnitInWarband} />
      )}
    </div>
  )
}

export default UserWarband