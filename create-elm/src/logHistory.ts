export default function logHistory<State, Action>(
    reducer: (s: State, a: Action) => State
): (s: State, a: Action) => State {
    return (state, action) => {
        console.log('State: ')
        console.log(state)
        console.log('Action: ')
        console.log(action)
    
        const newState = reducer(state, action)
    
        console.log('New state: ')
        console.log(newState)
        console.log()
    
        return newState
    }
}

