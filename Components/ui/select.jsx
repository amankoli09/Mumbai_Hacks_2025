import React, { createContext, useContext } from 'react'

const SelectContext = createContext({ value: undefined, onValueChange: () => {} })

export function Select({ value, onValueChange, children, className }) {
  return (
    <div className={className}>
      <SelectContext.Provider value={{ value, onValueChange }}>
        {children}
      </SelectContext.Provider>
    </div>
  )
}
export function SelectTrigger({ children, className }) {
  return <button className={className}>{children}</button>
}
export function SelectValue({ placeholder }) {
  const ctx = useContext(SelectContext)
  return <span>{ctx.value ?? placeholder ?? ''}</span>
}
export function SelectContent({ children }) {
  return <div>{children}</div>
}
export function SelectItem({ value, children }) {
  const ctx = useContext(SelectContext)
  return (
    <div data-value={value} onClick={() => ctx.onValueChange?.(value)}>
      {children}
    </div>
  )
}
