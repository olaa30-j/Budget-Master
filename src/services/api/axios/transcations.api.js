import axiosApi from "./axios";

// Get all data
export const getDataTransactions = async () => {
    try {
        const { data } = await axiosApi.get('/transactions');
        return data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; 
    }
};

// Add new transaction
export const addDataTransactions = async (transactionData) => {
    try {
        const { data } = await axiosApi.post('/transactions', transactionData);
        return data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; 
    }
};

// Delete transaction
export const deleteDataTransactions = async (id) => {
    try {
        const { data } = await axiosApi.delete('/transactions/' + id);
        return data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Resource not found:", error.response.data);
        } else {
            console.error("An error occurred:", error);
        }
        throw error;
    }
};

// Update transaction
export const updateDataTransactions = async (id, updatedTransactionData) => {
    const apiUrl = '/transactions/' + id;

    try {        
        const { data } = await axiosApi.put(apiUrl, updatedTransactionData);
        console.log("Updating transaction with ID:", id);
        console.log("URL:", apiUrl);
        return data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Resource not found:", error.response.data);
            console.log("Updating transaction with ID:", id);
            console.log("URL:", apiUrl);
        } else {
            console.error("An error occurred:", error);
        }
        throw error;
    }
};
