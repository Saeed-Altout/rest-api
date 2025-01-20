import { _axios } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const register = async (data: IRegisterCredentials) => {
  try {
    const response = await _axios.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      router.push("/auth/verify-email");
    },
  });
};
