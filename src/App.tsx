/*global chrome*/
import './App.css'
import Icon from './assets/icon128.png'
import {useEffect, useState} from "react";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
import Modal from "./components/Modal.tsx";
import { Trash2 } from 'lucide-react';


function App() {

    const [bookmarks, setBookmarks] = useState<BookmarkTreeNode[]>([]);
    const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBookmark, setCurrentBookmark] = useState<BookmarkTreeNode | null>(null);
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

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

    const toggleNode = (nodeId: string) => {
        setExpandedNodes((prevExpandedNodes) =>
            prevExpandedNodes.includes(nodeId)
                ? prevExpandedNodes.filter(id => id !== nodeId)
                : [...prevExpandedNodes, nodeId]
        );
    };

    const renderBookmarks = (nodes: BookmarkTreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.id);
            return (
                <div key={node.id} className="m-4">
                    <div
                        className={`flex items-center p-2 border-2 border-gray-300 rounded-lg shadow-sm ${
                            node.children ? 'bg-gray-300' : 'bg-white'
                        }`}
                    >
                        {node.children && (
                            <button
                                onClick={() => toggleNode(node.id)}
                                className="mr-2"
                            >
                                {isExpanded ? '-' : '+'}
                            </button>
                        )}
                        {!node.children && (
                            <input
                                type="checkbox"
                                checked={selectedBookmarks.includes(node.id)}
                                onChange={() => handleCheckboxChange(node.id)}
                                className="mr-2"
                            />
                        )}
                        <p className="text-lg font-medium">
                            {node.title || 'No title'}
                        </p>
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
                                    className="flex items-center text-red-600 hover:text-red-800 ml-2"
                                    onClick={() => openModal(node)}
                                >
                                    <Trash2 />
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

    const openModal = (node: BookmarkTreeNode) => {
        setCurrentBookmark(node);
        setIsModalOpen(true);
    }

    const removeBookmark = (id: string) => {
        chrome.bookmarks.remove(id).then(_ => {
            fetchBookmarks();
        });
    }

    return (
        <>
            {isModalOpen && (
                <Modal
                    currentBookmark={currentBookmark}
                    removeBookmark={removeBookmark}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
            <div className="bg-slate-400">
                <h1 className="text-gray-900 text-2xl font-bold">
                    BookmarkBuster browser extension
                    {JSON.stringify(selectedBookmarks)}
                </h1>
                <img src={Icon} alt="icon" />
                {renderBookmarks(bookmarks)}
            </div>
        </>
    );
}

export default App
