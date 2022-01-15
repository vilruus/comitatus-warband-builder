import FinalUnitCard from './FinalUnitCard'

const UserWarband = ({ warband, pointLimit, removeUnit, updateUnitInWarband }) => {

  const listOfUnitCosts = warband.map(unit => unit.cost)
  const totalWarbandCost = listOfUnitCosts.reduce((previous, current) => previous + current, 0)

  const sortUnitsByType = (listOfUnits) => {
    const compare = (a, b) => {
      if (a.type === "Infantry Hero" || a.type === "Cavalry Hero") {
        return -1
      }
      if (b.type === "Infantry Hero" || a.type === "Cavalry Hero") {
        return 1
      }
      return 0
    }

    return listOfUnits.sort(compare)
  }

  return (
    <div>
      <h1>Your warband {totalWarbandCost} /{pointLimit}</h1>
      {sortUnitsByType(warband).map(unit => 
        <FinalUnitCard key={unit.unitId} unit={unit} removeUnit={removeUnit} updateUnitInWarband={updateUnitInWarband} />
      )}
    </div>
  )
}

export default UserWarband