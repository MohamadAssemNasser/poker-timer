import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from './components/input';



const App = () => {
  const [initialStake, setInitialStake] = useState(10)
  const [incrementValue, setIncrementValue] = useState(10)
  const [timeValue, setTimeValue] = useState(60) //seconds
  const [currentStake, setCurrentStake] = useState(initialStake); 
  const intervalAmount = useRef(1) //minutes
  const [timerIsPaused, setTimerIsPaused] = useState(false)
  const [timerWasReset, setTimerWasReset] = useState(true)
  const timerRef = useRef()
  
  const onStartTimer = useCallback(() => { //nafsa l resume
    timerRef.current = setInterval(() => {
      setTimeValue(old => old - 20)
    }, 1000)
    setTimerIsPaused(false)
    setTimerWasReset(false)
  }, [timerRef])
  
  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimerIsPaused(true)
  }, [])

  useEffect(()=> {
    console.log(timerWasReset)
  }, [timerWasReset])
  
  const onStopTimer = useCallback(() => { //reset w stop
    setTimeValue(intervalAmount.current * 60)
    setCurrentStake(initialStake)
    setTimerWasReset(true)
  }, [initialStake])


  const onChangeIntervalAmount = useCallback((val) => {
    intervalAmount.current = val
  }, [])

  useEffect(() => {
    if (timeValue === 0) {
      onStopTimer()
      setCurrentStake(parseInt(currentStake) + parseInt(incrementValue))
      onStartTimer()
    }
  }, [timeValue, incrementValue, currentStake, onStartTimer, onStopTimer])

  return (
    <div className="page">
      <div className="row">
      <p>{timeValue}</p>
      </div>
      <div className="row">
            <h1 id="currentStakeText" className="text-center">Current Stake</h1>
            <h1 className="text-center">$<span id="currentStake">{currentStake}</span></h1>
        </div>
      <div className="row">
        <div className="col-md-6">
          <Input label="Initial Stake" controlled value={initialStake} changeText={setInitialStake} minValue={10}/>
          <Input label="Increment Value" controlled value={incrementValue} changeText={setIncrementValue} minValue={10}/>
          <Input label="Time Value" value={intervalAmount.current} changeText={onChangeIntervalAmount} minValue={1}/>
          <div className="btn-container">
            {timerWasReset ?
            (<button className="btn btn-success" onClick={onStartTimer}>Start</button>)
            : (<button className="btn btn-danger" onClick={onStopTimer}>Reset</button>)}
            {timerWasReset ? (<></>) : <button className="btn btn-warning ml-5" onClick={timerIsPaused ? onStartTimer : pauseTimer}>
              {timerIsPaused ? "Resume" : "Pause"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
