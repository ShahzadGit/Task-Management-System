import { SETUSERS, SETFBUSERS, LOGOUT, GETTASKS, INCREMENT_BY_VALUE } from "./action"

const initialState = { 
    users: [],
    current_user: {},
    isLoggedIn: false,
    tasks: [],
    data: 'DATA...'
}
export const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSERS: {
            return (
                {   
                    ...state,
                    current_user: action.payload,
                    isLoggedIn: true
                }
            )
        }
        case SETFBUSERS: {
            return { 
                ...state, 
                users: action.payload
            }
        }
        case LOGOUT:{
            return{
                ...state,
                isLoggedIn: false
            }
        }
        case GETTASKS:{
            return{
                ...state, 
                tasks: action.payload
            }
        }
        case INCREMENT_BY_VALUE: {
            return { ...state, counter: state.counter + action.payload }
        }
        default: {
            return state
        }
    }

}