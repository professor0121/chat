const mongoose =require('mongoose');

const connectDb=async () => {
 try{
    const conn=mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('✅Database conneted successfull !')
 }catch(error){
    console.error(error.message)
 }    
}

module.exports=connectDb;