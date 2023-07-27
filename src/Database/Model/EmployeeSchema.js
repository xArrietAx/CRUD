import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        max:20,
        unique: true
    }
})

export let Employee = models.Employee || model("Employee", EmployeeSchema)