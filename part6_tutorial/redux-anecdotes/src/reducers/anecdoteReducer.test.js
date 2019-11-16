import deepFreeze from 'deep-freeze'
import ancedoteReducer from './anecdoteReducer'
import { exportAllDeclaration } from '@babel/types'

describe('ancedote reducer test', () => {
    const ancedote = [
       {content: 'test1', id: '1', vote: 0},
       {content: 'test2', id: '2', vote: 0},
       {content: 'test3', id: '3', vote: 0}
    ]

    test('should return proper inital state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING',
        }
        const newState = ancedoteReducer(undefined, action)
        expect(newState).toEqual(intalstate)
    })
})