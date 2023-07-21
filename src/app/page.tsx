import { fetchDataFromTMDB } from "@/utils";
import HomeUI from "@/pages/Home";

const Home = async () => {
  const data = await fetchDataFromTMDB();
  return <HomeUI data={data.results} />;
};

export default Home;
