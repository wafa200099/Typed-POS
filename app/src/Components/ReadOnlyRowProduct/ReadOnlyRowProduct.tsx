import { FC, useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import Modal from "../Modal/Modal";
import { productProps } from "../../Interfaces";

interface Props {
  product: productProps;
  deleteProduct: (productId: number) => void;
  key: number;
  handleEditClick: (
    e: React.MouseEvent<Element, MouseEvent>,
    product: productProps
  ) => void;
}

const ReadOnlyRowProduct: FC<Props> = ({
  product,
  key,
  deleteProduct,
  handleEditClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <tr key={key}>
      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.code}</td>
      <td className="p-3">${product.price}</td>
      <td className="p-3">{product.category}</td>
      <td className="p-3">
        <img
          src={product.image}
          alt={product.name}
          width={"50px"}
          height={"50px"}
        />
      </td>
      <td className="p-3">
        <button
          type="button"
          className="btn btn-outline-danger p-1 m-1 mt-2 "
          onClick={toggleShowModal}
        >
          <MdDeleteOutline className="mb-1" />
        </button>
        {showModal ? (
          <Modal>
            <div className="del-modal">
              <h4>Are you sure delete this task ?</h4>
              <button
                className="btn btn-primary p-1 m-1 mt-2 "
                onClick={toggleShowModal}
              >
                Cancle
              </button>
              <button
                type="button"
                className="btn btn-danger p-1 m-1 mt-2 "
                onClick={() => {
                  if (product.id !== null) {
                    deleteProduct(product.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </Modal>
        ) : null}
        <button
          type="button"
          className="btn btn-outline-primary p-1 m-1 mt-2"
          onClick={(e) => handleEditClick(e, product)}
        >
          <MdOutlineModeEdit className="mb-1" />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRowProduct;
