import React, {useState,useEffect} from 'react'
import APIService from "../components/APIService";

function Form(props) {

    const[title, setTitle] = useState(props.article.title)
    const[body, setBody] = useState(props.article.body)

    useEffect(() =>{
        setTitle(props.article.title)
        setBody(props.article.body)
    },[props.article])

    const updateArticle = () =>{
        APIService.UpdateArticle(props.article.id,{title,body})
            .then(resp => props.updatedData(resp))
            .catch(err => console.log(err))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title,body})
            .then(resp => props.insertedArticle(resp))
            .catch(err => console.log(err))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={title} className="form-control" placeholder="Please Enter Title"
                    onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea rows="5" value={body} className="form-control" placeholder="Please Enter Body"
                    onChange={(e) => setBody(e.target.value)}/>
                    {
                        props.article.id ? <button className="btn btn-success mt-3" onClick={updateArticle}>Update</button>
                            : <button className="btn btn-success mt-3" onClick={insertArticle}>Insert</button>
                    }
                </div>
            ) : null}

        </div>
    )
}

export default Form