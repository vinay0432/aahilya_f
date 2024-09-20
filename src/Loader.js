import React from 'react'

export default function Loader() {
  return (
    <div className='loader-section'>
      <div className="loader">
        <img src={require('../src/assets2/images/logo.png')} alt="loading" />
        <span></span>
      </div>
    </div>
  )
}
