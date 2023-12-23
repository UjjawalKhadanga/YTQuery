import { Flex, Input, HStack, Button, Heading, VStack, FormControl, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import ChatDisplay from "../components/chatdisplay";


function Root() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const toast = useToast();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(url);
    setIsLoading(true);
    setVideoId(null);
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/create`, { url })
      .then((res) => {
        setVideoId(res.data.videoId);
        let status='success';
        let title=res.data.message || "Processed successfully"
        if (!res.data.success) status='failure';
        toast({ title, status, isClosable: true })
      })
      .catch((err) => {
        console.log(err);
        toast({ title: `Request could not be served: ${err}`, status: 'error', isClosable: true })
      })
      .finally(() => { setIsLoading(false); })
  }
    return (
      <Flex p={6} align="center" justify="center" >
        <VStack spacing={5}>
          <Heading fontSize={"5rem"}> YTQuery </Heading>
          <FormControl id="channel-id" isRequired >
            <HStack spacing={"1rem"} align={"center"} justify={"center"}>
              <Input width={"22rem"} variant='filled' placeholder='Enter the youtuble video URL' onChange={(e) => setUrl(e.target.value)}/>
              <Button isLoading={isLoading} colorScheme='red' size='md' onClick={handleClick}> Continue </Button>
            </HStack>
          </FormControl>
          {
            videoId && <ChatDisplay videoId={videoId}/>
          }
        </VStack>
      </Flex>
    );
  }
  
export default Root;