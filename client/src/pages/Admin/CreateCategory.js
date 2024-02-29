import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/categoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")


    //handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${name} is successfully added`)
                getAllCategory()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Error somethiing went wrong")
        }
    }

    //fetching the categories
    const getAllCategory = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data?.category)
            }
            console.log(categories);

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in fetching the data")
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //Update Category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(data.message)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong while updation")
        }
    }

    //Delete Category
    const handleDelete=async(id)=>{
        try {
            const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
            
            if(data.success)
            {
                toast.success(data.message)
                getAllCategory()
            }
            else
            {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log()
            toast.error("Something went wrong while deletion")
        }
    }
    return (
        <Layout title={"Dashboard - All Categories"}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName}
                        />
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => {handleDelete(c._id)}}>delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
