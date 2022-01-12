import React, { useState, useEffect } from 'react'
import OptionSelector from './OptionSelector'

const FinalUnitCard = ({ unit, removeUnit, updateUnitInWarband } ) => {
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(0)
  const [showOptions, setShowOptions] = useState(true)
  const [selectedOptions, setSelectedOptions] = useState([])

  const torsoAmourOptions = unit.options.filter(item => item.type === "torso")
  const shieldArmourOptions = unit.options.filter(item => item.type === "shield")
  const closeCombatOptions = unit.options.filter(item => item.type === 'close combat')
  const rangedOptions = unit.options.filter(item => item.type === 'ranged')
  const equipmentOptions = unit.options.filter(item => item.optionType ===  'equipments')

  const haveOptions = (array) => {
    if (array.length !== 0) {
      return true
    } else {return false}
  }

  const handleOptionChange = (event) => {
    const item = event.target.value
    if (event.target.checked === true) {
      addOption(item)
    } else {
      removeOption(item)
    }
  }

  const addOption = (item) => {
    setSelectedOptions(selectedOptions.concat(item))
  }

  const removeOption = (item) => {
    const newOptions = selectedOptions.filter(o => o !== item)
    setSelectedOptions(newOptions)
  }

  //Asettaa yksikön lukuisuuden (minioneilla pienin mahdollinen 5 ja hero/tykistö ovat yksin)
  useEffect(() => {
    if (unit.type !== "Infantry Hero" && unit.type !== "Scorpio") {
      setQuantity(5)
    }
  }, [])

  //Laskee yksikön lopullisen hinnan
  useEffect(() => {
    let totalCost = quantity*unit.denarii
    for (let i = 0; i < selectedOptions.length; i++) {
      const option = unit.options.find(item => item.name === selectedOptions[i])
      if (option.optionType === "equipments" && option.type === "unit") {
        totalCost += option.denarii
      } else {
        totalCost += option.denarii*quantity
      }}
    setCost(totalCost)
    unit["currentCost"] = totalCost
    updateUnitInWarband(unit)
  }, [quantity, selectedOptions])

  //Hallinnoi yksikön lukuisuuden muutoksen (mikäli alittaa pienimmän sallitun niin poistaa yksikön)
  const minus = (event) => {
    event.preventDefault()
    const removableId = event.target.value

    if ((unit.type === "Infantry Hero" || unit.type === "Cavalry Hero" || unit.type === "Scorpio") && quantity === 1) {
      removeUnit(removableId)
    } else if ((unit.type === 'Infantry Minion' || unit.type === 'Cavalry Minion') && quantity < 6) {
      removeUnit(removableId)
    } else {
    const newQuantity = quantity -1
    setQuantity(newQuantity)
    }
  }

  const plus = (event) => {
    event.preventDefault()
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
  }

  return (
    <div className='finalUnitCard'>
      <p className='unitName'><b>{unit.name}</b></p>
      <div className='unitQuantityContainer'>
        <button onClick={minus} value={unit.unitId} className='quantityButton'>-</button>
        <p className='unitQuantity'>{quantity}</p>
        <button onClick={plus} className='quantityButton'>+</button>
      </div>
      <p className='unitCost'><b>{cost} d</b></p>
      <div className='unitShowOptionButton'>
        <button onClick={() => setShowOptions(!showOptions)}>show options</button>
      </div>
      {showOptions &&
        <div className='unitOptionsSelector'>
          <form onChange={handleOptionChange}>
            { haveOptions(torsoAmourOptions) && <OptionSelector title="torso" list={torsoAmourOptions} /> }
            { haveOptions(shieldArmourOptions) && <OptionSelector title="shield" list={shieldArmourOptions} /> }
            { haveOptions(closeCombatOptions) && <OptionSelector title="close combat" list={closeCombatOptions} /> }
            { haveOptions(rangedOptions) && <OptionSelector title="ranged" list={rangedOptions} /> }
            { haveOptions(equipmentOptions) && <OptionSelector title="other equipments" list={equipmentOptions} /> }
          </form>
        </div>
      }
    </div>
  )
}

export default FinalUnitCard