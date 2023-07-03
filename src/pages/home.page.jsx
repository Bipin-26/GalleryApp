import { Container, Flex, Box, Text, calc } from "@chakra-ui/react"
import CardComponent from "../components/card.component"
import { useContext } from "react"
import { GalleryContext } from "../contexts/gallery.context"

const Home = () => {
    const { state } = useContext(GalleryContext)
    // console.log("SORTED ITEMS",state.items.uploadedAt.sort())
    return (
        <>
            <Container margin='0' padding='0' boxSizing="border-box">
                <Box position='fixed' top='0' zIndex='9999' width='100%' height='65px' bg='#fff'>
                <Flex>
                    <Box>
                        <Text fontSize='22px' fontWeight='600' >Gallery App</Text>
                    </Box>
                </Flex>
                <Text>
                    Explore the gallery
                </Text>
                </Box>
                <Box margin='65px 0' padding='0' overflow='scroll'>
                {
                    state.items.map(item => (
                        <Box marginTop='5px' marginBottom='5px'>
                            <CardComponent item={item} />
                            </Box>
                        ))
                }
                </Box>
            </Container>
        </>
    )
}

export default Home