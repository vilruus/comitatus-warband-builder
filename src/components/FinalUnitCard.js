import React, { useState } from 'react'

const FinalUnitCard = ({ unit, removeUnit, updateUnitInWarband } ) => {
  const [showOptions, setShowOptions] = useState(false)

  const handleMinusButtonClick = (event) => {
    event.preventDefault()
    const removableId = event.target.value
    const minusAndUpdate = () => {
      unit.quantity -= 1
      updateUnitInWarband(unit)
    }
    return unit.quantity <=  5
      ? removeUnit(removableId)
      : minusAndUpdate()
  }

  const handlePlusButtonClick = (event) => {
    event.preventDefault()
    unit.quantity += 1
    updateUnitInWarband(unit)
  }

  const dropItem = (event) => {
    event.preventDefault()
    const itemToRemove = unit.equipped.find(item => item.name === event.target.value)
    unit.equipped = unit.equipped.filter(item => item.name !== itemToRemove.name)
    unit.options = unit.options.concat(itemToRemove)
    updateUnitInWarband(unit)
  }

  const wearItem = (event) => {
    event.preventDefault()
    const itemToWear = unit.options.find(item => item.name === event.target.value)
    unit.equipped = unit.equipped.concat(itemToWear)
    unit.options = unit.options.filter(item => item.name !== itemToWear.name)
    updateUnitInWarband(unit)
  }

  const unitAtMaxQuantity = () => unit.quantity === 30
  const isMinion = () => unit.type.search('Minion') !== -1

  const quantityController = () => {
    return(
      <div className='unitQuantityContainer'>
        <button onClick={handleMinusButtonClick} value={unit.unitId} className='quantityButton'>-</button>
        <p className='unitQuantity'>{unit.quantity}</p>
        {!unitAtMaxQuantity() && isMinion() && <button onClick={handlePlusButtonClick} className='quantityButton'>+</button>}
      </div>
    )
  }

  const equippedItems = () => {
    const equipped = unit.equipped
    return (
      <div className='finalUnitCardOptionSection'>
        {equipped.map(item =>
          <p key={item.name}>
            <button onClick={dropItem} value={item.name}>-</button>
            {item.name} {item.denarii} d
          </p>)}
      </div>
    )
  }

  const optionsAvailable = () => {
    const options = unit.options
    return (
      <div className='finalUnitCardOptionSection'>
        {options.map(item =>
          <p key={item.name}>
            <button onClick={wearItem} value={item.name}>+</button>
            {item.name} {item.denarii} d
          </p>)}
      </div>
    )
  }

  return (
    <div className='finalUnitCard'>
      <div className='finalUnitCardHeader'>
        <p className='finalUnitCardHeaderTitle'>
          <b>{unit.name}</b>
        </p>
        {quantityController(unit.type)}
        <p>
          <b>{unit.cost} d</b>
        </p>
        <div className='unitShowOptionButton'>
          <button onClick={() => setShowOptions(!showOptions)}>{showOptions ? 'hide upgrades' : 'show upgrades'}</button>
        </div>
      </div>
      {showOptions &&
      <div className='optionManagementContainer'>
        <div className='optionsMenu'>
          <h3>Available</h3>
          {optionsAvailable()}
        </div>
        <div className='equippedMenu'>
          <h3>Equipped</h3>
          {equippedItems()}
        </div>
      </div>
      }
    </div>
  )
}

export default FinalUnitCard