import React from 'react'

export function Progress({ value = 0, className = '' }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className={`w-full h-2 bg-gray-200 rounded ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped}>
      <div className="h-full bg-blue-600 rounded" style={{ width: `${clamped}%` }} />
    </div>
  )
}

export default Progress
