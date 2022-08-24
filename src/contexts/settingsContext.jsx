import React, { useState, createContext, useEffect } from "react"

//import { SettingsContextProps } from "../interface/iSettings"

const SettingsContext = createContext()

const removeEventListening = () => {}

const SettingsProvider = ({ children }) => {
  const [showChatLogs, setShowChatLogs] = useState(false)
  const [chatWidth, setChatWidth] = useState(28)
  const [userDecision, setUserDecision] = useState(false)

  const toggleShowChatLogs = () => {
    setShowChatLogs((previous) => !previous)
  }

  const toggleUserDecision = () => {
    setUserDecision((previous) => !previous)
  }

  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setChatWidth(100)
    } else if (window.innerWidth > 1200) {
      setChatWidth(28)
    }
  }

  useEffect(() => {
    if (userDecision === true) {
      return
    }
    if (userDecision === false) {
      window.addEventListener("resize", handleResize, false)
      handleResize()
      return () => {
        window.removeEventListener("resize", handleResize, false)
      }
    }
  }, [userDecision])

  return (
    <SettingsContext.Provider
      value={{
        showChatLogs,
        toggleShowChatLogs,
        chatWidth,
        setChatWidth,
        handleResize,
        toggleUserDecision,
        userDecision,
        setUserDecision,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }
