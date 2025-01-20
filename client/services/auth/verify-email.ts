import { _axios } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const verifyEmail = (data: IVerifyEmailCredentials) => {
  return _axios.post("/auth/verify-email", data);
};

export const useVerifyEmailMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: verifyEmail,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};
