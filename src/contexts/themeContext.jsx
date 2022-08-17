import React, { useState, createContext } from "react"

//Material-ui
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const DarkModeContext = createContext()

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
})

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  )
}

export { DarkModeContext, DarkModeProvider }