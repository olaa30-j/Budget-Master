import { createContext, useCallback, useEffect, useReducer, useRef } from 'react';
import { getCategoriesData } from '../../api/axios/categories.api';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {

    const initialState = {
        data: [],
        loading: true,
        error: null,
    }

    const reducerFunction = (state, action)=>{
        switch(action.type){
            case 'Loading_Categories':
                return{ ... state, loading: true, error: null};
            case 'GET_Categories':
                return{ ... state, loading: false, data: action.payload};
            case 'Error_Categories':
                return{ ... state, loading: false, error: action.payload};
            case 'Stop_Loading':
                return{ ... state, loading: false};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducerFunction , initialState)
    const isMount = useRef(false)

    const fetchApi = useCallback(async () => {
        dispatch({ type: 'Loading_Categories' });
        try {
            const data = await getCategoriesData();
            dispatch({ type: 'GET_Categories', payload: data });
        } catch (err) {
            dispatch({ type: 'Error_Categories', payload: err.message });
        }
    }, []);
    

    useEffect(()=>{
        if(!isMount.current){
            fetchApi()
            isMount.current = true
        }
    },[fetchApi])

    return (
        <CategoriesContext.Provider value={{...state}}>
            {children}
        </CategoriesContext.Provider>
    )
};
