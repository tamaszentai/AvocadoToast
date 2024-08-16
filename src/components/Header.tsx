import Icon from "../assets/icon128.png";

const Header = () => {
  return (
      <header className={"flex items-center"}>
          <img src={Icon} className={"w-24 drop-shadow-2xl"} alt="icon"/>
          <h1 className="text-gray-900 text-3xl font-bold drop-shadow-2xl">
              BookmarkBuster
          </h1>
      </header>
  );
}

export default Header;