import { useState } from 'react'

const useAccount = () => {
    const [ account, setAccount ] = useState<string>('')

    const handleAccount = (i :any) => {
        setAccount(i)
    }

  return {
    account, handleAccount
  }
}

export default useAccount