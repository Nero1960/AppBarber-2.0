import bcrypt from 'bcrypt';

export const hashPassword = async ( password : string)  => {
     //hash password
     const salt = await bcrypt.genSalt(10);
     return bcrypt.hash(password, salt);
};


export const comparePassword = async (password : string, hashedPassword : string) => {
    return await bcrypt.compare(password, hashedPassword);
};