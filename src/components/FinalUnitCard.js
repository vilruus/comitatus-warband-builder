import React, { useState } from 'react'

const FinalUnitCard = ({ unit, removeUnit, updateUnitInWarband } ) => {
  const [showOptions, setShowOptions] = useState(false)

  const torsoAmourOptions = unit.options.filter(item => item.type === 'torso')
  const shieldArmourOptions = unit.options.filter(item => item.type === 'shield')
  const closeCombatOptions = unit.options.filter(item => item.type === 'close combat')
  const rangedOptions = unit.options.filter(item => item.type === 'ranged')
  const equipmentOptions = unit.options.filter(item => item.optionType ===  'equipments')

  const haveOptions = optionsArr => optionsArr.length > 0

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
    const equipped = unit.equipped.map(item => item)

    return (
      <div className='finalUnitCardOptionSection'>
        <h4>Equipped</h4>
        {equipped.map(item =>
          <p key={item.name}>
            <button onClick={dropItem} value={item.name}>-</button>
            {item.name} {item.denarii} d
          </p>)}
      </div>
    )
  }

  const optionsAvailable = (title, list) => {
    return (
      <div className='finalUnitCardOptionSection'>
        <h4>{title}</h4>
        {list.map(item =>
          <p key={item.name}>
            <button onClick={wearItem} value={item.name}>+</button>
            {item.name} {item.denarii} d
          </p>)}
      </div>
    )
  }

  return (
    <div className='finalUnitCard'>
      <p className='finalUnitCardTitle'>
        <b>{unit.name}</b>
      </p>
      {quantityController(unit.type)}
      <p>
        <b>{unit.cost} d</b>
      </p>
      <div className='unitShowOptionButton'>
        <button onClick={() => setShowOptions(!showOptions)}>show upgrades</button>
      </div>
      {showOptions && equippedItems()}
      {showOptions && haveOptions(torsoAmourOptions) && optionsAvailable('Torso', torsoAmourOptions)}
      {showOptions && haveOptions(shieldArmourOptions) && optionsAvailable('Shield', shieldArmourOptions)}
      {showOptions && haveOptions(closeCombatOptions) && optionsAvailable('Close combat', closeCombatOptions)}
      {showOptions && haveOptions(rangedOptions) && optionsAvailable('Ranged', rangedOptions)}
      {showOptions && haveOptions(equipmentOptions) && optionsAvailable('Other', equipmentOptions)}
    </div>
  )
}

export default FinalUnitCard