import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("meta");
  localStorage.removeItem("refresToken");

  router.push(`/`);
};

export default useLogout;
