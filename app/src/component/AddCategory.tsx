import React, { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props{
  categories:categoriesProps[]
  setCategories: React.Dispatch<React.SetStateAction<categoriesProps[]>>
  toggleShowModal: () => void
}

interface categoriesProps{
  id: null |number,
  name: string, 
}



const AddCategory :FC<Props>= ({ categories, setCategories, toggleShowModal }) => {
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }
  return (

    <Formik
      initialValues={{
        id: Date.now() + Math.random(),
        name: ""

      }}
      onSubmit={async ( values, { resetForm }) => {
        if (!values.name) {
          toast.error("Please Fill Name Input Feild")
        }
        else {
          await fetch("http://localhost:5000/category", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(values)
          })
          categories.push(values)
          setCategories([...categories])
          toast.success(`${values.name} added successfully`, toastOptions)
          resetForm({ values:{ id:0, name:""} });
        }
      }
      }
    >
      <Form >
        <div><label htmlFor="name" className='text-white mb-2'>Name</label></div>
        <div ><Field className=' form-control bg-light rounded-3 border-1  border-primary' id="name" name="name" type="text" /></div>
        <input type="submit" className=" btn btn-primary mt-3 m-2" />
        <button className="btn btn-danger mt-3 m-2" onClick={toggleShowModal}>Cancle</button>
      </Form>
    </Formik>
  )
}

export default AddCategory