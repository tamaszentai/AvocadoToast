import { Trash2, XCircle } from "lucide-react";
import React from "react";

interface StickyControlsProps {
    selectedBookmarks: number[];
    clearBookmarkState: () => void;
    setIsModalOpen: (arg0: boolean) => void;
}

const StickyControls: React.FC<StickyControlsProps> = ({ selectedBookmarks, clearBookmarkState, setIsModalOpen }) => {
    return (
        <div
            className={"fixed rounded-2xl border-slate-800 border-2 bg-opacity-90 w-full h-16 top-0 left-0 z-50 flex items-center justify-between px-4 drop-shadow-2xl bg-[#483D8B]"}>
            <p className={"text-lg text-white"}>Selected bookmarks: {selectedBookmarks.length}</p>
            <div className={"flex items-center gap-4"}>
                <Trash2 className={"w-6 h-6 text-red-400 cursor-pointer"} onClick={() => setIsModalOpen(true)} />
                <XCircle className={"w-6 h-6 text-white cursor-pointer"} onClick={() => clearBookmarkState()}/>
            </div>
        </div>

    );
}

export default StickyControls;
