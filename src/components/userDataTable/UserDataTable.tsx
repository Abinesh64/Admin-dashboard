import { DataGrid , GridColDef , GridToolbar  } from "@mui/x-data-grid"
import "./userDataTable.scss"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

type Row = {
  id: number;
  img: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  verified: boolean;
};

type Props = {
  columns: GridColDef[];
  rows: never[];
  slug: string;
}
const UserDataTable = (props: Props) => {

  const [rows, setRows] = useState<Row[]>(props.rows);

  useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);
  

  const actionColumn: GridColDef = {

    field: "action",
    headerName: "Action",
    width: 145,
    renderCell: (params)=>{

      const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
          try {
            console.log(id + " has been deleted");
            await axios.delete(`http://localhost:8800/api/${props.slug}/${id}`);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        }
      };
      return (
      <div className="action">
        <Link to={`/${props.slug}/${params.row.id}`}>
          <img src="/view.svg" alt="" />
        </Link>
        <div className="delete" onClick={()=>handleDelete(params.row.id)}>
          <img src="/delete.svg" alt="" />
        </div>
      </div>
      )
    }
  }
      
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{toolbar: GridToolbar}}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default UserDataTable