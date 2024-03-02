import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid"


type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRows: any;
}
const Add = (props: Props) => {

    const [formData, setFormData] = useState({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8800/api/${props.slug}s`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status===200) {
                const updated = await response.data;
                props.setRows(()=>updated);
                console.log('User added successfully!', updated);
                props.setOpen(false);
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            id:uuid(),
            [e.target.placeholder]: e.target.value,
        });
    };

  return (
    <div className="add">
        <div className="modal">
            <span className="close" onClick={()=>props.setOpen(false)}>X</span>
            <h1>Add new {props.slug}</h1>
            <form onSubmit={handleSubmit}>
                {props.columns.filter(item => item.field !== "id" && item.field !== "img")
                    .map(column=>
                        <div className="item" key={column.field}>
                            <label>{column.headerName}</label>
                            <input 
                              type={column.type} 
                              placeholder={column.field}
                              onChange={handleInputChange}
                            />
                        </div>
                    )
                }
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
  )
}

export default Add