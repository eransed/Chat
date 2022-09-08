import React, { useRef, useContext, useState } from "react"

//Material UI
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined"

//Reactions
import {
  FacebookSelector,
  FacebookCounterReaction,
} from "@charkour/react-reactions"

//Interface
import { msgObj } from "../interface/iMessages"

import { SettingsContext } from "../contexts/settingsContext"

const RegularMessageBlock = ({ msgObj, clientId, handleReaction }) => {
  const {
    showMyAvatar,
    toggleShowMyAvatar,
    userName,
    temporaryName,
    chatWidth,
  } = useContext(SettingsContext)
  const [showReactionBar, setShowReactionBar] = useState(false)
  const [hoverReactionIcon, setHoverReactionIcon] = useState(false)
  const [showCardActions, setShowCardActions] = useState(false)
  const [hoverReaction, setHoverReaction] = useState(false)
  const cardRef = useRef(null)
  const myMessage = msgObj.cid === clientId

  const messageDate = new Date(msgObj.rxDate).toLocaleTimeString("sv-SV")

  const avatarSettings = {
    size: "2em",
    margin: "0.4em",
    fontSize: "1em",
  }

  const userColor = () => {
    const color = msgObj.cid

    const colorPicker = {
      1: "#F6A993",
      2: "#829C86",
      3: "#FBDEBB",
      4: "#D486AB",
      5: "#7554AA",
      6: "#F9CDA7",
      7: "#F6DBB2",
      8: "#EDA146",
      9: "#E8498C",
      10: "#6A518E",
    }

    return colorPicker[color > 10 ? 10 : color]
  }

  const toggleReactionSelector = () => {
    setShowReactionBar((previous) => !previous)
  }

  const handleChosenReaction = (value) => {
    const reactionObj = {
      emoji: value,
      by: userName ? userName : temporaryName,
      cid: clientId,
      color: userColor(),
      srvAck: false,
    }

    msgObj.reactions.push(reactionObj)
    msgObj.newReaction = true

    handleReaction(msgObj)
    setShowReactionBar(false)
  }

  const hoverReactionElement = (username) => {
    return (
      <span
        style={{
          fontSize: "0.55em",
          fontWeight: "bold",
          display: "flex",
          width: "fit-content",
        }}
      >
        <span>{username}</span>
      </span>
    )
  }

  const toggleHoverReactions = () => {
    setHoverReaction((previous) => !previous)
  }

  console.log(chatWidth)

  const reactionElement = () => {
    if (msgObj.reactions) {
      return (
        <Fade in timeout={500}>
          <span
            style={{
              float: myMessage ? "right" : "left",
              zoom: 1.5,
              width: "fit-content",
              cursor: "pointer",
            }}
          >
            <span
              style={{ display: "flex", width: "fit-content" }}
              onPointerDown={() => toggleHoverReactions()}
            >
              {msgObj.reactions.map((reaction, index) => (
                <span key={index} style={{ display: "flex", direction: "row" }}>
                  <span
                    style={{
                      marginRight: hoverReaction ? "0.3em" : "",
                      marginLeft: hoverReaction ? "0.3em" : "0.15em",
                      width: "fit-content",
                      transition: "ease margin 0.3s",
                    }}
                  >
                    {reaction.srvAck ? (
                      <FacebookCounterReaction
                        key={index}
                        reaction={reaction.emoji}
                        bg={"#fff"}
                        variant={"facebook"}
                      />
                    ) : (
                      <CircularProgress size={16} thickness={10} />
                    )}
                  </span>
                  {hoverReaction && hoverReactionElement(reaction.by)}
                </span>
              ))}
            </span>
          </span>
        </Fade>
      )
    }
  }

  return (
    <div
      sx={{ width: "fit-content" }}
      onMouseEnter={() => setShowCardActions(true)}
      onMouseLeave={() => setShowCardActions(false)}
    >
      <CardHeader
        sx={{
          padding: "0",
          opacity: "0.8",
          width: "fit-content",
        }}
        subheaderTypographyProps={{ marginLeft: myMessage ? "" : "2.5em" }}
        subheader={
          msgObj.user + " - " + (msgObj.srvAck ? "" : "*") + messageDate
        }
      />

      {(showMyAvatar || !myMessage) && (
        <Avatar
          sx={{
            float: myMessage ? "right" : "left",
            width: avatarSettings.size,
            height: avatarSettings.size,
            marginTop: avatarSettings.margin,
            marginRight: myMessage ? "" : avatarSettings.margin,
            marginLeft: myMessage ? avatarSettings.margin : "",
            fontSize: avatarSettings.fontSize,
            bgcolor: userColor(),
            color: "#fff",
          }}
        >
          {Array.from(msgObj.user)[0]}
          {Array.from(msgObj.user)[msgObj.user.length - 1]}
        </Avatar>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: myMessage ? "row-reverse" : "row",
        }}
      >
        <Card
          style={{
            width: "fit-content",
            textAlign: "left",
            borderRadius: "18px",

            backgroundColor: "unset",
            borderBottomLeftRadius: myMessage ? "18px" : "4px",
            borderBottomRightRadius: myMessage ? "4px" : "18px",
          }}
          elevation={0}
        >
          <CardContent
            style={{
              width: "fit-content",
              padding: "12px",

              backgroundColor: myMessage ? "rgb(212, 168, 140)" : "#E4E6EB",
              color: myMessage ? "#fff" : "#000",
            }}
          >
            <span
              ref={cardRef}
              style={{ wordBreak: "break-word", width: "fit-content" }}
            >
              {msgObj.text}
            </span>
            {showReactionBar && (
              <span
                style={
                  myMessage
                    ? {
                        right: "2.6em",
                        display: "flex",
                        zIndex: "1",
                        padding: "unset",
                        margin: "unset",
                        position: "absolute",
                      }
                    : {
                        left: "3.8em",
                        display: "flex",
                        zIndex: "1",
                        padding: "unset",
                        margin: "unset",
                        position: "absolute",
                      }
                }
              >
                <Backdrop
                  open={showReactionBar}
                  sx={{ zIndex: 2, backgroundColor: "transparent" }}
                  onPointerDown={() => setShowReactionBar(false)}
                ></Backdrop>
                <span style={{ zIndex: 1000 }}>
                  <FacebookSelector
                    iconSize={30}
                    style={{ width: "fit-content" }}
                    onSelect={(value) => handleChosenReaction(value)}
                  />
                </span>
              </span>
            )}
          </CardContent>
        </Card>
        {(showCardActions || chatWidth === 100) && (
          <CardActions
            disableSpacing
            sx={{
              //marginLeft: myMessage ? "" : textWidth,
              position: "relative",
              float: myMessage ? "right" : "left",
              display: "flex",
              backgroundColor: "unset",
            }}
          >
            <AddReactionOutlinedIcon
              onMouseDown={() => toggleReactionSelector()}
              sx={{
                opacity: hoverReactionIcon ? 1 : 0.5,
                transition: "ease transform 0.5s",
                transform: showReactionBar
                  ? `rotate(${myMessage ? "-1turn" : "1turn"})`
                  : `rotate(0turn)`,
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverReactionIcon(true)}
              onMouseLeave={() => setHoverReactionIcon(false)}
            />
          </CardActions>
        )}
      </div>

      {reactionElement()}
    </div>
  )
}

export default RegularMessageBlock
