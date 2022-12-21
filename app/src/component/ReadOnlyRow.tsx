
import { MdOutlineModeEdit } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import { FC, useState } from 'react'
import Modal from "../component/Modal"

interface Props {
  product:productProps
  deleteProduct: (productId: number) => Promise<void>
  key:number
  handleEditClick: (e:React.MouseEvent<Element, MouseEvent>, product: productProps) => void
}
interface productProps{
id: number|null;
name: string;
code: string;
price: string;
category: string;
image: string;
}





const  ReadOnlyRow:FC<Props>=({ product, key, deleteProduct, handleEditClick })=> {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <tr key={key} >
      <td className='p-3'>{product.name}</td>
      <td className='p-3'>{product.code}</td>
      <td className='p-3'>${product.price}</td>
      <td className='p-3'>{product.category}</td>
      <td className='p-3'>
        <img src={product.image} alt={product.name} width={"50px"} height={"50px"} />
      </td>
      <td className='p-3'>
        <button type="button" className="btn btn-outline-danger p-1 m-1 mt-2 " onClick={toggleShowModal} ><MdDeleteOutline className='mb-1' /></button>
        {showModal ? (
          <Modal>
            <div className="del-modal">
              <h4>Are you sure delete this task ?</h4>
              <button className="btn btn-primary p-1 m-1 mt-2 " onClick={toggleShowModal}>CANCEL</button>
              <button type="button" className="btn btn-danger p-1 m-1 mt-2 " onClick={() =>{
               if (product.id !==null){
                deleteProduct(product.id)}
               }}>DELETE</button>
            </div>
          </Modal>
        ) : null}
        <button type="button" className="btn btn-outline-primary p-1 m-1 mt-2" onClick={(e) => handleEditClick(e, product)}><MdOutlineModeEdit className='mb-1' /></button>
      </td>

    </tr>
  )
}

export default ReadOnlyRow