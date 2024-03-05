import { Box, Button, Center, VStack } from '@chakra-ui/react'
import { LOADIPHLPAPI } from 'dns'
import React, { useState } from 'react'

const Test = () => {
  const name = 'mikio'
  const [time, setTime] = useState<number>(0)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [laps, setLapTime] = useState<number[]>([])

  const handleStart = () => {
    if (timerId) return
    // 10ミリ秒ごとにtimeの変数を上書き
    const id: NodeJS.Timeout = setInterval(() => setTime((prevTime) => prevTime + 10), 10)
    setTimerId(id)
  }
  // Stopボタンを押した時の処理
  const handleStop = () => {
    // 一定間隔ごとに実行する処理を解除
    if (timerId) clearInterval(timerId)
    setTimerId(null)
  }

  // リセットボタンを押した時の処理
  const handleReset = () => {
    setTime(0)
    if (timerId) clearInterval(timerId)
    setTimerId(null)
    setLapTime([])
  }

  const lap = () => {
    setLapTime([...laps, time])
  }

  interface LapListProps {
    laps: number[]
  }

  function LapList({ laps }: LapListProps) {
    return (
      <div>
        {laps.map((lap, index) => (
          <div key={index}>
            Lap {index + 1}: {lap / 1000} s
          </div>
        ))}
      </div>
    )
  }

  return (
    <Box mt={200}>
      <Center>
        <VStack spacing={2}>
          <div>{(time / 1000).toFixed(2)} s</div>
          <Button onClick={handleStart} colorScheme="red">
            Start
          </Button>
          <Button onClick={handleStop}>Stop</Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={lap}>Lap</Button>
          <LapList laps={laps} />
        </VStack>
      </Center>
    </Box>
  )
}

export default Test
