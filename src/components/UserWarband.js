import FinalUnitCard from './FinalUnitCard'
import React, {useEffect, useState } from 'react'

const UserWarband = ({ warband, pointLimit, removeUnit, updateUnitInWarband }) => {
  const [warbandCost, setWarbandCost] = useState(0)

  useEffect(() => {
    let cost = 0
    if (warband.length !== 0) {
      for (let i = 0; i < warband.length; i++) {
        cost += warband[i].currentCost
      }
      setWarbandCost(cost)
    } else {
      setWarbandCost(cost)
    }
  })

  return (
    <div>
      <h1>Your warband {warbandCost}/{pointLimit}</h1>
      {warband.map(unit => 
        <FinalUnitCard key={unit.unitId} unit={unit} removeUnit={removeUnit} updateUnitInWarband={updateUnitInWarband} />
      )}
    </div>
  )
}

export default UserWarband