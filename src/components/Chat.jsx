import React, { useRef, useEffect } from "react"

//Components
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"

//Material UI
import Grid from "@mui/material/Grid"
import Drawer from "@mui/material/Drawer"
import { useTheme } from "@mui/material/styles"

const Chat = ({ sendMessage, messages, isOpen, clientId }) => {
  const theme = useTheme()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isOpen])

  return (
    <Drawer
      PaperProps={{
        sx: {
          //backgroundColor: "#000",
          right: 0,
          width: "100%",
          [theme.breakpoints.up("lg")]: {
            width: "28%",
          },
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
      hideBackdrop
    >
      <Grid
        container
        direction="row"
        alignContent={"flex-end"}
        style={{
          //minHeight: "100vh",
          marginBottom: "3.5em",
          marginTop: "2.8em",
          //backgroundColor: "#000",
          flex: "auto",
        }}
      >
        <ChatMessages messages={messages} clientId={clientId} />
      </Grid>

      <ChatInput
        style={{ position: "fixed", bottom: "0" }}
        sendMessage={sendMessage}
      />

      <Grid item style={{ height: "0px" }} ref={bottomRef}></Grid>
    </Drawer>
  )
}

export default Chat
