import { useEffect, useContext } from "react";
import { DataContext } from "@/context/DataContext";
import axios from "axios";

export function useFetch() {
    
    let {DataEmployees ,setDataEmployees} = useContext(DataContext)

    useEffect(() => {
        async function bringEmployees(){
          try {
            let res = await axios.get("/api/crud/Read");
            setDataEmployees(res.data.filterData);
          } catch (err) {
            console.log(err)
          }
        }
        bringEmployees()
      }, []);

    return {DataEmployees, setDataEmployees}
}
