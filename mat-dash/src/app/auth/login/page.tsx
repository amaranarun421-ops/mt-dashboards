import { Login } from "@/app/components/auth/login"
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const page = () => {
    return (
      <>
        <BackToDashboard />
        <Login/>
      </>
    )
}

export default page;
