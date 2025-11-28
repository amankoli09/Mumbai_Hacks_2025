import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Home, TrendingUp, History, AlertTriangle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navigationItems = [
  {
    title: "Verify Content",
    url: createPageUrl("Verify"),
    icon: Home,
  },
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Shield,
  },
  {
    title: "Trending Alerts",
    url: createPageUrl("TrendingAlerts"),
    icon: TrendingUp,
  },
  {
    title: "History",
    url: createPageUrl("History"),
    icon: History,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [language, setLanguage] = useState("en");

  const languageLabels = {
    en: "English",
    hi: "हिन्दी",
    mr: "मराठी"
  };

  return (
    <SidebarProvider>
      <style>{`
        .hover-scale {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Sidebar className="border-r border-slate-200/60 backdrop-blur-sm bg-white/80">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-900 tracking-tight">TruthShield</h2>
                <p className="text-xs text-slate-500 font-medium">Misinformation Detection</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20 hover:text-white' 
                            : 'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Settings
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-2 block text-slate-600">
                      Language
                    </label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl hover-scale cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100/50">
                    <span className="text-sm font-medium text-slate-700">Checks Today</span>
                    <span className="font-bold text-blue-600">0</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl hover-scale cursor-pointer bg-gradient-to-r from-amber-50 to-amber-100/50">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-slate-700">Alerts</span>
                    </div>
                    <span className="font-bold text-amber-600">0</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            <Link to={createPageUrl("UserProfile")} className="block">
              <div className="flex items-center gap-3 p-3 rounded-xl hover-scale cursor-pointer bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-blue-50 hover:to-blue-100/50 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center">
                  <span className="text-slate-700 font-bold text-sm">U</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate text-slate-900">User</p>
                  <p className="text-xs text-slate-500 truncate">View & edit profile</p>
                </div>
              </div>
            </Link>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-slate-900">TruthShield</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
