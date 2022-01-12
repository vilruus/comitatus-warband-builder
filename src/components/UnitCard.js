import React,{ useState } from 'react'

const UnitCard = ({ unit, handleAdd }) => {
  const [statsVisible, setStatsVisible] = useState(false)
  const [showButtonTitle, setShowButtonTitle] = useState('initial stats')

  const handleShowButton = (event) => {
    setStatsVisible(!statsVisible)
    statsVisible
      ? setShowButtonTitle('initial stats')
      : setShowButtonTitle('hide')
  }

  const handleAddLocal = (event) => {
    event.preventDefault()
    const addableUnit = unit
    handleAdd(addableUnit)
  }
  
  return(
    <div className='unitcard'>
      <p><b>{unit.name}</b></p>
      <p><b>{unit.denarii}</b></p>
      <button value={unit.name} style={{ marginLeft: '5px'}} onClick={handleAddLocal}>Add</button>
      <div className='initialStatsDiv'>
        <button className='initialStatsButton' onClick={handleShowButton}>{showButtonTitle}</button>
      </div>
      {statsVisible && <p>huutista</p>
      }
    </div>
  )
}
export default UnitCard