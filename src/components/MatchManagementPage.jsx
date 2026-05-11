import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import MatchManagement from "./MatchManagement";
import NavigationButton from "./NavigationButton";

export default function MatchManagementPage() {
  return (
    <>
      <MyNavBar />
      <NavigationButton
        uriOne={"/admin/create-matches"}
        buttonOneText={"< matches"}
        uriTwo={"/"}
        buttonTwoText={"home >"}
      />
      <MatchManagement />
      <MyFooter />
    </>
  );
}
