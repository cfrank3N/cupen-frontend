import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import FrontPageStatView from "./FrontPageStatView";
import RecentMatches from "./RecentMatches";
import { Container } from "react-bootstrap";
import FeatureCards from "./FeatureCards";

export default function HomePage() {
  return (
    <>
      <MyNavBar />
      <FrontPageStatView />
      <FeatureCards />
      <MyFooter />
    </>
  );
}
