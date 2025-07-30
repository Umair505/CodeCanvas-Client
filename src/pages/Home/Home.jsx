import Banner from '../../components/Home/Banner'
import Carousel from '../../components/Home/Carousel'
import FAQSection from '../../components/Home/FAQSection'
import FeaturedProducts from '../../components/Home/FeaturedProducts'
import TrendingProducts from '../../components/Home/TrendingProducts'

const Home = () => {
  
  return (
    <div>
      <Banner/>
      <FeaturedProducts />
      <Carousel/>
      <TrendingProducts/>
      <FAQSection/>
    </div>
  )
}

export default Home
