import mongoose from 'mongoose';

const { Schema,model } =mongoose;

const departmentSchema=new Schema({
    department:{
        type:Schema.Types.String,
        required:true,
        unique:true,
    },
    initialize:{
        type:Schema.Types.String,
        required:true,
        unique:true,
    }
});

const Department = model('Department', departmentSchema);

export default Department;
