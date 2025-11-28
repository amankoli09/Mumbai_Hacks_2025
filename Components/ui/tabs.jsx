import React from 'react'
export function Tabs({ children, className, defaultValue, value, onValueChange }){ return <div className={className}>{children}</div> }
export function TabsList({ children, className }){ return <div className={className}>{children}</div> }
export function TabsTrigger({ children, className, value }){ return <button className={className}>{children}</button> }
export function TabsContent({ children, className, value }){ return <div className={className}>{children}</div> }
