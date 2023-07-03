import { Grid, GridItem, Image } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { GalleryContext } from "../contexts/gallery.context";
import CardModal from "./cardModal.component";

const GridContainer = ({items}) => {

    const { onModalHandler,modalItem, isOpen, onClose, onOpen, setModalItem } = useContext(GalleryContext)
    useEffect(() => {
        if(modalItem!=null){
            const updatedModalItem = items.filter(item => item.id === modalItem.id)
            setModalItem(updatedModalItem[0])
        }
    },[items])
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={.5}>
          {items.map((item) => {
            return (
              <>
              <GridItem w="100%" h="180" bg="blue.300" outline='1px solid white' onClick={onOpen}>
                <Image src={item.path} objectFit="cover" boxSize="100%"  onClick={() => onModalHandler(item)} />
              </GridItem>
              </>
            );
          })}
        {
          modalItem && 
          <CardModal isOpen={isOpen} onClose={onClose} modalItem={modalItem} />
        }
        
        </Grid>
    )
}

export default GridContainer;