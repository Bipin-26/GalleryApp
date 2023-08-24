import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";

import { FiCheck, FiUpload } from "react-icons/fi";
import { GalleryContext } from "../contexts/gallery.context";
import Storage from "../utils/storage.utils";
import Firestore from "../utils/firestore.utils";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import { getCurrentTime } from "../utils/time.utils";
import Compressor from "compressorjs";
import { MdLabelImportantOutline } from "react-icons/md";

const { uploadFile, downloadFile } = Storage;
const { writeDoc } = Firestore;

const UploadPage = () => {
  const { state, dispatch, loadImages } = useContext(GalleryContext);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUserDetail } = useAuthContext();
  const currentTime = getCurrentTime().toString();
  const navigate = useNavigate();
  const [previewObjectFit, setPreviewObjectFit] = useState("contain");
  const handleFileSelection = () => {
    fileInputRef.current.click();
  };
  const clearPreview = () => {
    dispatch({
      type: "CLEAR_INPUTS",
      payload: {
        inputs: { title: null, caption: null, file: null, path: null },
      },
    });
  };
  const handleOnChange = (e) => {
    dispatch({ type: "SET_INPUTS", payload: { value: e } });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    new Compressor(state.inputs.file, {
      quality: 0.6,
      success(result) {
        const compressedInput = {...state.inputs, file:result, path:URL.createObjectURL(result)}
        console.log("COMPRESSED INPUTS", compressedInput)
        uploadFile(compressedInput)
          .then(downloadFile)
          .then((url) => {
            writeDoc(
              {
                ...state.inputs,
                path: url,
                uploadedBy: currentUserDetail.id,
                uploadedAt: currentTime,
                previewType: previewObjectFit,
              },
              "gallery"
            ).then(() => {
              loadImages();
              navigate("/home");
              setIsUploading(false);
              clearPreview();
            });
          });
      },
    });
    
  };

  return (
    <>
      <Container margin="0" padding="0" boxSizing="border-box">
        <Box bg="black">
          {state.inputs.path ? (
            <>
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
                  onClick={clearPreview}
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
                    backgroundColor: "none",
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
                  src={state.inputs.path}
                  margin="0 auto"
                  objectFit={previewObjectFit}
                />
              </Box>
            </>
          ) : (
            <Box
              height="450px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                color="white"
                fontSize="18px"
                fontWeight="300"
                letterSpacing="2px"
              >
                Preview Image
              </Text>
            </Box>
          )}
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
            {state.inputs.path && (
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
                  marginBottom="10px"
                  borderRadius="5px"
                  border="1px solid gray"
                  outline="none"
                  height="60px"
                  onChange={handleOnChange}
                  padding="10px 10px"
                />
              </Box>
            )}
            {!state.inputs.path && (
              <>
                <Input
                  type="file"
                  name="file"
                  display="none"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleOnChange}
                />
                <Button
                  onClick={handleFileSelection}
                  padding="35px"
                  bg="gray.200"
                  display="flex"
                  gap="5px"
                >
                  <FiUpload size="20px" />
                  <Text fontSize="18px">Upload Image</Text>
                </Button>
              </>
            )}
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent margin="0 15px">
                <ModalHeader>Uploading</ModalHeader>
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

export default UploadPage;
