import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const MainLayout = () => {
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='pt-10 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
