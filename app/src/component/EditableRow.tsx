import React from 'react'
function EditableRow({
  categories,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  key
}: any) {
  return (
    <tr key={key} >
      <td><input type="text" required placeholder='Please Enter name' name='name' value={editFormData.name} onChange={handleEditFormChange} /></td>
      <td><input type="text" required placeholder='Please Enter code' name='code' value={editFormData.code} onChange={handleEditFormChange} /></td>
      <td><input type="number" required placeholder='Please Enter price' name='price' value={editFormData.price} onChange={handleEditFormChange} /></td>
      <td>
        <select required value={editFormData.category} name='category' onChange={handleEditFormChange}>
          <option></option>
          {categories && categories.map((category: any) => {
            return (
              <option>{category.name}</option>
            );
          })}
        </select>
      </td>
      <td><input type="text" required placeholder='Please Enter image' name='image' value={editFormData.image} onChange={handleEditFormChange} /></td>
      <button type='submit' className="btn btn-outline-primary p-1 m-1">Save</button>
      <button  onClick={handleCancelClick} className="btn btn-outline-danger p-1 m-1">Cancle</button>
      {/* type='text' */}
    </tr>
  );
}

export default EditableRow