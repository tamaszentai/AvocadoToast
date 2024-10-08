import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from 'react-router-dom';
import { ChevronLeft } from "lucide-react";

export const convertDate = (date: string | number | Date | undefined) => {
    const parsedDate = date ? new Date(date) : null;
    return parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toDateString() : "No date available";
};

const BookmarkInfo: React.FC = () => {
    const location = useLocation();
    const { node } = location.state || {};

    return (
        <div className="p-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen text-white">
            <Link to={`/`} className="flex items-center text-white hover:text-gray-300">
                <ChevronLeft className="mr-2" />
                <span>Back</span>
            </Link>
            <div className="ml-4 mt-6">
                <div className="my-4 text-2xl font-bold">Bookmark Information</div>

                <div className="my-2">
                    <span className="font-semibold">ID: </span>{node?.id || "Not available"}
                </div>

                <div className="my-2">
                    <span className="font-semibold">Title: </span>{node?.title || "Not available"}
                </div>

                <div className="my-2">
                    <span className="font-semibold">URL: </span>
                    {node?.url ? (
                        <a href={node?.url} className="text-white underline hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                            {node?.url}
                        </a>
                    ) : "Not available"}
                </div>

                <div className="my-2">
                    <span className="font-semibold">Date Added: </span>{convertDate(node?.dateAdded)}
                </div>

                <div className="my-2">
                    <span className="font-semibold">Date Group Modified: </span>{convertDate(node?.dateGroupModified)}
                </div>

                <div className="my-2">
                    <span className="font-semibold">Parent ID: </span>{node?.parentId || "Not available"}
                </div>

                <iframe src={node?.url} className="w-full h-96 mt-4" title="Bookmark Info" />
            </div>
        </div>
    );
};

export default BookmarkInfo;
