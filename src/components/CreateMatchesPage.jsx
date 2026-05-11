import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import CreateMatches from "./CreateMatches";
import NavigationButton from "./NavigationButton";

export default function CreateMatchesPage() {
  return (
    <>
      <MyNavBar />
      <NavigationButton
        uriOne={"/admin/create-teams"}
        buttonOneText={"< teams"}
        uriTwo={"/admin/manage-events"}
        buttonTwoText={"events >"}
      />
      <CreateMatches />
      <MyFooter />
    </>
  );
}
