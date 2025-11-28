import React from 'react'
export function Input({ className = '', ...props }){
  return <input className={`border rounded-md px-3 py-2 ${className}`} {...props} />
}
export default Input
