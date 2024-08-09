/*global chrome*/
import './App.css'
import Icon from './assets/icon128.png'
import {useEffect, useState} from "react";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

function App() {

    const [bookmarks, setBookmarks] = useState<BookmarkTreeNode[]>([]);

    useEffect(() => {
        chrome.bookmarks.getTree(
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes && bookmarkTreeNodes.length > 0) {
                    setBookmarks(bookmarkTreeNodes[0].children || []);
                }
            }
        );
    }, []);

    return (
        <>
            <div className={"h-52 w-96 bg-amber-100 border-black border-2"}>
                <h1 className={"text-green-700 text-2xl font-bold"}>
                    Avocado Toast browser extension
                </h1>
                <img src={Icon} alt="icon" />
                {bookmarks.map((bookmark) => (
                    <div key={bookmark.id}>
                        <p>{bookmark.title}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default App
