"use client"

import { ThemeProvider } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { ProviderProps } from '../../types'

const Provider:React.FC<ProviderProps> = ({ children }) => {

    const [mounted,setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted) {return <>{children}</>}

  return (
    <ThemeProvider enableSystem attribute='class'>
        {children}
    </ThemeProvider>
  )
}

export default Provider