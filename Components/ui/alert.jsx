import React from 'react'

export function Alert({ children, className = '', variant }) {
  return <div className={`border rounded-lg p-4 ${className}`}>{children}</div>
}
export function AlertDescription({ children, className = '' }) {
  return <div className={className}>{children}</div>
}
