import { useNavigate } from "react-router";

export default function Signout() {
  const history = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <div className="signin__input mt-6">
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
