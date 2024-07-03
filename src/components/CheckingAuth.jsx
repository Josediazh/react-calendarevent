import React from 'react'

export const CheckingAuth = () => {
  return (
    <div className="container text-center">
        <div className="row align-items-center">
            <div className="col">
                <div className="spinner-border spinner-border m-5 text-primary"
                    role="status"> 
                    <span className="visually-hidden">Loading...</span> 
                </div>
            </div>
        </div>
    </div>
  )
}