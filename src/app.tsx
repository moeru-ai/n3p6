import { useState } from 'react'

export const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>N3P6 by Moeru AI</h1>
      <button
        data-test-id="counter"
        onClick={() => setCount(count => count + 1)}
        type="button"
      >
        count is
        {' '}
        {count}
      </button>
    </>
  )
}
