/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer, useState } from "react"

enum TYPE { increment, decrement }

const VALUE = 2

export default function Memo() {
    const [counter, setCounter] = useState(0)
    const [number, setNumber] = useState<number | string>(0)

    const initialState = { count: 0 }

    const reducer = (state: { count: number }, action: { type: TYPE, payload: number }) => {
        switch (action.type) {
            case TYPE.increment:
                return { count: state.count + action.payload }
            case TYPE.decrement:
                return { count: state.count - action.payload }
            default:
                return { count: state.count }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleStateCounter = () => {
        setCounter((prev) => prev + VALUE)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentNumber = typeof number === 'number' ? e.target.value : parseInt(e.target.value);
        setNumber(currentNumber)
    }

    const cubeNumber = (number: string | number) => {
        console.log('////////////// cube number: ' + counter)
        return Math.pow(typeof number === 'number' ? number : 1, 3)
    }

    const result = useMemo(() => cubeNumber(number), [number])

    return (
        <main className="center gap-4">
            <h1>Reducer Counter: {state.count}</h1>
            <button className="button" onClick={() => dispatch({ type: TYPE.increment, payload: VALUE })}>Increament</button>
            <h1>Cube number: {result}</h1>
            <input type="number" value={number === '' ? '' : number} className="input" onChange={handleInputChange} />
            <h1>Set Counter: {counter}</h1>
            <button className="button" onClick={handleStateCounter}>Increament</button>
        </main>
    )
}
