import React, { useState, useEffect } from "react";
import Header from './header'
import axios from "axios"
import './EditListing.css'
import { useNavigate, useLocation } from "react-router-dom";


const EditListing = () => {

    // state variables for new item
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const [result, setResult] = useState()

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()

    const handleSubmit = e => {
        e.preventDefault()

        // stuff to send new item to server to be added later
        
        axios.post("/edit-listing/save", {
            title: title,
            price: price,
            description: description,
            photo: photo,
            location: location,
            category: category,
            headers: {'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`}
      })
      .then(res => {if (res.data.err === 'visitor'){return navigate('/')} })
      .catch((err) => {
        console.log(err);
      })
    }

    useEffect(() => {
        fetch(`/detail?${query.toString()}`, {credentials: 'include', headers: {'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`}})
        .then(res => res.json())
        .then((resJson) => {
            if (resJson.err === 'visitor'){return navigate('/')}
            setResult(resJson);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    if (result === undefined)
    {
        return <div>Loading...</div>
    }

    return (
      <div>
        <Header></Header>
        <h3 className= "h3">Edit Listing</h3>
        
        <form onSubmit={handleSubmit}>
        <div className = "form-box">
            <label for="title_field"></label>
            <input
                id="title field"
                type ="text"
                placeholder={result.title}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
        </div>

        <div>
            <label for ="price_field"></label>
            <input
                id="price field"
                type = "text"
                placeholder={result.price}
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
        </div>

        <div>
            <label for ="description_field"></label>
            <textarea className="description"
                id="description field"
                type = "text"
                placeholder={result.description}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>

        <div>
            <label for ="photo_field">Select Photo: </label>
            <input
                id="photo field"
                type = "file"
                value={photo}
                onChange={e => setPhoto(e.target.files)}
            />
        </div>

        <div>
            <label for ="location_field">Select Location</label>
                <select value = {location} onChange={e => setLocation(e.target.value)}>
                <option value={result.location} disabled>Choose a Location</option>
                <option value = "New York">New York</option>
                <option value = "SHanghai">Shanghai</option>
                <option value = "Abu Dhabi">Abu Dhabi</option>
            </select>
        </div>

        <div>
        <label for="category_field">Select Category</label>
        <select value = {category} onChange={e => setCategory(e.target.value)}>
                <option value={result.category} disabled>Choose a Category</option>
                <option value = "Academic">Academic</option>
                <option value = "Clothing">Clothing</option>
                <option value = "Dorm">Dorm</option>
                <option value = "Other">Other</option>
            </select>
        </div>

        <div>
          <input className = "input" type="submit" value="Save Changes" />
        </div>

        </form>
      </div>
    )
  }

export default EditListing
