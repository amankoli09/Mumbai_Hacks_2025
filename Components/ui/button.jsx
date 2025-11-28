import React from 'react'
export function Button({ children, className = '', variant, size, disabled, onClick, ...rest }){
  return <button className={`inline-flex items-center justify-center px-4 py-2 rounded-md border ${className}`} disabled={disabled} onClick={onClick} {...rest}>{children}</button>
}
export default Button
