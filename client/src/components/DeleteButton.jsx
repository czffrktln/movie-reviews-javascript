import { IconButton, useToast } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"

const DeleteButton = ({review,  getReviews}) => {
  const { user, isLoggedIn } = useContext(UserContext)
  const toast = useToast()
  const serverUrl = import.meta.env.VITE_SERVER_URL

  const deleteReview = async () => {
    try {
      const response = await axios.delete(`${serverUrl}/api/review/${review._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
        toast({title: "Successful delete.", status: "success", position: "top", duration: 4000, variant: "subtle" })
        getReviews()
      } catch (error) {
        toast({title: "Something went wrong.", status: "error", position: "top", duration: 4000, variant: "subtle" })
      }
  }

  return (
    <>  
      { isLoggedIn && (user.id == review.user._id) && 
        <IconButton onClick={deleteReview} ml="auto" variant="ghost" icon={<DeleteIcon />} />
      }
    </>
  )
}

export default DeleteButton