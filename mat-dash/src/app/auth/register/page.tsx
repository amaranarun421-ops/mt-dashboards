import { Register } from "@/app/components/auth/register";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const page = () => {
    return (
      <>
        <BackToDashboard />
        <Register/>
      </>
    )
}

export default page;
