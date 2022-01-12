import React from 'react'

const OptionSelector = ({ title, list }) => {

  return (
    <div>
    <b>{title}</b> <br/>
      {list.map(item =>
        <div style={{display: "inline-block", margin: "2px" }} key={item.name}>
          <input type="checkbox" value={item.name} id={item.name}/>
          {item.name} {item.denarii}d
      </div>
      )}
    </div>
  )
}

export default OptionSelector