import React from 'react'

function Alert(props) {
    
    return (
      <div className='container' style={{height:"35px"}}>
      <p>{props.message}</p>
    </div>
  )
}

export default Alert
