import Icon from "../assets/icon128.png";

const Header = () => {
  return (
      <header className={"flex items-center justify-center"}>
          <img src={Icon} className={"w-16 drop-shadow-2xl"} alt="icon"/>
          <h1 className="text-indigo-100 text-3xl font-bold drop-shadow-md">
              BookmarkBuster
          </h1>
      </header>
  );
}

export default Header;