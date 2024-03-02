import Single from "../../components/single/Single"
import { singleProduct } from "../../data"

const SingleProduct = () => {
  return (
    <div className="singleProduct">
      <Single {...singleProduct}/>
    </div>
  )
}

export default SingleProduct