import { Dispatch, useEffect, useReducer } from 'react';

export interface Command<Action> {
    toString(): string,
    execute(dispatch: (value: Action) => void): void
}

export const none: Command<any> = {
    toString() {
        return 'none'
    },
    
    execute(dispatch) {},
}

export function useElm<State, Action>(
    initialPair: [State, Command<Action>],
    reducer: (state: State, action: Action) => [State, Command<Action>],
    log: boolean
): [State, Dispatch<Action>] {
    const [state, dispatch] = useReducer(
        (state: WrappedState<State, Action>, action: Action) => {
            if (log && state.logInitialPair) {
                console.log('Initial state: ')
                console.log(initialPair[0])
    
                console.log(`Initial command: ${initialPair[1].toString()}`)
                console.log()
            }

            if (log) {
                console.log('State: ')
                console.log(state.state)
    
                console.log('Action: ')
                console.log(action)
            }

            const [newState, command] = reducer(state.state, action)

            if (log) {
                console.log('New state: ')
                console.log(newState)

                console.log(`Command: ${command.toString()}`)

                console.log()
            }

            return {
                state: newState,
                command,
                logInitialPair: false
            }
        },

        {
            state: initialPair[0],
            command: initialPair[1],
            logInitialPair: true
        }
    )

    useEffect(() => {
        state.command.execute(dispatch);
    }, [state.command]);

    return [state.state, dispatch]
}

interface WrappedState<State, Action> {
    state: State,
    command: Command<Action>,
    logInitialPair: boolean
}

