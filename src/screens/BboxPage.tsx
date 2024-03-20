import { useGetImage } from "../api/useGetImage";

const BboxPage = () => {
  const { isLoading, data } = useGetImage();

  if (isLoading) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default BboxPage;
