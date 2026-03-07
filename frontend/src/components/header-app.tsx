import { iconsManager } from "@/lib/icons-manager"
import type { ExtendedUserInfo } from "@/types/extended-user-info"

export default function HeaderApp({userInfo}:{userInfo:ExtendedUserInfo | null}) {

    return (
        <header className=" w-full px-6 py-6 ml-6 flex items-center justify-between">
            <div className="text-xl font-semibold tracking-tight">
                Agendai<span className="text-blue-600">.</span>
            </div>
        <div className="flex items-center justify-center gap-2 mr-11">
            <button className=" p-2 border-2 border-black rounded-4xl">
                <iconsManager.usrIcon/>
            </button>
            
            {userInfo && (
                <p>{userInfo.preferred_username}</p>
            )}

            {!userInfo && (
                <p>No username to display</p>
            )}
        </div>
      </header>
    )
}