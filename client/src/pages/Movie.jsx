import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Flex, Card, CardBody, Stack, Image, Heading, Text, StackDivider, Tag, Tooltip, Avatar } from "@chakra-ui/react"
import Review from "../components/Review"
import ReviewInput from "../components/ReviewInput"
import { UserContext } from "../context/UserContext"

const Movie = () => {
  let url = document.URL
  const id = url.substring(url.lastIndexOf("/") + 1)

  const { isLoggedIn } = useContext(UserContext)
  const api_key = import.meta.env.VITE_API_KEY
  const [ movie, setMovie ] = useState(null)
  const [ actors, setActors ] = useState(null)
  const [ reviews, setReviews ] = useState([])

  const serverUrl = import.meta.env.VITE_SERVER_URL

  const getMovie = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
      setMovie(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getActors = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`)
    setActors(response.data)
  }

  const getReviews = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/review/movie/${id}`)
      setReviews(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovie()
    getReviews()
    getActors()
  }, [])

  return (
    <>
      { movie &&
      <Flex flexWrap="wrap" gap={8}>
        <Card minW={300} flex="1 1 0" h="fit-content" pb={2}>
          <CardBody p={4}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              fallbackSrc="https://via.placeholder.com/1600x2400/cccccc?text="
              id={movie.id} alt={movie.title} borderRadius="md"
            />
            <Stack mt="4" spacing="3">
              <Heading size="md">{movie.title}</Heading>
              <Flex gap={2}>
                { movie.genres && movie.genres.map((genre => <Tag w="fit-content" key={genre.name}>{genre.name}</Tag>))}
              </Flex>
              <Flex gap={2} flexWrap="wrap">
                { actors && actors.cast.slice(0,12).map((actor => (
                  <Tooltip label={actor.name} key={actor.id}>
                  <Avatar src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}/>
                </Tooltip>)))
                }
              </Flex>
              <Text fontWeight="bold" fontSize="sm">Release date: {movie.release_date}</Text>
              <Text>{movie.overview}</Text>
            </Stack>
          </CardBody>
        </Card>
        <Flex minW={300} flex="1 1 0">
          <Stack mt="2" divider={<StackDivider />} spacing="4" w="100%">
            <Heading size="md">Reviews</Heading>
            { isLoggedIn && <ReviewInput getReviews={getReviews}/> }
            { reviews.length 
              ? reviews.map(review => <Review key={review._id} review={review} getReviews={getReviews} />)
              : <Text fontSize="sm" color="gray.500">No reviews here yet. Be the first to write one!</Text>
            }
          </Stack> 
        </Flex>
      </Flex>
      }
    </>
  )
}

export default Movie
