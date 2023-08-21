import React from 'react'
import { Flex, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import { convertDate } from "../utils/convertDate"
import DeleteButton from './DeleteButton'
import { Link } from 'react-router-dom'

const Review = ({review, getReviews}) => {
  return (
    <Flex flexDirection="column" spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Link to={`/users/${review.user._id}`}>
            <Avatar
            name={review.user.name} src={review.user.picture} />
        </Link>
        <Box>
          <Heading size="sm">{review.user.name}</Heading>
          <Text fontSize="sm">{convertDate(review.createdAt)}</Text>
        </Box>
        <DeleteButton review={review} getReviews={getReviews}/>
      </Flex>
      <Text mt={2} ml={16}>{review.message}</Text>
    </Flex>
  )
}

export default Review