import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        category: 'Salad',
        price: 0
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data, [name]: value}))
    }

    const onSubmitHnadler = async(e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('price', data.price)
        const res = await axios.post("http://localhost:4000/api/food/add", formData)
        if(res.status === 201){
            setData({
                name: '',
                description: '',
                category: 'Salad',
                price: 0
            })
            setImage(false)
            toast.success("Product added successfully")
        }
        else{
            console.log(res)
            toast.error("Something went wrong")
        }

    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHnadler}>
                <div className="add-img-upload flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image? URL.createObjectURL(image):assets.upload_area } alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows="6" placeholder='Write Content Here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Category</p>
                        <select onChange={onChangeHandler} name="category" required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add