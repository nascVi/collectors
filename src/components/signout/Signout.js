import { useNavigate } from "react-router";

export default function Signout() {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate.push('/')
  }
  return (
    <div className="signin__input mt-6">
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
