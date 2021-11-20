import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNA_KEY})

export  const createUser = async (name, email, username, password) => {
  password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)) //hashes the password 
  let data
  try {
    data= await client.query(
      q.Create(
        q.Collection('users'),
        {
          data: {
            name, 
            email, 
            username, 
            password
          }
        }
      )
    )
    if (data.name === 'BadRequest') return // if there's an error in the data creation
  } catch (error) {
    return 
  }
  const user = data.data
  user.id = data.ref.value.id // attaches the ref id as the user id in the client
  return user
}

export const getUser = async (userId) => {
  try {
    const user = await client.query(
      q.Get(
        q.Ref(q.Collection('users'), userId)
      )
    )
    return user.data
  } catch {
    return // return null if there is any error.
  }
}

export const loginUser = async (email, password) => {
 try {
  let userData = await client.query(
    q.Get(
      q.Match(q.Index('user_by_email'), email)
    )
  )
  userData.data.id = userData.ref.value.id
  if (bcrypt.compareSync(password, userData.data.password)) return userData.data
  else return
 } catch (error) {
   return
 }
}

export const createPost = async (title, body, avatar, authorId, tags) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
  let author = await getUser(authorId)
  const date = new Date()
  let data = await client.query(
    q.Create(
      q.Collection('blogs'),
      {
        data: {
          title, 
          body, 
          upvote: 0,
          downvote: 0,
          created__at: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, // converts date to "Month day, Year"
          author: {
            name:author.name, 
            email: author.email, 
            id:author.id, 
            username: author.username
          },
          avatar,
          tags
        }
      }
    )
  )
  data.data.id = data.ref.value.id
  return data.data
}

export const getPosts = async () => {
  let allBlogs = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("blogs"))),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  )
  return allBlogs.data
}

export const getPost = async id => {
  try {
    let blog = await client.query(
      q.Get(q.Ref(q.Collection('blogs'), id))
    )
    blog.data.id = blog.ref.value.id
    return blog.data
  } catch (error) {
    return
  }
}

export const upvotePost = async (upvote, id) => {
  try {
    let blog = await client.query(
      q.Update(
        q.Ref(q.Collection('blogs'), id),
        {data: {upvote}}
      )
    )
    blog.data.id = blog.ref.value.id
    return blog.data
  } catch  {
    return
  }
}

export const downvotePost = async (downvote, id) => {
  try {
    let blog = await client.query(
      q.Update(
        q.Ref(q.Collection('blogs'), id),
        {data: {downvote}}
      )
    )
    blog.data.id = blog.ref.value.id
    return blog.data
  } catch (error) {
    return
  }
}
