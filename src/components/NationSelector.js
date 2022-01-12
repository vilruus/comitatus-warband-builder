import React from 'react'

const NationSelector = ({ handleNationChange }) => {
  return (
    <form  onChange={handleNationChange}>
      <label htmlFor="faction-selector">Choose a nation:</label>

      <select name="factions" id="faction-selector">
        <option value="null">--Select Faction--</option>
        <option value="Athens">Athens</option>
        <option value="Britain">Britain</option>
        <option value="Caesar's Legions">Caesar's Legions</option>
        <option value="Dacia/Sarmatia">Dacia/Sarmatia</option>
        <option value="Gaul">Gaul</option>
        <option value="Germania">Germania</option>
        <option value="Iberia">Iberia</option>
        <option value="Imperial Rome">Imperial Rome</option>
        <option value="Macedonia">Macedonia</option>
        <option value="Persia">Persia</option>
        <option value="Sparta">Sparta</option>
        <option value="Thebes">Thebes</option>
      </select>
    </form>


  )
}

export default NationSelector