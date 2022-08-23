import { userRepository } from "./schema/user";
export async function createUser(id: string) {
  const user = userRepository.createAndSave({ userId: id });
  return user;
}
