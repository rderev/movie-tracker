import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS, MovieTime } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import HistoryButton from '../components/HistoryButton';

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
  const [isHistoryActive, setHistoryActive] = React.useState(false); // temp state, for UI only, should be removed when implemented properly

  const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);

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
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW="80em">
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
        <HStack>
          <WatchlistButton movie={movie} status={updateStatus} update={updateMovie} />
          <HistoryButton movie={movie} status={updateStatus} update={updateMovie} />
        </HStack>
      </HStack>
      <HStack spacing={3} align="flex-start">
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt="Poster"
            w="35vw"
            maxW={300}
            fallbackSrc={imageFallback}
            border="2px solid yellow"
          />
        </Box>
        <Box w="100%" border="2px solid green" padding={10}>
          <HStack justify="space-between">
            <Heading as="h2" pb="25px" color="#2F855A">{movie.title}</Heading>
            <Text as="span" color="#68D391">
              {getYear(movie.release_date)}
            </Text>
          </HStack>
          <Text pb="25px" color="#68D391">{movie.overview}</Text>
          <Text as="span" color="#9AE6B4"> <i> Duration: </i> <b color="default"> {MovieTime(movie.runtime)} </b> | &#128336; </Text>
          <Text color="#9AE6B4"> <i> Language: </i> <b> {movie.original_language} </b> | &#128100; </Text>
          <Text color="#9AE6B4"><i>Rating: </i> <b>{movie.vote_average} </b> | &#11088; </Text>
        </Box>
      </HStack>
    </Container>
  );
}
