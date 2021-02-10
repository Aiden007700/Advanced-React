import UpdateProduct from "../components/UpdateProduct";
import { useRouter } from "next/router";

const UpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <UpdateProduct id={id as string} />;
};

export default UpdatePage;
