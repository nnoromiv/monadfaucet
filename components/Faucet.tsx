"use client"

import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Button from './Button'
import { FaucetProps } from '../types'
import { CopyAddress } from '@/pages/api'
import Notification from './Notification'
import CountDown from './CountDown'

const Schema = Yup.object().shape({
  address: Yup.string().matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Monad address')
})


const Faucet: React.FC<FaucetProps> = ({ account, contractInstance }) => {

  const [countDown, setCountDown] = useState(0)
  const [notification, setNotification] = useState({
    type: '',
    message: ''
  })

  const getCoolDownPeriod = async(address: string) => {
    try {
      const result = await contractInstance._methods.getCooldownForAddress(address).call()
      return parseInt(result)
    } catch (error : any) {
      setNotification({
        type: 'error',
        message: error
      })
    }
  }

  const requestToken = async (address: string) => {
    try {
      await contractInstance._methods.requestTokens().send({ from: address })
      const result = await getCoolDownPeriod(address)

      if(result){
        console.log(result)
        setCountDown(result)
      }

      setNotification({
        type: 'success',
        message: 'Transaction Completed'
      })

    } catch (error : any) {
      if(error.message.includes('denied transaction')){
        setNotification({
          type: 'error',
          message: 'Transaction was cancelled'
        })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div className='bg-blueTint mt-10 mx-40 p-4 rounded-lg border-[2px] border-monadBlue relative dark:bg-blueTint2 dark:border-black max-[1024px]:mx-20 max-[768px]:mx-10 max-[426px]:mx-4'>
      {
        notification.type !== '' && notification.message !== '' &&
        <Notification
          type={notification.type}
          message={notification.message}
        />
      }
      <h1 className='text-white font-bold text-6xl dark:text-base-200 max-[768px]:text-5xl'>Get Monad Test Token</h1>
      <p className='text-monadBlue text-sm dark:text-white'>This faucet transfers Test Tokens and Gas Tokens. Please confirm details before submitting</p>
      <CountDown seconds={countDown}/>

      <div className='flex mt-2 max-[376px]:w-full flex-row items-center justify-between'>
        {
          account !== '' &&
          <h1 
            onClick={() => CopyAddress(account)}
            className='text-[10px]  mx-auto cursor-pointer bg-monadBlue px-3 py-1 rounded-full text-white dark:bg-monadPurple dark:text-black'
          >{account}</h1>
        }
      </div>
      <Formik
        initialValues={{
          address: ''
        }}
        onSubmit={i => console.log(i)}
        validationSchema={Schema}
        validateOnChange
      >
        {({ errors, values, isValid }) => (
          <>
            <Form className='mt-5'>
              <div className='text-red-900 font-bold mb-3'>{errors.address}</div>
              <Field
                type='text'
                name='address'
                placeholder='0x00000000000000000'
                required
                className='input text-black border-white bg-transparent w-full dark:text-white dark:border-base-200'
              />
            </Form>
            {
              isValid && !(values.address === '') ?
                <Button type='submit' onClick={() => requestToken(values.address)} style='btn-wide w-full my-5 bg-white text-black dark:bg-base-200 dark:text-white' title='Submit' />
                :
                <Button type='submit' style='btn-wide w-full my-5 bg-white text-black disabled opacity-30 dark:bg-base-200 dark:text-white' title='Submit' />
            }
          </>
        )}
      </Formik>
    </div>
  )
}

export default Faucet