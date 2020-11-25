import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Input,
  Image,
  IconButton,
  List,
  ListItem,
  Container,
  Link,
  Progress,
  Text,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildSearchMovieUrl, buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';

export default function Search() {
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);

  const handleSearch = event => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };

  const { status, data, error } = useFetchEffect(buildSearchMovieUrl(terms), !!terms);

  return (
    <Container p={3}>
      <Box as="form" onSubmit={handleSearch} w="100%" d="flex" mb={3}>
        <Input placeholder="Search for a movie..." defaultValue={terms} ref={searchRef} mr={3} />
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
          isLoading={status === STATUS.PENDING}
        />
      </Box>
      {status === STATUS.IDLE && <Text textAlign="center"> <b>Type some terms and submit for a quick search.</b></Text>}
      {status === STATUS.PENDING && <Progress size="xs" isIndeterminate />}
      {status === STATUS.REJECTED && (
        <Text>
          Error fetching movies for {terms}: {JSON.stringify(error)}
        </Text>
      )}
      {status === STATUS.RESOLVED && (
        <List spacing={20}>
          {data.results.map(({ id, title, release_date, poster_path, runtime}) => (
            <ListItem key={id} display="flex" justifyContent="center" position="relative">
              <Link as={RouterLink} to={`/movies/${id}`}>
                <Box float="left" position="absolute" left="0" paddingTop="25px">
                  <Text as="em" color="#2F855A"><b>{title}</b> </Text>
                  <Text as="span" color="#68D391">
                    {getYear(release_date)}
                  </Text>
                </Box>
                <Image
                src={buildImageUrl(poster_path, 'w300')}
                alt='Poster'
                w='75px'
                h='75px'
                objectFit='cover'
                fallbackSrc={imageFallback}
                borderRadius='10px'
                position='absolute'
                right='0'
                padding='5px'
                />
              </Link>
            </ListItem>
          ))}
        </List>
      )}
      {/* @todo: Display a message when no results */}
    </Container>
  );
}
