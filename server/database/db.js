import mongoose from 'mongoose';

export const Connection = async (URL)=>{    
    try{
        //use for connect with mongodb and it return promise so use async-await
        await mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database connected successfully');
    } catch (error){
        console.log('Error while connecting with the database ',error.message);
    }
}

export default Connection;

