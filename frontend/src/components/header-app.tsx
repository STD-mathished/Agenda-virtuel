import { iconsManager } from "@/lib/icons-manager"
import { cn } from "@/lib/utils";
import type { ExtendedUserInfo } from "@/types/extended-user-info"
import { useState } from "react"
import HeaderMenu from "./menu/header-menu";

export default function HeaderApp({userInfo}:{userInfo:ExtendedUserInfo | null}) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <header className=" w-full px-6 py-6 ml-6 flex items-center justify-between">
            <div className="text-xl font-semibold tracking-tight">
                Agendai<span className="text-blue-600">.</span>
            </div>
        <div className="flex items-center justify-center gap-2 mr-11">
            <button
                className={cn(
                        "p-2 border-2 rounded-4xl transition-all duration-200", 
                        openMenu 
                            ? "bg-blue-600 border-blue-600 text-white" 
                            : "border-black bg-transparent text-black" 
                    )}
                
                onClick={() => setOpenMenu(!openMenu)}
            >
                <iconsManager.usrIcon/>
            </button>
            
            {userInfo && (
                <p>{userInfo.preferred_username}</p>
            )}

            {!userInfo && (
                <p>No username to display</p>
            )}

            {/* Afficher le menu */}
            {openMenu && <HeaderMenu />}
        </div>
      </header>
    )
}