import React from 'react';
import { ChevronFirst } from "lucide-react"
import { ArrowBackIosNew } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { createContext, useContext, useState } from "react"
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, user }) {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen sticky top-0 z-10">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <div></div>
                        <img src={"/logo.png"} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}  alt="AlmaMater" />
                        {expanded ? (
                            <IconButton onClick={() => setExpanded(false)}>
                                <ArrowBackIosNew />
                            </IconButton>
                        ) : (
                            <button onClick={() => setExpanded(true)} className="rounded-lg hover:bg-gray-100">
                                <img src={"/logo.png"} alt = "logo" width="50" height="50"/>
                            </button>
                        )}
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 pl-3">{React.Children.toArray(children).slice(0, -1)}</ul>
                    </SidebarContext.Provider>

                    <div className={expanded ? "flex flex-col pt-3 w-full" :"flex"  }>
                        <SidebarContext.Provider value={{ expanded }}>
                            <ul className="flex-1 pl-3">{React.Children.toArray(children).slice(-1)}</ul>
                        </SidebarContext.Provider>
                        {user?.basic?.name && user?.basic?.email && (
                            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-full" : "w-0"} `}>
                                <div className="leading-4 w-full">
                                    <hr className='w-full' />
                                    <h4 className="font-semibold m-1 pl-5">{user?.basic?.name}</h4>
                                    <span className="text-sm text-gray-600 m-1 pl-5">{user?.basic?.email}</span>
                                </div>
                                
                            </div>
                        )}
                    </div>
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ id, icon, text, active, alert, onClick }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <li onClick={onClick} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}

<Link to="/admin/images">
  <span role="img" aria-label="image">🖼️</span> Image Upload
</Link>