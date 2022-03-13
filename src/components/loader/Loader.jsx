import React from 'react'
import { Spinner } from 'react-bootstrap';
import "./loader.css"

const Loader = () => {
  return (
    <div className='loader'>
      <div className="loader center">
        <i className="fa fa-cog fa-spin" />
      </div>
    </div >
  )
}

export default Loader