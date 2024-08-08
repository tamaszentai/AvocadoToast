import './App.css'
import Icon from '/assets/icon128.png'

function App() {

  return (
    <>
        <div className={"h-52 w-96 bg-amber-100 border-black border-2"}>
        <h1 className={"text-green-700 text-2xl font-bold"}>
        Avocado Toast browser extension
        </h1>
        <img src={Icon} alt="icon" />
        </div>
    </>
  )
}

export default App
