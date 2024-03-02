import { GridColDef } from "@mui/x-data-grid";
import "./Users.scss"
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import axios from "axios";
import UserDataTable from "../../components/userDataTable/UserDataTable";

const columns: GridColDef[] = [
  {
    field: 'id', 
    headerName: 'ID', 
    width: 50 
  },
  {
    field: 'img',
    headerName: "Avatar",
    width: 70,
    renderCell: (params)=>{
      return <img src={params.row.img || "/noavatar.png"} alt="" />
    }
  },
  // {
  //   field: 'actions',
  //   headerName: "Actions",
  //   width: 100,
  //   renderCell: (params)=>{
  //     return <div className="action">
  //       <div className="view">View</div>
  //       <div className="delete">Delete</div>
  //     </div>
  //   }
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 100,
  //   type: "boolean"
  // },
  {
    field: 'firstName',
    headerName: 'First name',
    type: "string",
    width: 100,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 100,
    type: "string"
  },
  {
    field: "email",
    headerName: 'Email',
    width: 210,
    type: "string"
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 100,
    type: "string"
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 100,
    type: "string"
  },
  {
    field: 'verified',
    headerName: 'Verified',
    width: 90,
    type: "boolean"
  }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const Users = () => {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const getUsers = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/api/users");
        setUsers(res.data)
      }
      catch(err){
        console.log(err) 
      }
    };
    getUsers()
  },[])
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=>setOpen(true)}>Add New User</button>
      </div>
      <UserDataTable slug="users" columns={columns} rows={users} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} setRows={setUsers}/>}
    </div>
  )
}

export default Users