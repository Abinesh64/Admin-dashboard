import Single from "../../components/single/Single"
import { singleUser } from "../../data"

const SingleUser = () => {
  
  return (
    <div className="user">
      <Single {...singleUser}/>
    </div>
  )
}

export default SingleUser;