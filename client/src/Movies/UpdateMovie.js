import React, {useState,useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom";
 
import axios from 'axios'

const initialState = {
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

export default function UpdateMovie(props){
    const [formValues,setFormValues] = useState(initialState)
    const {title,director,metascore} = props

    const { id } = useParams();
    const{ push} = useHistory();

    const handleChanges = e => {
        const {name,value} = e.target

        setFormValues({
            ...formValues,
            [name]:value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${id}`,formValues)
        .then(res => {
            props.setItems(res.data);
            push(`/item-list/${id}`);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(err)
            setFormValues(res.data)
        })
        .catch(err => console.log(err))
    },[])

    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                value={formValues.title}
                onchange={handleChanges}                
            />

            <input
                type='text'
                name='director'
                value={formValues.director}
                onchange={handleChanges}                
            />

            <input
                type='text'
                name='metascore'
                value={formValues.metascore}
                onchange={handleChanges}                
            />
        </form>
    )
}