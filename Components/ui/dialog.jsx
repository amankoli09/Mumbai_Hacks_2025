import React from 'react'

export function Dialog({ open, onOpenChange, children }) {
  return open ? <div role="dialog">{children}</div> : null
}
export function DialogTrigger({ asChild, children, onClick }) {
  if (asChild) return React.cloneElement(children, { onClick })
  return <button onClick={onClick}>{children}</button>
}
export function DialogContent({ children, className = '' }) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50`}>
      <div className="fixed inset-0 bg-black/30" />
      <div className={`relative bg-white rounded-xl shadow-lg p-6 z-10 ${className}`}>{children}</div>
    </div>
  )
}
export function DialogHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}
export function DialogTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}
export function DialogDescription({ children, className = '' }) {
  return <p className={`text-sm text-slate-600 ${className}`}>{children}</p>
}
export function DialogFooter({ children, className = '' }) {
  return <div className={`mt-4 flex justify-end gap-2 ${className}`}>{children}</div>
}
