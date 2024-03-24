"use client"

import React, { useEffect, useState } from 'react'
import { Notification, Faucet, Footer, NavBar } from '../../components'
import Image from 'next/image'
import { BG_ONE, BG_TWO } from '../../constants'
import { InitApp, InitializeContract } from '@/pages/api'
import detectEthereumProvider from '@metamask/detect-provider'
import { useAccount } from '../../hooks'

const Home = () => {

  const { account, handleAccount } = useAccount()
  const [contractInstance, setContractInstance] = useState<any>(null)
  const [provider, setProvider] = useState<any>()

  const [notification, setNotification] = useState({
    type: '',
    message: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await InitializeContract()
        const providerResult = await detectEthereumProvider()

        if (result && providerResult) {
          setContractInstance(result)

          const pr = InitApp(providerResult)
          setProvider(pr)
        }
      } catch (error: any) {
        setNotification({
          type: 'error',
          message: error
        })
      }
    }

    fetchData()
  }, [])

  return (
    <main className='h-[100vh] bg-whiteRabbit  dark:bg-base-200 max-[768px]:h-full max-[768px]:pb-10'>
      <NavBar account={account} handleAccount={handleAccount} />
      {
        notification.type !== '' && notification.message !== '' &&
        <Notification
          type={notification.type}
          message={notification.message}
        />
      }
      <Image src={BG_ONE} alt='background' width={400} height={400} className='absolute rotate-12 max-[768px]:hidden' />
      <Image src={BG_TWO} alt='background' width={400} height={400} className='absolute right-0 max-[768px]:hidden' />
      <h1 className='text-center font-bold text-8xl mt-4 text-blueTint relative dark:text-blueTint2 monadText max-[321px]:text-7xl'>Monad Faucet.</h1>
      <Faucet account={account} contractInstance={contractInstance} />
      <Footer />
    </main>
  )
}

export default Home