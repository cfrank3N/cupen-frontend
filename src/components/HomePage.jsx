import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import FrontPageStatView from "./FrontPageStatView";
import RecentMatches from "./RecentMatches";
import { Container } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <MyNavBar />
      <FrontPageStatView />
      <MyFooter />
    </>
  );
}
