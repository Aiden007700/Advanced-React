import SingleProduct from "../../components/SingleProduct";
import { useRouter } from "next/router";

const SingleProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <SingleProduct id={id} />;
};

export default SingleProductPage;
