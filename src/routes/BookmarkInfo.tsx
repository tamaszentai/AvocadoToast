import {Link} from "react-router-dom";

const BookmarkInfo = () => {
    return (
        <>
        <Link to={`/`} className={"h-8 p-2 m-2 border-2 border-black bg-gray-400 "}> Back</Link>

        <div className={"my-4"}>BookmarkInfo</div>
        </>
    )
}
export default BookmarkInfo
