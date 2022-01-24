import React, { useState } from 'react'
import meleeIcon from '../images/meleeIcon.png'
import heroIcon from '../images/heroIcon.png'
import archerIcon from '../images/archeryIcon.png'
import artilleryIcon from '../images/artilleryIcon.png'
import cavalryIcon from '../images/cavalryIcon.png'

const UnitCard = ({ unit, addUnitToWarband }) => {
  const [backSide, setBackSide] = useState(false)

  const handleAddLocal = (event) => {
    event.preventDefault()
    const addableUnit = unit
    addUnitToWarband(addableUnit)
  }

  const unitImage = () => {
    if (unit.image === 'Hero') {
      return (
        <img  src={heroIcon} alt="laurel"/>
      )
    } else if (unit.image === 'Melee Minion') {
      return (
        <img  src={meleeIcon} alt="sword"/>
      )
    } else if (unit.image === 'Archer Minion') {
      return (
        <img src={archerIcon} alt="Bow and arrow"/>
      )
    } else if (unit.image === 'Artillery') {
      return (
        <img src={artilleryIcon} alt="catapult"/>
      )
    } else if (unit.image === 'Cavalry Minion') {
      return (
        <img src={cavalryIcon} alt="horse"/>
      )
    }
  }

  const frontSideView = () => {
    return (
      <div className='unitRosterCard'>
        <div className='unitRosterCardDenarii'>
          <p><b>{unit.denarii}</b></p>
        </div>
        <div className='unitRosterCardAvatar' onClick={() => setBackSide(!backSide)}>
          {unitImage()}
        </div>
        <p className='unitRosterCardTitle'><b>{unit.name}</b></p>
        <button className='unitRosterCardButton' value={unit.name} onClick={handleAddLocal}>Add</button>
      </div>
    )}
  
  const backSideView = () => {
    return (
      <div className='unitRosterCard'>
        <p className='unitRosterCardDenarii' ><b>{unit.denarii}</b></p>
        <div className='unitRosterCardStats' onClick={() => setBackSide(!backSide)}>
          <p> move: {unit.move}" </p>
          <p>ranged: {unit.ranged} </p>
          <p> melee: {unit.melee} </p>
          <p> melee dices: {unit.meleedice}</p>
          <p>agility: {unit.agility}</p>
          <p>bravery: {unit.bravery}</p>
          <p>armour: {unit.armour}</p>
          <p>wounds: {unit.wounds}</p>
        </div>
        <p className='unitRosterCardTitle'><b>{unit.name}</b></p>
        <button className='unitRosterCardButton' value={unit.name} onClick={handleAddLocal}>Add</button>
    </div>
    )
  }
  
  return(
    <>
      {backSide ? backSideView() : frontSideView()}
    </>
  )
}
export default UnitCard