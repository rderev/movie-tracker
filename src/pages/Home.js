import { Text, Box, Image, } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Text m={10} fontSize={30}>
        <b>Up and running! Here you can find every movie you want! 🎥 </b>
        <i> <b> ENJOY! </b> </i> 
      </Text>
      <Image 
      src="https://wallpapercave.com/wp/wp1945897.jpg" 
      w="50vw"
      opacity="0.8"
      border="2px solid black"
      />
    </Box>
  );
}
