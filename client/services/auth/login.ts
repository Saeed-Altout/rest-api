import { _axios } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const login = (data: ILoginCredentials) => {
  return _axios.post("/auth/login", data);
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
