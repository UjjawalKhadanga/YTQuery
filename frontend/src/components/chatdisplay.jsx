import { Flex, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

function ChatBox({videoId}) {
    const [isLoading, setIsLoading] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const interval = setInterval(async () => {
            console.log("checking status...");
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/create/status?videoId=${videoId}`);
            console.log(res.data)
            if (res.data.status === "COMPLETED") {
                clearInterval(interval);
                setIsLoading(false);
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [videoId]);

    const handleClick = async () => {
        setIsLoading(true);
        const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/query/${videoId}/?q=${question}`);
        console.log(res.data);
        setAnswer(res.data.answer);
        setIsLoading(false);
    }

    return (
        isLoading ? <Spinner /> :
        <Flex width={"100%"} flexDir={"column"}>
            <Flex width={"100%"}>
                <Input variant='outline' placeholder='Ask any Question' onChange={(e)=>setQuestion(e.target.value)}/>
                <IconButton aria-label='Add to friends' icon={<IoSend />} onClick={handleClick}/>
            </Flex>
            {
                answer && <Text>{answer}</Text> 
            }
        </Flex>
    );
}

function ChatDisplay({ videoId }) {
    useEffect(() => {}, [videoId]);
    return (
        <Flex width={"100%"} margin={'0.5rem'} padding={'0.5rem'} aspectRatio={16/9}  flexDir={'column'}>
            <iframe title={videoId} src={`https://www.youtube.com/embed/${videoId}`} />
            <ChatBox videoId={videoId}/>
        </Flex>
    );
}

export default ChatDisplay;