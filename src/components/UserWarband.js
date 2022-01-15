import FinalUnitCard from './FinalUnitCard'

const UserWarband = ({ warband, pointLimit, removeUnit, updateUnitInWarband }) => {
  console.log('rendered')
  return (
    <div>
      <h1>Your warband cost /{pointLimit}</h1>
      {warband.map(unit => 
        <FinalUnitCard key={unit.unitId} unit={unit} removeUnit={removeUnit} updateUnitInWarband={updateUnitInWarband} />
      )}
    </div>
  )
}

export default UserWarband