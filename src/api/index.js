import axios from 'axios'

const url = 'http://134.122.97.189';

export const fetchTasks = async () => {
    try {
        const { data } = await axios.get(`${url}/tasks`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createTask = async (task) => {
    console.log("createTask -> task", task)
    try {
        const { data } = await axios.post(`${url}/tasks`, task)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (task) => {
    try {
        const { data } = await axios.put(`${url}/tasks/${task.id}`, task)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (id) => {
    try {
        const { data } = await axios.delete(`${url}/tasks/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}