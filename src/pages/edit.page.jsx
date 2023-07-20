import {
    Box,
    Button,
    Card,
    CardBody,
    CloseButton,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Image,
    Input,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Progress,
    useDisclosure,
    Select
  } from "@chakra-ui/react";
  import { useContext, useRef, useState } from "react";
  import { MdAdd } from "react-icons/md";
  import { FiCheck, FiUpload } from "react-icons/fi";
  import { BiArrowBack } from "react-icons/bi";
  import { GalleryContext } from "../contexts/gallery.context";
  import Storage from "../utils/storage.utils";
  import Firestore from "../utils/firestore.utils";
  import { useNavigate } from "react-router-dom";
  import { useAuthContext } from "../contexts/auth.context";
  import { getCurrentTime } from "../utils/time.utils";
  
  const { uploadFile, downloadFile } = Storage;
  const { updateDocument } = Firestore;
  
  const EditPage = () => {
    // console.log('ITEMS IN EDIT PAGE', item)
    const id = new URLSearchParams(window.location.search).get('id')
    const { dispatch, state, loadImages } = useContext(GalleryContext);
    const item = state.items.find((item) => {
      if (item.id === id) {
        // console.log("ITEM TO BE EDITED",item)
        return item;
      }
    });

    const [isUploading, setIsUploading] = useState(false);
    // console.log('modalItem', modalItem)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption, setCaption] = useState(item?.caption);
    // console.log('CAPTION', caption)
    
    // console.log("ID", id)
    const navigate = useNavigate();
    const [previewObjectFit, setPreviewObjectFit] = useState(item?.previewType);

    const handleOnChange = (e) => {
      setCaption(e.target.value)
    };
    const handleOnSubmit = (e) => {
      e.preventDefault();
      setIsUploading(true);
      updateDocument(item.id, "gallery", caption, previewObjectFit).then(loadImages).then(() => navigate('/home/profile')).then(setIsUploading(false))
    };
  
    return (
      <>
        <Container margin="0" padding="0" boxSizing="border-box" position='absolute' top='0' >
          <Box bg="black">
                <Box
                  height="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                  bg="black"
                  borderBottom="1px solid gray"
                >
                  <CloseButton
                    color="white"
                    size="lg"
                    margin="0"
                    padding="0"
                    onClick={() => {navigate('/home/profile')}}
                  />
                  <Divider orientation="vertical" height="80%" />
                  <Box>
                    <Button
                      bg="none"
                      _focus={{
                        backgroundColor: "rgba(255,255,255,.1)",
                        border: "none",
                        outline: "none",
                      }}
                      onClick={() => setPreviewObjectFit("contain")}
                      fontWeight="300"
                      fontSize="14px"
                      color="white"
                    >
                      Original
                    </Button>
                    <Button
                      bg="none"
                      _focus={{
                        backgroundColor: "rgba(255,255,255,.1)",
                        border: "none",
                        outline: "none",
                      }}
                      onClick={() => setPreviewObjectFit("fill")}
                      fontWeight="300"
                      fontSize="14px"
                      color="white"
                    >
                      Fill
                    </Button>
                    <Button
                      bg="none"
                      _focus={{
                        backgroundColor: "rgba(255,255,255,.1)",
                        border: "none",
                        outline: "none",
                      }}
                      onClick={() => setPreviewObjectFit("cover")}
                      fontWeight="300"
                      fontSize="14px"
                      color="white"
                    >
                      Cover
                    </Button>
                  </Box>
                  <Divider orientation="vertical" height="80%" />
                  <Button
                    margin="0"
                    padding="0"
                    onClick={onOpen}
                    bg="none"
                    _focus={{
                      backgroundColor: "rgba(255,255,255,.1)",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <FiCheck size="30px" color="white" onClick={handleOnSubmit} />
                  </Button>
                </Box>
                <Box height="400px">
                  <Image
                    boxSize="100%"
                    src={item && item.path}
                    margin="0 auto"
                    objectFit={previewObjectFit}
                  />
                </Box>
          </Box>
          <form onSubmit={handleOnSubmit}>
            <FormControl
              bg="whiteAlpha.800"
              width="100%"
              margin="0px auto"
              position="fixed"
              bottom="80px"
              padding="10px 0"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
                <Box
                  width="90%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap="10px"
                >
                  <FormLabel textAlign="center" fontSize="18px" fontWeight="600">
                    Add Caption
                  </FormLabel>
                  <Input
                    type="text"
                    name="caption"
                    placeholder="Caption"
                    value={caption}
                    marginBottom="10px"
                    borderRadius="5px"
                    border="1px solid gray"
                    outline="none"
                    height="60px"
                    onChange={handleOnChange}
                    padding="10px 10px"
                  />
                </Box>
              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent margin="0 15px">
                  <ModalHeader>Updating</ModalHeader>
                  <ModalBody>
                    <Progress size="xs" borderRadius="10px" isIndeterminate />
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </FormControl>
          </form>
        </Container>
      </>
    );
  };
  
  export default EditPage;
  