import User from '../model/user-schema.js';

//this is a callback function - now this is a backend api
export const userSignup = async (request, response) => {
    try{
        //dont put duplicate username if it already existing
        const exist = await User.findOne({username: request.body.username});
        if(exist)
        {
            return response.status(401).json({message: 'username already exist'});
        }
       //   console.log(request.body);
       const user = request.body;
       const newUser = new User(user); //here we validate the data
       await newUser.save(); //now save data in DB & for insert a object in DB use save function
       //Now we need to return the function after save the data, but dont need to write save function, use response
       response.status(200).json({message: user});
       
    } catch(error){
       response.status(500).json({message: error.message});
    }
}

//for login
export const userLogin = async (request, response) => {
    try{
      const username = request.body.username;
      const password = request.body.password;

      let user = await User.findOne({username: username, password: password});
      if(user){
        return response.status(200).json({ data:user });
      }
      else
      {
        return response.status(401).json('Invalid login');
      }
    } catch(error){
       response.status(500).json('Error ', error.message);
    }
}