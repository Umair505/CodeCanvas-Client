import Banner from '../../components/Home/Banner'
import Carousel from '../../components/Home/Carousel'
import FeaturedProducts from '../../components/Home/FeaturedProducts'
import TrendingProducts from '../../components/Home/TrendingProducts'

const Home = () => {
  
  return (
    <div>
      <Banner/>
      <FeaturedProducts />
      <Carousel/>
      <TrendingProducts/>
      
    </div>
  )
}

export default Home
