import React, { useReducer } from "react"
import type { Dispatch, ChangeEventHandler } from 'react'
import logHistory from './logHistory'

//> Text
//
//- text   [x]
//- text 2 [x]
//- text 3 [x]
//- text 4 [x]
//- text 5 [x]
//- text 7 [x]
//- Text   [x]

type State = {
    input: string,
    todos: string[]
}

const initialState: State = {input: '', todos: []}

type Action = { type: 'add' } | { type: 'remove', index: number } | { type: 'input', input: string }

const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'add':
            if (state.input.trim() !== '') {
                return {
                    input: '',
                    todos: [...state.todos, state.input]
                }
            }

            return {
                input: '',
                todos: state.todos
            }
            
        case 'remove':
            return {
                input: state.input,
                todos: state.todos.filter((_, i) => i !== action.index)
            }
        
        case 'input': {
            return {
                input: action.input,
                todos: state.todos
            }
        }
    }
}

const view = (state: State, dispatch: Dispatch<Action>): JSX.Element => {
    const todos = (
        <ul>
            {state.todos.map((el, i) => (
                <li key={i} style={{whiteSpace: 'nowrap'}}>
                    {el} {' '} 
                    <span onClick={() => dispatch({type: 'remove', index: i})} style={{cursor: 'pointer', color: 'red'}}>
                        [x]
                    </span>
                </li>
            ))}
        </ul>
    )
    const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            dispatch({type: 'add'})
        }
    }

    const updateInput: ChangeEventHandler<HTMLInputElement> = e => {
       dispatch({type: 'input', input: e.target.value })
    }

    return (
        <>
           <input type='text' value={state.input} onChange={updateInput} 
           onKeyPress={addTodo}/>
           {todos} 
        </>
    )
}

export function Todo() {
    const [state, dispatch] = useReducer(
        logHistory(reducer),
        initialState
    )

    return view(state, dispatch)
}
 
//State
//reducer(State, Action): State
//view(State, dispatch): JSX

fetch('http://localhost:8000/people').then(r => r.json()).then(console.log)
