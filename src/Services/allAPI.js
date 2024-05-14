import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"


// register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/user/register`,user,"")
}

// login
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/user/login`,user,"")
}

// addProject
export const addTodosAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/projects/add`,reqBody,reqHeader)

}

// getuserProjects
export const userTodosAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user/all-projects`,"",reqHeader)
}

// edit Project
export const editTodosAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

// delete Project 
export const deleteTodosAPI = async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/remove/${projectId}`,{},reqHeader)
}