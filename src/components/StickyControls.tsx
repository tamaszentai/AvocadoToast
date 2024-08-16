import {Trash2, XCircle} from "lucide-react";
import React from "react";

interface StickyControlsProps {
    selectedBookmarks: number[];
    clearSelectedBookmarks: () => void;
    setIsModalOpen: (arg0: boolean) => void;
}

const StickyControls: React.FC<StickyControlsProps>  = ({selectedBookmarks, clearSelectedBookmarks, setIsModalOpen}) => {
    return (
        <div className={"flex w-full h-16 top-0 sticky drop-shadow-2xl bg-slate-600"}>
            <p className={"text-lg"}>Selected bookmarks: {selectedBookmarks.length}</p>
           <Trash2 className={"w-6 h-6 text-red-400 cursor-pointer"} onClick={() => setIsModalOpen(true)} />
            <XCircle className={"w-6 h-6 text-white cursor-pointer"} onClick={() => clearSelectedBookmarks()}/>
        </div>
    );
}

export default StickyControls;