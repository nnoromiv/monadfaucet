"use client"

import { useState } from 'react'

const useMode = () => {
  const [mode, setMode] = useState<string>("light")

  const handleMode = () => {
    if (mode === 'light') {

      setMode('dark')

    } else {

      setMode('light')

    }
  }
  return {mode, handleMode}
}

export default useMode