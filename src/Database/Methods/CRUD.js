import { Employee } from "../Model/EmployeeSchema";
import { VerifyToken } from "@/utils/VerifyToken";

export class CRUD{
    
    async create(res, value){
        try {
            let newEmployee = new Employee(value)
            
            await newEmployee.save()
            newEmployee.User = null
            return res.status(200).json({newEmployee, message:"Employee successfully created"})
        } catch (err) {
            if (err.code === 11000) return res.status(409).json({message:"The phone already exists"}) 
            return res.status(500).json({message:"Internal Server Error"})
        }
    }

    async Read(res, user, message = null){
        try {
        let data = await Employee.find({User: user})
       let filterData = data.map(item => {
           item.User = null
           item.__v = null
           return item
        });
        return res.status(200).json({filterData, message})
        } catch (err) {
        return res.status(500).json({message:"Internal Server Error"})
        }        
    }

    async Update(res, Data){
        let {id, data, Token} = Data
        try {
            let User = await VerifyToken(Token)
            await Employee.findOneAndUpdate({_id: id, User: User}, data)
           return this.Read(res, User, "Employee successfully updated")
        } catch (err) {
            console.log(err);
            res.status(500).json({message:"Internal Server Error"})
        }
    }

    async Delete(res, data){
        let {id, Token} = data
        try {
            let UserId = await VerifyToken(Token)
            await Employee.findOneAndDelete({
                _id: id,
                User: UserId
            })
           return this.Read(res, UserId, "Employee successfully deleted")
        } catch (err) {
            res.status(500).json({message:"Internal Server Error"})
        }
    }

}