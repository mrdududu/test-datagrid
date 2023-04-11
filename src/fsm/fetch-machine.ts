import { createMachine, assign } from 'xstate'

export const fetchMachine = <T>(fetchFunc: () => any) => {
  interface FetchMachineContext {
    data?: T
    error?: string
  }

  type FetchMachineEvent =
    | { type: 'FETCH' }
    | { type: 'RESOLVE'; data: T }
    | { type: 'REJECT'; error: string }

  type FetchMachineTypestate =
    | {
        value: 'idle'
        context: FetchMachineContext & {
          data: undefined
          error: undefined
        }
      }
    | {
        value: 'loading'
        context: FetchMachineContext
      }
    | {
        value: 'success'
        context: FetchMachineContext & {
          data: T
          error: undefined
        }
      }
    | {
        value: 'failture'
        context: FetchMachineContext & {
          data: undefined
          error: string
        }
      }

  return createMachine<FetchMachineContext, FetchMachineEvent, FetchMachineTypestate>({
    /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiAIwAWAOw4AHADZ5TAMzyZEgKyqATExnyANCACekpopyLVEpvOm6tWprqUBfdydSZchLgCGEHiCUCQQQmD4ggBuXADWUT7YOP5BIVAIIXEYAfxCzCyFIty8+cJIYohSUkwK8g2qUi4G8loAnFom5gi6MlaKWjVKtrrt0pae3ugpacGhJGAATktcSzgchHnIawC2OMl+gfOZ2Vy55YXFlaV8AhWg4gg1dQ2NzUytHV1mkrY47UUnyBmna8nGukUUxAhxwsAArhgMHBYORqPRrpweHchCInlJ5LoFMomBJdHpAQYJN1ELpITgJITIYT5KpDH1dNDYcgAnhCGh4UtSJRaIxWCVseU8dVCcSVGSKSDqb8EA4cATDFJIe0DB12qpPF4QIIuBA4CJDhKyvdpQgALSKGn2qFG2EEYhWnEPKrPXROuxyMnk9o6xmA-ryLkzI7pUKeqWVJ5OKQ4XQSVRaCSM1RMZpOJ2s6xuZrtNNDdoyKO+OGI5GweA3SU2xOILTg1PpglDGoydTGFXklMyZwSXttmS5sFVlI8vkCoXx5uPVvttNNNo1WR9p06nCWAyyEO1PpMLSG9xAA */
    id: 'fetch',
    predictableActionArguments: true,
    initial: 'idle',
    context: {},
    states: {
      idle: {
        on: {
          FETCH: 'loading'
        }
      },
      loading: {
        invoke: {
          src: () => fetchFunc(),
          onDone: {
            target: 'success',
            actions: assign({ data: (_, event) => event.data })
          },
          onError: {
            target: 'failture',
            actions: assign({ error: (_, event) => event.data })
          }
        }
      },
      success: {
        on: {
          FETCH: 'loading'
        }
      },
      failture: {
        on: {
          FETCH: 'loading'
        }
      }
    }
  })
}
