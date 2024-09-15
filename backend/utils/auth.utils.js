import bcrypt from "bcrypt";


//hashed for register 
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//campared for login 
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
