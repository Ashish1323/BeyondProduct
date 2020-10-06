import {API} from "../../backend"

export const createCategory = (userId , token, Category) =>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(Category)
    })
      .then(response =>{
          return response.json();
      })
      .catch( err =>{
              console.log(err);
      })
}