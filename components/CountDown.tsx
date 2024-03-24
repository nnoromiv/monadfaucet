import { useEffect, useState } from 'react'
import { CountDownProps } from '../types'

const  CountDown:React.FC<CountDownProps> = ({ seconds }) => {
    const [timeLeft, setTimeLeft] = useState({
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const countDownInterval = setInterval(() => {
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60

            setTimeLeft({ minutes, seconds: secs})
            if (seconds > 0){
                seconds--
            }else {
                clearInterval(countDownInterval)
            }
        }, 1000)

        return () => {
            clearInterval(countDownInterval)
        }
    },[seconds])

  return (
    <div className='text-white font-bold text-xl mt-5 dark:text-base-200'>
        {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
    </div>
  )
}

export default CountDown