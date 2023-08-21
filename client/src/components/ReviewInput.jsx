import { useState, useContext } from 'react'
import { Button, Input, Flex, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const ReviewInput = ({getReviews}) => {
  const { user } = useContext(UserContext)
  const toast = useToast()
  const [ newReview, setNewReview ] = useState("")

  const serverUrl = import.meta.env.VITE_SERVER_URL

  let url = document.URL
  const id = url.substring(url.lastIndexOf("/") + 1)

  const sendReview = async () => {
    if ( !newReview ) return toast({title: "Write your review first.", status: "warning", position: "top", duration: 4000, variant: "subtle" })

    try {
      const response = await axios.post(`${serverUrl}/api/review`, {
        user: user.id,
        message: newReview,
        movieId: id
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
      setNewReview("")
      getReviews()
    } catch (error) {
      toast({title: "Something went wrong.", status: "error", position: "top", duration: 4000, variant: "subtle" })
    }
  }

  return (
    <Flex gap={2}>
      <Input type="text" placeholder="Write your review here ..." value={newReview} onChange={(e)=> setNewReview(e.target.value)}></Input>
      <Button onClick={sendReview}>Send</Button>
    </Flex>
  )
}

export default ReviewInput