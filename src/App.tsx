import './App.css'
import {useEffect, useState} from "react";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
import Modal from "./components/Modal.tsx";
import { Trash2, Plus, Minus, Info } from 'lucide-react';
import Header from "./components/Header.tsx";
import StickyControls from "./components/StickyControls.tsx";


function App() {

    const [bookmarks, setBookmarks] = useState<BookmarkTreeNode[]>([]);
    const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBookmark, setCurrentBookmark] = useState<BookmarkTreeNode | null>(null);
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = () => {
        chrome.bookmarks.getTree(
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes && bookmarkTreeNodes.length > 0) {
                    setBookmarks(bookmarkTreeNodes[0].children || []);
                }
            }
        );
    };

    // const toDateString = (date: string | number | Date | undefined) => {
    //     return date ? new Date(date).toDateString() : "No date available";
    // }

    const handleCheckboxChange = (bookmarkId: number) => {
        setSelectedBookmarks((prevSelectedBookmarks) => {
            if (prevSelectedBookmarks.includes(bookmarkId)) {
                return prevSelectedBookmarks.filter(id => id !== bookmarkId);
            } else {
                return [...prevSelectedBookmarks, bookmarkId];
            }
        });
    };

    const toggleNode = (nodeId: string) => {
        setExpandedNodes((prevExpandedNodes) =>
            prevExpandedNodes.includes(nodeId)
                ? prevExpandedNodes.filter(id => id !== nodeId)
                : [...prevExpandedNodes, nodeId]
        );
    };

    const clearBookmarkState = () => {
        setCurrentBookmark(null);
        setSelectedBookmarks([]);
    }

    const renderBookmarks = (nodes: BookmarkTreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.id);
            return (
                <div key={node.id} className="m-4">
                    <div onClick={node.children ? () => toggleNode(node.id) : undefined }
                        className={`flex items-center p-2 border-2 border-gray-300 rounded-lg shadow-sm ${
                            node.children ? 'bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white' : 'bg-white'
                        }`}

                    >
                        {node.children && (
                            <button
                                className="mr-2"
                            >
                                {isExpanded ? <Minus /> : <Plus />}
                            </button>
                        )}
                        {!node.children && (
                            <input
                                id={node.id}
                                type="checkbox"
                                checked={selectedBookmarks.includes(Number(node.id))}
                                onChange={() => handleCheckboxChange(Number(node.id))}
                                className="mr-2"
                            />
                        )}
                        <label htmlFor={node.id} className="text-lg font-medium cursor-pointer">
                            {node.title || 'No title'}
                        </label>
                        {!node.children && node.url && (
                            <div className="ml-auto flex items-center">
                                <a
                                    href={node.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline break-all"
                                >
                                    {node.url}
                                </a>
                                <button
                                    className="flex items-center text-gray-400 hover:text-gray-600 ml-2"

                                >
                                    <Info/>
                                </button>
                                <button
                                    className="flex items-center text-red-600 hover:text-red-800 ml-2"
                                    onClick={() => openModal(node)}
                                >
                                    <Trash2/>
                                </button>
                            </div>
                        )}
                    </div>
                    {node.children && isExpanded && (
                        <div className="ml-4">
                            {renderBookmarks(node.children)}
                        </div>
                    )}
                </div>
            );
        });
    };

    const openModal = (node?: BookmarkTreeNode) => {
        if (node) {
            setCurrentBookmark(node);
        }
        setIsModalOpen(true);
    }

    const removeBookmark = (id: string) => {
        chrome.bookmarks.remove(id).then(_ => {
            fetchBookmarks();
        });
    }

    const removeSelectedBookmarks = () => {
        selectedBookmarks.forEach(id => {
            chrome.bookmarks.remove(id.toString()).then(_ => {
                fetchBookmarks();
            });
        });
        fetchBookmarks();
        clearBookmarkState();
    }

    const searchBookmarks = (searchTerm: string) => {
        chrome.bookmarks.search(searchTerm, (results) => {
            setBookmarks(results);
        });
    }

    const searchInputHandler = (e: string) => {
        setSearchInput(e);
        if (e.length > 0) {
            searchBookmarks(e);
        } else {
            fetchBookmarks();
        }
    }




    return (
        <>
            {isModalOpen && (
                <Modal
                    currentBookmark={currentBookmark}
                    selectedBookmarks={selectedBookmarks}
                    removeBookmark={removeBookmark}
                    removeSelectedBookmarks={removeSelectedBookmarks}
                    setIsModalOpen={setIsModalOpen}
                    clearBookmarkState={clearBookmarkState}
                />
            )}
            {selectedBookmarks.length > 0 && (
                <StickyControls
                    selectedBookmarks={selectedBookmarks}
                    clearBookmarkState={clearBookmarkState}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <Header />
                <div className="flex justify-center items-center h-16">
                    <input
                        type="text"
                        className="p-2 w-96 border-2 border-gray-600 rounded-lg shadow-sm"
                        placeholder="Search..."
                        onChange={(e) => searchInputHandler(e.target.value)}
                    />
                </div>
                {renderBookmarks(bookmarks)}
            </div>
        </>
    );
}

export default App
