import Image from 'next/image'
import React, { useState } from 'react'
import { LOGO } from '../constants'
import Link from 'next/link'
import ModeSwitch from '../src/app/ModeSwitch'
import { ConnectWallet, DisconnectWallet } from '@/pages/api'
import { NavBarProps } from '../types'
import Notification from './Notification'

const NavBar: React.FC<NavBarProps> = ({ account, handleAccount }) => {

  const [switcher, setSwitcher] = useState(false)
  const [notification, setNotification] = useState({
    type: '',
    message: ''
  })

  const handleConnect = async () => {
    try {
      const result = await ConnectWallet()

      handleAccount(result)
      setSwitcher(true)

      setNotification({
        type: 'success',
        message: `Account connected`
      })
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message
      })
    }
  }

  const disconnectModal = async () => {
    if (document !== null) {
      const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null
      modal !== null && modal.showModal()
    }
  }

  const handleDisconnect = async () => {
    try {
      const result = await DisconnectWallet(account)

      if (result === undefined) {
        handleAccount('')
        setSwitcher(false)

        setNotification({
          type: 'success',
          message: `Account disconnected`
        })
      }
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message
      })
    }
  }

  return (
    <nav className="w-full flex flex-row p-3 px-10 justify-between max-[426px]:px-2">
      <Image
        alt='Logo'
        src={LOGO}
        width={150}
        height={150}
        className='max-[321px]:hidden'
      />

      {
        notification.type !== '' && notification.message !== '' &&
        <Notification
          type={notification.type}
          message={notification.message}
        />
      }

      <div className="flex flex-row gap-20 items-center max-[768px]:gap-3 ml-auto">
        <Link
          href={'https://monadlabs.xyz'}
          target='_blank'
          className='text-monadBlue text-base font-medium hover:text-monadPurple dark:text-monadPurple dark:hover:text-monadBlue max-[426px]:hidden'
        >MONAD LABS</Link>
        <Link
          href={'https://monad.xyz'}
          target='_blank'
          className='text-monadBlue text-base font-medium hover:text-monadPurple dark:text-monadPurple dark:hover:text-monadBlue max-[426px]:hidden'
        >MONAD</Link>
        {
          switcher ? (
            <div className="flex gap-1 items-center cursor-pointer" onClick={disconnectModal}>
              <em className="h-3 w-3 rounded-full bg-green-800 border-[1px]"></em>
              <h2 className="text-green-800">Connected</h2>
            </div>
          ) : (
            <div className="flex gap-1 items-center cursor-pointer" onClick={handleConnect}>
              <em className="h-3 w-3 rounded-full bg-red-800 border-[1px]"></em>
              <h2 className="text-red-800">Disconnected</h2>
            </div>
          )}
        <ModeSwitch />
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-whiteRabbit dark:bg-base-200">
          <h3 className="font-bold text-lg text-black dark:text-white">Gmonad!</h3>
          <p className="py-4 text-black dark:text-white">Do you want to disconnect your wallet ?</p>
          <div className="modal-action">
            <form method="dialog" className='flex gap-10'>
              <button className="btn bg-red-900" onClick={handleDisconnect} >Yes</button>
              <button className="btn bg-green-900">No</button>
            </form>
          </div>
        </div>
      </dialog>

    </nav>
  )
}

export default NavBar