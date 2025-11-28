import React from 'react'
export function SidebarProvider({ children }){ return <>{children}</> }
export function Sidebar({ children, className = '' }){ return <aside className={className}>{children}</aside> }
export function SidebarHeader({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarFooter({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarContent({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarGroup({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarGroupLabel({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarGroupContent({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarMenu({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarMenuItem({ children, className = '' }){ return <div className={className}>{children}</div> }
export function SidebarMenuButton({ children, className = '', asChild }){ return asChild ? children : <button className={className}>{children}</button> }
export function SidebarTrigger({ className = '' }){ return <button className={className}>☰</button> }
