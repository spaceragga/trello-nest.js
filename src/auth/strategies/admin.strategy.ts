import { getRepository } from "typeorm";
import { User } from "../../users/entities/user.entity"

export const checkAdmin = async () => {
    const userRepository = getRepository(User);
  
    const user = await userRepository.findOne({
      where: {
        login: 'admin'
      },
    });
  
    if (!user) {
      const newUser = await userRepository.create({
        name: 'admin',
        login: 'admin',
        password: 'admin'
      });
      await userRepository.save(newUser);
    }
  };