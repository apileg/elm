import { Command } from './useElm'

export function fetchCommand<Action, Body>(
    url: string, 
    handlers: {
        onConnectionError: (error: Error) => Action,
        onOk: (body: Body) => Action,
        onBad: (statusCode: number) => Action
    }
): Command<Action> {
    return {
        toString() {
            return 'fetch'
        },

        async execute(dispatch) {
            try {
                const response = await fetch(url)

                if (response.ok) {
                    const json = await response.json()

                    dispatch(
                        handlers.onOk(json)
                    )
                    
                    return
                }

                dispatch(
                    handlers.onBad(response.status)
                )
            }
            catch (error) {
                dispatch(
                    handlers.onConnectionError(error as Error)
                )
            }
        }
    }
}

export function timeoutCommand<Action>(
    ms: number, 
    onTimeoutAction: Action
): Command<Action> {
    return {
        toString() {
            return `timeout ${ms}ms`
        },

        execute(dispatch) {
            setTimeout(() => dispatch(onTimeoutAction), ms)
        },
    }
}
