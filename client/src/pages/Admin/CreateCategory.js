import React,{useEffect,useState} from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {toast} from 'react-toastify'
import axios from 'axios'
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories,setCategories] = useState([])
  const [name,setName] = useState("")
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")
  //handle form creating categories
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategories();
      }else{
        toast.error(data.message);
      }
    }catch(e){
      console.log(e)
      toast.error("Something Went Wrong")
    }
  }

  //get all categories
  const getAllCategories = async() => {
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`)
      if(data?.success){
        setCategories(data?.category)
      }
    } catch(e){
      console.log(e)
      toast.error("Something went wrong in getting categories")
    }
  }

  //update all categories
  const handleUpdate = async(e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name : updatedName});
      if(data.success){
        toast.success(`${updatedName} is updated`);
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategories()
      }else{
        toast.error(data.message)
      }
    }catch(e){
      toast.error("Something went wrong")
    }
  }

  //delete all categories
  const handleDelete = async(pId) =>{
    try{
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
      if(data.success){
        toast.success(`Category is deleted`);
        getAllCategories()
      }else{
        toast.error(data.message)
      }
    }catch(e){
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    getAllCategories()
  },[])

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c)=>(
                    <>
                      <tr key={c._id}>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit = {handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
