import { Palette } from "lucide-react";

export default function CategoryCreate() {
    return(
        <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
            <div className="p-3 bg-emerald-100 rounded-full">
                <Palette className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-lg font-bold text-emerald-600 uppercase tracking-wider">a Category</p>
        </div>
    )
}