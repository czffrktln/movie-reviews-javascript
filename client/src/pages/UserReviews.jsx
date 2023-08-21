import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Flex, Heading, Divider } from '@chakra-ui/react'
import Review from '../components/Review'

 const  UserReviews = () => {
   let url = document.URL
   const id = url.substring(url.lastIndexOf("/") + 1)
   const [ reviews, setReviews ] = useState([])
   const serverUrl = import.meta.env.VITE_SERVER_URL

  const getUserReviews = async() => {
    const data = await axios.get(`${serverUrl}/api/review/user/${id}`)
    setReviews(data.data)
  }

  const getReviews = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/review/user/${id}`)
      setReviews(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserReviews()
  }, [])

  return (
    <Flex flexDirection="column" gap={4}>
      <Heading as="h1" size="md" alignSelf="flex-start">User reviews</Heading>
      { reviews.map((review) => (
      <>
        <Review key={review._id} review={review} getReviews={getReviews}/>
        <Divider />
      </>
      ))
      }
    </Flex>
  )
}

export default UserReviews