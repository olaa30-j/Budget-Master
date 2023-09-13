import { createContext, useCallback, useEffect, useReducer,useRef } from "react";
import {addDataTransactions, deleteDataTransactions, getDataTransactions, updateDataTransactions} from '../../../services/api/axios/transcations.api'

// create transaction context api
export const transactionContext = createContext();

export const TransactionProvider = ({children}) =>{

    const initialState ={
        data: [],
        loading: true,
        error: null,
    }

    const reducerFunction = (state, action) => {
        switch(action.type){
            case 'Fetch_Start':
                return{ ... state, loading: true, error: null};
            case 'Fetch_Success':
                return{ ... state, loading: false, data: action.payload};
            case 'Fetch_Error':
                return{ ... state, loading: false, error: action.payload};
            case 'Stop_Loading':
                return { ...state, loading: false, error: null };
            default:
                return state;
        }
    }
    

    const [state, dispatch] = useReducer(reducerFunction , initialState)
    const isMount = useRef(false)

    const fetchApi = useCallback ( async () =>{
        dispatch({type: 'Fetch_Start'})
        try{
            const data = await getDataTransactions();
            dispatch({type: 'Fetch_Success', payload: data})
        }catch(error){
            dispatch({type: 'Fetch_Error', payload: error.message})
        }
    }, [])

    const handleDeleteTransaction = async (id) =>{
        try{
            dispatch({type: 'Fetch_Start'})
            await deleteDataTransactions(id);
            fetchApi()
        }catch(error){
            dispatch({type: 'Fetch_Error', payload: error.message})
        }
    }

    
    const handleUpdateTransaction = async (id, updatedTransactionData) => {
        try {
            dispatch({ type: 'Fetch_Start' });
            await updateDataTransactions(id, updatedTransactionData);
            fetchApi();
        } catch (error) {
            dispatch({ type: 'Fetch_Error', payload: error.message });
        }
    };
    
    const handleAddTransaction = async (data) =>{
        try{
            dispatch({type: 'Fetch_Start'})
            await addDataTransactions(data);
            fetchApi()
        }catch(error){
            dispatch({type: 'Fetch_Error', payload: error.message})
        }
    }

    useEffect(()=>{
        if(!isMount.current){
            fetchApi()
            isMount.current = true
        }
    },[fetchApi])

    return(
        <transactionContext.Provider value={{...state, handleDeleteTransaction, handleAddTransaction, handleUpdateTransaction}}> 
            {children}
        </transactionContext.Provider>
    )
}