import { useMutation } from "@tanstack/react-query";
 import { RegisterSchema } from "@/validations/register.schema";
import { registerUser } from "./register";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterSchema) => registerUser(data),
  });
};