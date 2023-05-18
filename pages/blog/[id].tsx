import { NextPage } from "next";
import { useRouter } from "next/router";

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <>{id}</>;
};

export default Post;
