import { useState, useEffect } from "react"
import Add from "../../components/add/Add"
import ProductDataTable from "../../components/productDataTables/ProductDataTable";
import "./products.scss"
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios"

const columns: GridColDef[] = [
  {
    field: 'id', 
    headerName: 'ID', 
    width: 50 
  },
  {
    field: 'img',
    headerName: "Image",
    width: 70,
    renderCell: (params)=>{
      return <img src={params.row.img} alt="" />
    }
  },
  {
    field: 'title',
    headerName: 'Title',
    type: "string",
    width: 200,
  },
  {
    field: 'color',
    headerName: 'Color',
    width: 100,
    type: "string"
  },
  {
    field: "price",
    headerName: 'Price',
    width: 100,
    type: "string"
  },
  {
    field: 'producer',
    headerName: 'Producer',
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
    field: 'inStock',
    headerName: 'In Stock',
    width: 90,
    type: "boolean"
  }
];

const Products = () => {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  
  useEffect(()=>{
    const getProducts = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/api/products");
        setProducts(res.data)
      }
      catch(err){
        console.log(err) 
      }
    };
    getProducts()
  },[])

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={()=>setOpen(true)}>Add New Product</button>
      </div>
      <ProductDataTable slug="products" columns={columns} rows={products}/>
      {open && <Add slug="product" columns={columns} setOpen={setOpen} setRows={setProducts}/>}
    </div>
  )
}

export default Products