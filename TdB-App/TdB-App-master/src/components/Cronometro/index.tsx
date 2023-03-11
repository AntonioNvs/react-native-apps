import React, { useEffect, useState } from 'react'

import {
  CronometroContainer,
  Timer,
  ButtonContainer,
  Button,
  TextButton,
  ButtonViewContainer,
} from './styles'

import Colors from '../../styles/globalColors';

interface CronometroOptions {
  onSecondsChange(sec: number): void;
  onStopChange(state: boolean): void;
}

const Cronometro: React.FC<CronometroOptions> = ({ 
  onSecondsChange,
  onStopChange
}) => {
  // Lógica Cronômetro
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSeconds(0);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 956);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    onSecondsChange(seconds)
  }, [seconds])

  useEffect(() => {
    onStopChange(!isActive)
  }, [isActive])

  return (
    <CronometroContainer>
      <Timer>
      {`${
        Math.floor((seconds % 3600) / 60) < 10 ? 
        `0${Math.floor((seconds % 3600) / 60)}`: 
        Math.floor((seconds % 3600) / 60)}:${Math.floor(seconds % 60) < 10 ? 
                                          `0${Math.floor(seconds % 60)}` : 
                                          Math.floor(seconds % 60)}`}
      </Timer>
      <ButtonContainer>
        <ButtonViewContainer>
          <Button color={Colors.green} onPress={toggle}>
            <TextButton>{isActive ? 'Pausar' : 'Iniciar'}</TextButton>
          </Button>
        </ButtonViewContainer>

        <ButtonViewContainer>
          <Button color={Colors.red} onPress={reset}>
            <TextButton>Zerar</TextButton>
          </Button>
        </ButtonViewContainer>
      </ButtonContainer>
    </CronometroContainer>
  )
}

export default Cronometro