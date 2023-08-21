import { useState } from "react"
import { Flex, Input, Heading, Text, Spinner } from "@chakra-ui/react"
import axios from "axios"
import MovieCard from "../components/MovieCard"

const Search = () => {
  const [ searchValue, setSearchValue ] = useState("")
  const [ movies, setMovies ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const api_key = import.meta.env.VITE_API_KEY

  const searchMovies = async (query) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`)
      setMovies(response.data.results)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    searchMovies(searchValue)
  }

  return (
    <Flex direction="column" gap={4} alignItems="center">
      <Heading as="h1" size="md" alignSelf="flex-start">Search</Heading>
      <Input placeholder="Search movies" onChange={handleChange} value={searchValue} />
      { error && <Text>Something went wrong.</Text> }
      { isLoading 
        ? <Spinner />
        : movies.length
          ? <Flex flexWrap="wrap" gap={4}>
            { movies.map(movie => <MovieCard key={`${movie.id}+Math.random()`} movie={movie} />) }
            </Flex>
          : searchValue && <Text>Not found.</Text>
      }
    </Flex>
  )
}

export default Search