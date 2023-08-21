import MovieCard from '../components/MovieCard'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Flex, Heading, Spinner } from '@chakra-ui/react'


const Home = () => {
  const [ popularMovies, setPopularMovies ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const api_key = import.meta.env.VITE_API_KEY

  const getPopularMovies = async() => {
    try {
      setIsLoading(true)
      const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
      setPopularMovies(data.data.results)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  return (
    <Flex direction="column" gap={4} alignItems="center">
      <Heading as="h1" size="md" alignSelf="flex-start">Popular movies</Heading>
      <Flex flexWrap="wrap" gap={4}>
        { error && <Text>Something went wrong.</Text> }
        { isLoading 
        ? <Spinner />
        : popularMovies &&
          popularMovies.map((movie)=> <MovieCard key={movie.id} movie={movie} />)
      }
      </Flex>
    </Flex>
  )
}

export default Home