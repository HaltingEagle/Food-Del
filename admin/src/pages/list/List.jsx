import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = () => {
    const [list, setList] = useState([]);
    const fetchLists = async () => {
        const response = await axios.get('http://localhost:4000/api/food/list')
        if(response.status === 200){
            setList(response.data.food)
            console.log(response.data)
        }
        else{
            console.log(response)
            toast.error("Something went wrong")
        }
    }

    const removeFood = async (id) => {
        const response = await axios.delete('http://localhost:4000/api/food/'+id)
        if(response.status === 200){
            fetchLists()
            console.log(response.data)
            toast.success("Food removed successfully")
        }
        else{
            console.log(response)
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        fetchLists()
    }, [])
    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
                </div>
                {list.map((item, index)=>{
                    return (
                        <div className="list-table-format" key={index}>
                            <img src={'http://localhost:4000/images/'+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List