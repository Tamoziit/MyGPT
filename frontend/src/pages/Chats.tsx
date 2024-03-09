import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { deleteUserChats, getUserChats } from "../helpers/api-communicators";
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api-communicators";
import { useNavigate } from "react-router-dom";

type Message = { //Type defining in typescript
  role: "user" | "assistant";
  content: string;
}
const Chats = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  //For API based chat handling.
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async() => {
    const content = inputRef.current?.value as string;
    if(inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = {role: "user", content};
    setChatMessages((prev) => [...prev, newMessage]);
    
    //Connecting to Backend Chat API via Axios helpers
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  }

//Hard Coding the messages...cozzz I failedddd (Rather didn't pay for API Key :) )
const chatMessagesList = [
  { "role": "user", "content": "Hello, could you help me with some coding?" },
  { "role": "assistant", "content": "Of course! What do you neehelp with?" },
  { "role": "user", "content": "I'm trying to write a function that calculates the factorial of a number in Python." },
  { "role": "assistant", "content": "Alright, here's a simple Python function to calculate the factorial:" },
  { "role": "assistant", "content": "```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n```" },
  { "role": "assistant", "content": "You can use this function to calculate the factorial of any non-negative integer." },
  { "role": "user", "content": "Thanks! Can you also provide a JavaScript example?" },
  { "role": "assistant", "content": "Sure, here's how you can calculate factorial in JavaScript:" },
  { "role": "assistant", "content": "```javascript\nfunction factorial(n) {\n    if (n === 0) {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}\n```" },
  { "role": "assistant", "content": "You can use this function similarly in JavaScript to calculate factorials." },
  { "role": "user", "content": "Great, thanks! Can you also show me a Ruby example?" },
  { "role": "assistant", "content": "Certainly, here's how you can calculate factorial in Ruby:" },
  { "role": "assistant", "content": "```ruby\ndef factorial(n)\n  if n == 0\n    return 1\n  else\n    return n * factorial(n-1)\n  end\nend\n```" },
  { "role": "user", "content": "```ruby\ndef factorial(n)\n  if n == 0\n    return 1\n  else\n    return n * factorial(n-1)\n  end\nend\n```" },
]

//Deleting chats
const handleDeleteChats = async () => {
  try {
    toast.loading("Deleting Chats...", { id: "deletechats" });
    await deleteUserChats();
    setChatMessages([]);
    toast.success("Chats Deleted Successfully!", { id: "deletechats" })
  }
  catch (error)
  {
    console.log(error);
    toast.error("Deleting Chats Failed!", { id: "deletechats" })
  }
}

//Loading prev user chat history
useLayoutEffect(() => {
  if (auth?.isLoggedIn && auth?.user) {
    toast.loading("Loading Chats...", { id: "loadchats" });
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully Loaded Chats!", { id: "loadchats" });
      }).catch(err => {
        console.log(err);
        toast.error("Loading Failed!", { id: "loadchats" })
    });
  }
}, [auth]);

//Redirection to Login Page if not logged in
useEffect(() => {
  if(!auth?.user) {
    return navigate("/login");
  }
}, [auth]); 

  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "!00%",
      height: "100%",
      mt: 3,
      gap: 3
    }}>
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}>
            {/* First letter of 1st name */}
            {auth?.user?.name[0]} 
            {auth?.user?.name.split(" ")[1] && auth?.user?.name.split(" ")[1][0]} {/* First letter of last name */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to MyGPT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask any questions related to general knowledge, programming, business, science, research and development, entertainment, education etc.
          </Typography>
          <Button onClick = {handleDeleteChats} sx={{
            width: "200px",
            my: "auto", color: "white",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400,
            }
          }}>
            CLEAR CONVERSATION
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        flex: { md: 0.8, xs: 1, sm: 1 },
        flexDirection: "column",
        px: 3
      }}>
        <Typography sx={{
          mx: "auto",
          fontSize: "40px",
          color: "white",
          mb: 2,
          fontWeight: "600"
        }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{
          width: "100%",
          height: "60vh",
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth"
        }}>
          {chatMessagesList.map((chat, index) =>
            <ChatItem content={chat.content} role={chat.role} key={index} />
          )}
        </Box>
        <div style={{
          width: "100%",
          borderRadius: 8,
          backgroundColor: "rgb(17, 27, 39)",
          display: "flex",
          marginRight: "auto"
        }}>
          {/* Input Box */}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }} />
          <IconButton onClick={handleSubmit} sx={{ ml: "auto", mx: 1, color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chats