# @n3p6/use-illuminance

A very small React Hook to help you get illuminance from [Ambient Light Sensor API](https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor).

## Usage

### Install

### Example

```tsx
import { useIlluminance } from '@n3p6/use-illuminance'

const App = () => {
  const illuminance = useIlluminance()

  return (
    <div>
      <h1>Illuminance:</h1>
      <span>{illuminance}</span>
    </div>
  )
}

export default App
```

# License

[MIT](../../LICENSE.md)
