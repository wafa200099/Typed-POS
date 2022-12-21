


function EditableRowCat({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  key
}: any) {
  return (
    <tr key={key} >
      <td><input type="text" required placeholder='Please Enter name' name='name' value={editFormData.name} onChange={handleEditFormChange} /></td>
      <button type='submit' className="btn btn-outline-primary p-1 m-1">Save</button>
      <button onClick={handleCancelClick} className="btn btn-outline-danger p-1 m-1">Cancle</button>
      {/* type="text" */}
    </tr>
  )
}
export default EditableRowCat