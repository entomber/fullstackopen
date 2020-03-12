import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const commonStyle = {
    display: 'inline-block',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successStyle = {
    ...commonStyle,
    color: 'green',
  }

  const errorStyle = {
    ...commonStyle,
    color: 'red',
  }

  return (
    <div style={notification.isError ? errorStyle : successStyle}>
      {notification.message}
    </div>
  )
}

export default Notification