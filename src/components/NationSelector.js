import React from 'react'

const NationSelector = ({ handleNationChange, handleMaxPointChange }) => {
  return (
    <>
      <h2>Choose your faction and point limit</h2>
      <form  onChange={handleNationChange}>
        <label htmlFor="faction-selector">Choose a nation: </label>
        <br/>
        <select name="factions" id="faction-selector">
          <option value="null">--Select Faction--</option>
          <option value="Athens">Athens</option>
          <option value="Imperial Rome">Imperial Rome</option>
        </select>
      </form>
      <form onChange={handleMaxPointChange}>
        <label htmlFor="maxPoints">Set point limit: </label>
        <br/>
        <input type="number" name="maxPoints" id="maxPoints" min={0} defaultValue={250}/>
      </form>
    </>

  )
}

export default NationSelector