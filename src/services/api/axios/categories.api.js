import axiosApi from "./axios"

export const getCategoriesData = async()=>{
    try{
        const {data} = await axiosApi.get('/categories');
        return data
    }catch(err){
        console.log('error', err)
    }
}