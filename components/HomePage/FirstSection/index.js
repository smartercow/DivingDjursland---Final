import FrontAbout from "./FrontAbout"
import FrontShop from "./FrontShop"
import Slider from "./Slider"

const FirstSection = () => {
  return (
    <div className="max-w-5xl mx-5 lg:mx-auto flex flex-col gap-5 md:gap-10 lg:gap-16 relative">
        <Slider />
        <FrontAbout />
        <FrontShop />
    </div>
  )
}

export default FirstSection