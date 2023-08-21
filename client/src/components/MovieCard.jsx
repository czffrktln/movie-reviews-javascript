import { Card, CardBody, Stack, Text, Image, AspectRatio, ScaleFade } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const getDetails = (id) => {
    navigate(`/movies/${id}`)
  }

return (
  <Card flex="1 1 0" minW={40} cursor="pointer" _hover={{ transform: "translateY(-4px)", transitionDuration: "0.25s", transitionTimingFunction: "ease-in-out" }}>
  <CardBody p={2}>
    <AspectRatio ratio={2/3}>
    <Image borderRadius="md"
    onClick={e => getDetails(e.target.id)}
    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
    fallbackSrc="https://via.placeholder.com/1600x2400/cccccc?text="
    id={movie.id}
    alt={movie.title}
    />
    </AspectRatio>
    <Stack>
      <Text fontSize="sm" fontWeight="bold" mt={4}>{movie.title}</Text>
    </Stack>
  </CardBody>
  </Card>
)}

export default MovieCard