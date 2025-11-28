import React from 'react'
export function Label({ children, className = '', htmlFor }){
  return <label className={className} htmlFor={htmlFor}>{children}</label>
}
export default Label
