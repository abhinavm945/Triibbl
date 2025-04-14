import { Outlet } from 'react-router-dom'
// import GameNavbar from '../components/GameNavbar'

export default function GameLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* <GameNavbar /> */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}