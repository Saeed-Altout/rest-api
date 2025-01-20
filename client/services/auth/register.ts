import { _axios } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const register = async (data: IRegisterCredentials) => {
  try {
    const response = await _axios.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
};
