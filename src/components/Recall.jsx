import React, { useRef, useEffect } from "react"

//Material-ui
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"

const Recall = ({ myMessages, recallMsg, handleSendMessage, oldMsgNumber }) => {
  const listRef = useRef(null)

  return (
    <Box sx={{ marginLeft: "1em" }}>
      <List
        sx={{
          padding: !recallMsg && "0 0 0 0 ",
          overflow: "auto",
        }}
      >
        {myMessages &&
          recallMsg &&
          myMessages.map((previousMsg, index) => {
            return (
              <ListItemButton
                selected={oldMsgNumber === index}
                key={index}
                onPointerDown={(e) => handleSendMessage(e)}
                ref={listRef}
              >
                {previousMsg}
              </ListItemButton>
            )
          })}
      </List>
    </Box>
  )
}

export default Recall
