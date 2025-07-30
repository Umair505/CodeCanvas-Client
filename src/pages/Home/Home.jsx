import Banner from '../../components/Home/Banner'
import Carousel from '../../components/Home/Carousel'
import FAQSection from '../../components/Home/FAQSection'
import FeaturedProducts from '../../components/Home/FeaturedProducts'
import Header from '../../components/Home/Header'
import TrendingProducts from '../../components/Home/TrendingProducts'

const Home = () => {
  
  return (
    <div>
      <Header/>
      <Banner/>
      <FeaturedProducts />
      <Carousel/>
      <TrendingProducts/>
      <FAQSection/>
    </div>
  )
}

export default Home
