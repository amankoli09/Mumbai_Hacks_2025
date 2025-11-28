import React from 'react'
export function Skeleton({ className = '' }){
  return <div className={`animate-pulse bg-slate-200 ${className}`} />
}
export default Skeleton
