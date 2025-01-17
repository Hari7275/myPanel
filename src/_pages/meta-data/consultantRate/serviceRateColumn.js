import React ,{useState} from "react";
import { getConsultantTypes , getCategoryTypes } from "../../../_constants/consultantConstant";
 import { Switch } from "@mui/material";
import { useUpdateServiceRateMutation } from "../../../_store/api";


const StatusSwitch =({row}) =>{
const [status , setStatus] = useState(row.original.status);
const [updateStatus ,{isLoading}] = useUpdateServiceRateMutation()

const handleToggle = async ()=>{
const newStatus = status === "active"  ? "inactive" : "active";
setStatus(newStatus)

try {
  await updateStatus ({
    id : row.original.id,
    body :{status :newStatus},
  });
} catch (error){
console.log("failed to upload status" , error)
setStatus(status)
}
}
return (
  <Switch checked={status==="active"} onChange={handleToggle} disabled={isLoading}/>
)
}

 export const PRICECHARTCOLUMN = [
   {
     Header: "Sr.No",
     accessor: "id",
   },
   {
     Header: "User Type",
     accessor: "user_type",
     Cell :({value})=>getConsultantTypes(value)
   },
   {
     Header: "Service",
     accessor: "service_type",
     Cell : ({value}) => getCategoryTypes(value)
   },
   {
     Header: "Rate A",
     accessor: "rate_A",
   },
   {
     Header: "Rate B",
     accessor: "rate_B",
   },
   {
     Header: "Rate C",
     accessor: "rate_C",
   },
   {
     Header: "Rate D",
     accessor: "rate_D",
   },
   {
     Header: "Commission",
     accessor: "commission",
   },
   {
     Header: "Status",
     accessor: "status",
     Cell :({row})=> <StatusSwitch row={row}/>
   },
 ];

