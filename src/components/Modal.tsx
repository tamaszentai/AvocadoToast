import React from 'react';

interface ModalProps {
    id: string;
    removeBookmark: (id: string) => void;
    setIsModalOpen: (arg0: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ id, removeBookmark, setIsModalOpen }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
            <div className="bg-white top-1/4 left-1/4 absolute w-1/2 h-1/2 m-auto p-4">
                <h1 className="text-red-700 text-2xl font-bold">Are you sure you want to delete this bookmark?</h1>
                <p>{id}</p>
                <button onClick={() => setIsModalOpen(false)}>No</button>
                <button
                    onClick={() => {
                        removeBookmark(id);
                        setIsModalOpen(false);
                    }}
                >
                    Yes
                </button>
            </div>
        </div>
    );
};

export default Modal;
