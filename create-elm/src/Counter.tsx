import React from 'react';
import { useReducer } from 'react';
import type { Dispatch } from 'react';

type State = {
    count: number
};

type Action = 'increment' | 'decrement';

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
    switch (action) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
    }
}

function view(state: State, dispatch: Dispatch<Action>): JSX.Element {
    return (
        <>
            <p>
                Count: {state.count}
            </p>
            <button onClick={() => dispatch('increment')}>+</button>
            <button onClick={() => dispatch('decrement')}>-</button>
        </>
    )
}

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return view(state, dispatch);
}
