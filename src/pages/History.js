import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { HISTORY_URL } from '../connectors/api';
import { STATUS, SetDate } from '../utils';


export default function History() {
  const { status, data: movies, error } = useFetchEffect(`${HISTORY_URL}`);

  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>Error fetching watchlist: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  return (
    <Container p={5} maxW="75em">
      <SimpleGrid columns={4} spacing={1}>
        {movies.map(movie => (
          <Box>
            <Link to={`/movies/${movie.id}`} key={movie.id} noOfLines={2}>
              <Tooltip label={movie.title}>
                <Image
                  src={buildImageUrl(movie.poster_path, 'w300')}
                  alt="Poster"
                  fallbackSrc={imageFallback}
                  border="5px solid #63171B"
                />
              </Tooltip>
            </Link>
            <Text border="2px solid #C53030" color="#7B341E" pl="5px"> Saw it on: <SetDate/> </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}