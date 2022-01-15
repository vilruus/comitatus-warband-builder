import React from 'react'

const OptionSelector = ({ title, list, inputType }) => {
  return (
    <div>
    <b>{title}</b> <br/>
      {list.map(item =>
        item.default === 0
        ?
        <div style={{display: "inline-block", margin: "2px" }} key={item.name}>
          <input type={inputType} name={title} value={item.name} id={item.name} />
          {item.name} {item.denarii}d
        </div>
        :
        <div style={{display: "inline-block", margin: "2px" }} key={item.name}>
        <input type={inputType} name={title} defaultChecked value={item.name} id={item.name} />
        {item.name} {item.denarii}d
      </div>
      )}
    </div>
  )
}

export default OptionSelector