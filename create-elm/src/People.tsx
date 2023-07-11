import React from 'react';
import type { Dispatch } from 'react'
import { Command, none, useElm } from './useElm';
import { fetchCommand, timeoutCommand } from './commands';

interface Person {
    id: number,
    name: string,
    age: number
}

type State = {
    people: Person[],
    errorMessage: string | null,
    requestCount: number,
}

type Action = {
    type: 'connectionError'
} | {
    type: 'ok',
    response: Person[]
} | {
    type: 'bad',
    statusCode: number
} | {
    type: 'oneMoreRequest'
}

const initialState: State = {
    people: [],
    errorMessage: null,
    requestCount: 0,
}

const fetchPeople = fetchCommand<Action, Person[]>(
    'http://localhost:8000/people',

    {
        onConnectionError(error) {
            const action: Action = {
                type: 'connectionError'
            }

            return action
        },

        onOk(body) {
            const action: Action = {
                type: 'ok',
                response: body
            }

            return action
        },

        onBad(statusCode) {
            const action: Action = {
                type: 'bad',
                statusCode
            }

            return action
        },
    }
)

const reducer = (state: State, action: Action): [State, Command<Action>] => {
    switch (action.type) {
        case 'connectionError': {
            const ms = 1000 * (2 ** state.requestCount)

            return [
                { 
                    people: state.people, 
                    errorMessage: `Connection error. Retrying after ${ms / 1000}s`, 
                    requestCount: state.requestCount + 1 
                }, 

                timeoutCommand(ms, { type: 'oneMoreRequest' })
            ];
        }
        case 'bad': {
            const ms = 1000 * (2 ** state.requestCount)

            return [
                {
                    people: state.people,
                    errorMessage: `Connection error, error code -> ${action.statusCode}. Retrying after ${ms / 1000}s`,
                    requestCount: state.requestCount + 1,
                },

                timeoutCommand(ms, { type: 'oneMoreRequest' })
            ]
        }
        case 'ok':
            return [
                {
                    people: action.response,
                    errorMessage: null,
                    requestCount: state.requestCount,
                },
                
                none
            ]
        case 'oneMoreRequest': 
            return [state, fetchPeople]
    }
}

function view(state: State, dispatch: Dispatch<Action>): JSX.Element {
    return (
    <>
        {state.errorMessage !== null && <p>{state.errorMessage}</p>}

        {state.people.map(p => (
            <p key={p.id}>
                {p.name} → {p.age} YOLO 
            </p>
        ))}
    </>
    )
}

export default function People() {
    const [state, dispatch] = useElm<State, Action>(
        [initialState, fetchPeople],
        reducer,
        true
    )

    return view(state, dispatch)
}
