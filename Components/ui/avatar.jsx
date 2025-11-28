import React from 'react'
export function Avatar({ children, className = '' }){ return <div className={`inline-flex items-center justify-center rounded-full overflow-hidden ${className}`}>{children}</div> }
export function AvatarImage({ src, alt }){ return <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> }
export function AvatarFallback({ children, className = '' }){ return <div className={`w-full h-full flex items-center justify-center ${className}`}>{children}</div> }
export default Avatar
