import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteCategoryApi } from "../../API/Category";
import { categoriesProps } from "../../Interfaces";
import Modal from "../Modal/Modal";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  category: categoriesProps;
  key: number;
  handleEditClick: (
    e: React.MouseEvent<Element, MouseEvent>,
    product: categoriesProps
  ) => void;
}

const ReadOnlyRowCategory: FC<Props> = ({ category, key, handleEditClick }) => {
  const queryClient = useQueryClient();
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  // const mutationKey= "deletecategory";
  const { mutate, isLoading } = useMutation(deleteCategoryApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  const deleteCategory = (categoryId: number) => {
    mutate(categoryId, {
      onSuccess: () => {
        toast.error(`category Removed Successfully`, toastOptions);
      },
      onError: (response) => {
        toast.error("An error occured while deleteing category ");
        console.log(response);
      },
    });
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  return (
    <tr key={key}>
      <td className="p-3">{category.name}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger p-1 m-1 mt-2 "
          onClick={toggleDeleteModal}
        >
          <MdDeleteOutline className="mb-1" />
        </button>
        {isDeleteModalOpen ? (
          <Modal>
            <div className="del-modal">
              <h4>Are you sure Delete this Task ?</h4>
              <button
                className="btn btn-primary p-1 m-1 mt-2 "
                onClick={toggleDeleteModal}
                disabled={isLoading}
              >
                Cancle
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
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span>Delete</span>
                )}
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

export default ReadOnlyRowCategory;
