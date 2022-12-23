import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useState, FC } from "react";
import Modal from "../component/Modal";
import { categoriesProps } from "../Interfaces";

interface Props {
  category: categoriesProps;
  deleteCategory: (productId: number) => Promise<void>;
  key: number;
  handleEditClick: (
    e: React.MouseEvent<Element, MouseEvent>,
    product: categoriesProps
  ) => void;
}

const ReadOnlyRowCat: FC<Props> = ({
  category,
  key,
  deleteCategory,
  handleEditClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <tr key={key}>
      <td className="p-3">{category.name}</td>
      <td>
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
              <h4>Are you sure Delete this Task ?</h4>
              <button
                className="btn btn-primary p-1 m-1 mt-2 "
                onClick={toggleShowModal}
              >
                CANCEL
              </button>
              <button
                type="button"
                className="btn btn-danger p-1 m-1 mt-2 "
                onClick={() => {
                  if (category.id !== null) {
                    deleteCategory(category.id);
                  }
                }}
              >
                DELETE
              </button>
            </div>
          </Modal>
        ) : null}
        <button
          type="button"
          className="btn btn-outline-primary p-1 m-1 mt-2"
          onClick={(e) => handleEditClick(e, category)}
        >
          <MdOutlineModeEdit className="mb-1" />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRowCat;
