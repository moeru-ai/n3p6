# @n3p6/use-speech-recognition

A very small React Hook to help you use [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) from [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

## Usage

### Install

### Example

```tsx
import { useSpeechRecognition } from '@n3p6/use-speech-recognition'

const App = () => {
  const { isFinal, isListening, isSupported, result, start, stop } = useSpeechRecognition()

  return (
    <div>
      <p>
        isSupported:
        {isSupported}
      </p>
      <p>
        isListening:
        {isListening}
      </p>
      <p>
        isFinal:
        {isFinal}
      </p>
      <p>
        result:
        {result}
      </p>
      <button data-test-id="start" onClick={start} type="submit">Start</button>
      <button data-test-id="stop" onClick={stop} type="submit">Stop</button>
    </div>
  )
}

export default App
```

# License

[MIT](../../LICENSE.md)
