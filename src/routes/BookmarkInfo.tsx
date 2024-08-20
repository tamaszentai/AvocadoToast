import {Link} from "react-router-dom";
import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
import React from "react";

interface BookmarkInfoProps {
    node: BookmarkTreeNode | null;
}

const BookmarkInfo: React.FC<BookmarkInfoProps>  = ({node }) => {
    return (
        <>
        <Link to={`/`} className={"h-8 p-2 m-2 border-2 border-black bg-gray-400 "}> Back</Link>



        <div className={"my-4"}>BookmarkInfo</div>
            {node?.id}
            {node?.title}
            {node?.url}
            {node?.dateAdded}
            {node?.dateGroupModified}
            {node?.parentId}
            {node?.index}

        </>
    )
}
export default BookmarkInfo
