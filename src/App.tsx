/*global chrome*/
import './App.css'
import Icon from './assets/icon128.png'
import {useEffect, useState} from "react";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
import Modal from "./components/Modal.tsx";

function App() {

    const [bookmarks, setBookmarks] = useState<BookmarkTreeNode[]>([]);
    const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBookmarkId, setCurrentBookmarkId] = useState<string | null>(null);

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = () => {
        chrome.bookmarks.getTree(
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes && bookmarkTreeNodes.length > 0) {
                    setBookmarks(bookmarkTreeNodes);
                }
            }
        );
    }

    const toDateString = (date: string | number | Date | undefined) => {
        return date ? new Date(date).toDateString() : "No date available";
    }

    const handleCheckboxChange = (bookmarkId: number) => {
        setSelectedBookmarks((prevSelectedBookmarks) => {
            if (prevSelectedBookmarks.includes(bookmarkId)) {
                return prevSelectedBookmarks.filter(id => id !== bookmarkId);
            } else {
                return [...prevSelectedBookmarks, bookmarkId];
            }
        });
    };

    const renderBookmarks = (nodes: BookmarkTreeNode[]) => {
        return nodes.map((node) => (
            <div key={node.id} className="ml-4 border-black border-2">
                <input
                    type="checkbox"
                    checked={selectedBookmarks.includes(node.id)}
                    onChange={() => handleCheckboxChange(node.id)}
                />
                <p>{node.title || "No title"}</p>
                <a href={node.url} target="_blank" rel="noopener noreferrer">{node.url}</a>
                <p>Date added: {toDateString(node.dateAdded)}</p>
                {node.children && renderBookmarks(node.children)}
                <button className={"border-black border-2 bg-gray-400"} onClick={() => openModal(node.id)}>Delete Bookmark</button>
            </div>
        ));
    };

    const openModal = (id: string) => {
        setCurrentBookmarkId(id);
        setIsModalOpen(true);
    }

    const removeBookmark = (id: string) => {
        chrome.bookmarks.remove(id).then(_ => {
            fetchBookmarks();
        });
    }

    return (
        <>
            {isModalOpen && <Modal id={currentBookmarkId} removeBookmark={removeBookmark} setIsModalOpen={setIsModalOpen} />
            }
            <div className={"bg-amber-100 border-black border-2 overflow-y-scroll"}>
                <h1 className={"text-green-700 text-2xl font-bold"}>
                    Avocado Toast browser extension
                    {JSON.stringify(selectedBookmarks)}
                </h1>
                <img src={Icon} alt="icon" />
                {renderBookmarks(bookmarks)}
            </div>
        </>
    )
}

export default App
