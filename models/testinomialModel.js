import mongoose from 'mongoose';

const testinomialSchema = mongoose.Schema(
    {
        
        name:{
            type:String,
        },
        location:{
            type:String
        },

        images: {
            type: [String], // Corrected 'ture' to 'true'
            required: true,
        },

        description:{
            type:String,
        },

        rating:{
            type:Number,
        },
        
       
        status:{
            type:String,
            default:"Active"
        },

       
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

const Testinomial = mongoose.model('Testinomial', testinomialSchema);
export default Testinomial;
