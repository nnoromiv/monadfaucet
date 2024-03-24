import { CopyAddress } from '@/pages/api'
import { faDiscord, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const FAUCET = process.env.NEXT_PUBLIC_CONTRACT

const Footer = () => {
    return (
        <footer className='border-t-[2px] border-t-monadBlue mt-10 mx-10 relative max-[426px]:mx-auto'>
            <div className='flex justify-evenly mt-5'>
                <Link href={'https://www.linkedin.com/company/monadlabs/'} target='_blank'>
                    <FontAwesomeIcon fade icon={faLinkedin} className='w-[50px] h-[50px] text-monadPurple cursor-pointer relative' />
                </Link>
                <FontAwesomeIcon fade icon={faDiscord} className='w-[50px] h-[50px] text-monadPurple cursor-pointer' />
                <FontAwesomeIcon fade icon={faXTwitter} className='w-[50px] h-[50px] text-monadPurple cursor-pointer' />
            </div>
            <div className='mt-2 flex flex-col text-center'>
                    {
                        FAUCET !== undefined &&
                        <h1
                            onClick={() => CopyAddress(FAUCET)}
                        className='w-fit max-[376px]:w-full self-center cursor-pointer my-2 text-[10px] bg-monadBlue px-3 py-1 rounded-full text-white dark:bg-monadPurple dark:text-black'
                        >   {FAUCET}
                        </h1>
                    }
                <h4> Copyright © 2024 Faucet</h4>
            </div>
        </footer>
    )
}

export default Footer