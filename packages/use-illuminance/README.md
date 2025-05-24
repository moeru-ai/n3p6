# @n3p6/use-illuminance

<!-- automd:badges color="black" bundlephobia -->

[![npm version](https://img.shields.io/npm/v/@n3p6/use-illuminance?color=black)](https://npmjs.com/package/@n3p6/use-illuminance)
[![npm downloads](https://img.shields.io/npm/dm/@n3p6/use-illuminance?color=black)](https://npm.chart.dev/@n3p6/use-illuminance)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@n3p6/use-illuminance?color=black)](https://bundlephobia.com/package/@n3p6/use-illuminance)

<!-- /automd -->

A very small React Hook to help you get illuminance from [Ambient Light Sensor API](https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor).

## Usage

### Install

<!-- automd:pm-install auto=false -->

```sh
# npm
npm install @n3p6/use-illuminance

# yarn
yarn add @n3p6/use-illuminance

# pnpm
pnpm install @n3p6/use-illuminance

# bun
bun install @n3p6/use-illuminance

# deno
deno install @n3p6/use-illuminance
```

<!-- /automd -->

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
