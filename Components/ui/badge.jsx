import React from 'react'
export function Badge({ children, className = '', variant }){ return <span className={`inline-flex items-center px-2 py-1 rounded-md text-sm border ${className}`}>{children}</span> }
export default Badge
