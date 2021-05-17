import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from './components/input';

const App = () => {
  const [initialStake, setInitialStake] = useState(10)
  const [incrementValue, setIncrementValue] = useState(10)
  const [timeValue, setTimeValue] = useState(60) //seconds
  const intervalAmount = useRef(1) //minutes
  const [timerIsPaused, setTimerIsPaused] = useState(false)
  const timerRef = useRef()

  const decrementTime = useCallback(() => {
    console.log('decrementing', timeValue)
    const t = timeValue - 1;
    console.log('new', t)
    setTimeValue(t)
  }, [timeValue])
  
  const onStartTimer = useCallback(() => { //nafsa l resume
    timerRef.current = setInterval(decrementTime, 1000)
    setTimerIsPaused(false)
  }, [timerRef, decrementTime])
  
  const onStopTimer = useCallback(() => { //reset w stop
    setTimeValue(intervalAmount.current * 60)
    clearInterval(timerRef.current)
    timerRef.current = null
  }, [timerRef])

  const pauseTimer = useCallback(() => {
    setTimerIsPaused(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const onChangeIntervalAmount = useCallback((val) => {
    intervalAmount.current = val
  }, [])

  useEffect(() => {
    if (timeValue === 0) {
      console.log('manya')
      onStopTimer()
      onStartTimer()
    }
  }, [timeValue, onStartTimer, onStopTimer])

  return (
    <div className="page">
      <div className="row">
      <p>{timeValue}</p>
      </div>
      <div className="row">
            <h1 id="currentStakeText" className="text-center">Current Stake</h1>
            <h1 className="text-center">$<span id="currentStake">0</span></h1>
        </div>
      <div className="row">
        <div className="col-md-6">
          <Input label="Initial Stake" controlled value={initialStake} changeText={setInitialStake} minValue="10"/>
          <Input label="Increment Value" controlled value={incrementValue} changeText={setIncrementValue} minValue="10"/>
          <Input label="Time Value" value={intervalAmount.current} changeText={onChangeIntervalAmount} minValue="1"/>
          <div className="btn-container">
            <button className="btn btn-success" onClick={onStartTimer}>Start</button>
            <button className="btn btn-warning ml-5" disabled onClick={timerIsPaused ? pauseTimer : onStartTimer}>{timerIsPaused ? "Resume" : "Pause"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
