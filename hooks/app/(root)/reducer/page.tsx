import React, { useReducer } from 'react'

enum TYPE { increment, decrement }

interface Action { type: TYPE; payload: number }
interface State { width: number }

export default function Reducer() {
    const initialState: State = { width: 100 }
    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case TYPE.increment:
                return { width: state.width + action.payload }
            case TYPE.decrement:
                return { width: Math.max(state.width - action.payload, 10) }
            default:
                return { width: state.width + 10 }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <main className='h-screen flex flex-col items-center justify-center gap-4'>
            <h1 className={`h-[50px] bg-teal-500 rounded-md`} style={{ width: `${state.width}px` }}></h1>
            <div className="space-x-4">
                <button className='border border-teal-400 px-5 py-2 rounded-md' onClick={() => dispatch({ type: TYPE.increment, payload: 20 })}>Increase</button>
                <button className='border border-teal-400 px-5 py-2 rounded-md' onClick={() => dispatch({ type: TYPE.decrement, payload: 50 })}>Decrease</button>
            </div>
        </main>
    )
}
