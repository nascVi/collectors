import {useState, useRef} from 'react'
import {createPost} from '../models'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {config} from 'dotenv'

config()

export default function CreateBlog() {
  const history = useHistory()
  if (!localStorage.getItem('userId')) {
    alert('You need to be logged in to create a blog!')
    history.push('/')
  }
  const [content, setContent] = useState('<h2>Body of your article goes here...</h2>')
  const tags = useRef('')
  const title = useRef('')
  const avatar = useRef('')


  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.current.value || !tags.current.value || !avatar.current.value) {
      alert('You need to add title, body and upload the avatar')
    } else {
      const url = await uploadFile(avatar.current.files[0])
      await createPost(title.current.value, content, url, localStorage.getItem('userId'), tags.current.value.split(','))
      alert('Blog post created successfully, signing you in...')
      history.push('/')
    }
  }

  return (
    <form className="form-horizontal">
      <div className="form-group files">
        <label className="control-label col-sm-4" htmlFor="upload">Upload avatar</label>
        <input type="file" className="form-control mx-md-3 col-sm-4" id="" ref={avatar}/>
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4" htmlFor="title">Title</label>
        <input className="form-control mx-md-3 col-sm-4" ref={title} type="text" name="title" id=""/>
      </div>
      <div>
        <label className="control-label col-sm-4" htmlFor="tags">Tags</label>
        <input className="form-control mx-md-3 col-sm-4" ref={tags} type="text"  />
        <div className="col-sm-4"></div>
      </div>
      <br/><br/><br/>
      <div className="form-group">
        <CKEditor
          editor={ ClassicEditor }
          data={content}
          row={100}
          onReady={ editor => { } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setContent(data)
          } }
        />
    </div>
    <div className="form-group">
        <div className="col-sm-5"></div>
        <button onClick={handleCreate}  type="submit" className="btn btn-primary col-sm-2">Submit</button>
      </div>
    </form>
  )
}


const uploadFile = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
  const timeStamp = Date.now()/1000;
  let formData = new FormData()
  formData.append("api_key",process.env.REACT_APP_CLOUDINARY_API_KEY);
  formData.append("file", file);
  formData.append("public_id", "sample_image");
  formData.append("timestamp", timeStamp);
  formData.append("upload_preset", process.env.REACT_APP_PRESET);
  let respData = await axios.post(url, formData)
  return respData.data.secure_url
}
