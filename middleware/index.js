import { applyMiddleware } from 'redux'

const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('action is ', action)
    const returnValue = next(action)
    console.log('state is ', store.getState())
    console.groupEnd()
    return returnValue
}

export default applyMiddleware(logger)