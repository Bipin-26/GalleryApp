import { Container, Flex, Box, Text, calc, Skeleton } from "@chakra-ui/react"
import CardComponent from "../components/card.component"
import { useContext } from "react"
import { GalleryContext } from "../contexts/gallery.context"
import { useAuthContext } from "../contexts/auth.context"

const Home = () => {
    const { state } = useContext(GalleryContext)
    const { currentUserDetail } = useAuthContext()
    // console.log("SORTED ITEMS",state.items.uploadedAt.sort())
    return (
        <>
            <Container margin='0' padding='0' boxSizing="border-box">
                <Box position='fixed' top='0' zIndex='9999' width='100%' height='65px' bg='#fff' borderBottom='1px solid #e4e4e4'>
                    <Box display='flex' flexDirection='column' gap='3px' >
                            <Text fontSize='34px' fontWeight='600' fontFamily='Lobster, cursive' alignSelf='center' justifySelf='center' >Gallery App</Text>
                        {/* <Text>
                            Explore the gallery
                        </Text> */}
                    </Box>
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