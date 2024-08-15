import React from 'react';
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

interface ModalProps {
    currentBookmark: BookmarkTreeNode | null;
    removeBookmark: (id: string) => void;
    setIsModalOpen: (arg0: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ currentBookmark, removeBookmark, setIsModalOpen }) => {
    return (
        <div
            className="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
        >
            <div
                className="z-20 bg-white rounded-lg p-6 w-3/4 h-1/2 transform transition-transform duration-1000 ease-out scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-red-700 text-2xl font-bold">Are you sure you want to delete this bookmark?</h1>
                <p className="my-4">{currentBookmark?.title || 'No title'}</p>
                <p className="my-4 truncate">{currentBookmark?.url}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(false)}
                    >
                        No
                    </button>
                    <button
                        className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                            removeBookmark(currentBookmark?.id || "");
                            setIsModalOpen(false);
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
