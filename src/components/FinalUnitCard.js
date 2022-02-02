import React, { useState } from 'react'

const FinalUnitCard = ({ unit, removeUnit, updateUnitInWarband } ) => {
  const [showOptions, setShowOptions] = useState(false)

  const torsoAmourOptions = unit.options.filter(item => item.type === 'torso')
  const shieldArmourOptions = unit.options.filter(item => item.type === 'shield')
  const closeCombatOptions = unit.options.filter(item => item.type === 'close combat')
  const rangedOptions = unit.options.filter(item => item.type === 'ranged')
  const equipmentOptions = unit.options.filter(item => item.optionType ===  'equipments')

  const haveOptions = (array) => {
    if (array.length !== 0) {
      return true
    } else {return false}
  }

  const minus = (event) => {
    event.preventDefault()
    const removableId = event.target.value

    if (unit.type === 'Infantry Hero' || unit.type === 'Cavalry Hero' || unit.type === 'Scorpio') {
      removeUnit(removableId)
    } else if ((unit.type === 'Infantry Minion' || unit.type === 'Cavalry Minion') && unit.quantity < 6) {
      removeUnit(removableId)
    } else {
      unit.quantity -= 1
      updateUnitInWarband(unit)
    }
  }

  const plus = (event) => {
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

  const unitAtMaxQuantity = () => unit.quantity !== 30
  const isMinion = () => unit.type.search('Minion') !== -1

  const quantityController = () => {
    return(
      <div className='unitQuantityContainer'>
        <button onClick={minus} value={unit.unitId} className='quantityButton'>-</button>
        <p className='unitQuantity'>{unit.quantity}</p>
        {unitAtMaxQuantity() && isMinion() && <button onClick={plus} className='quantityButton'>+</button>}
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