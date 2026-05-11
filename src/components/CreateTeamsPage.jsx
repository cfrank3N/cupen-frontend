import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import CreateTeams from "./CreateTeams";
import NavigationButton from "./NavigationButton";

export default function CreateTeamsPage() {
  return (
    <>
      <MyNavBar />
      <NavigationButton
        uriOne={"/admin/create-players"}
        buttonOneText={"< players"}
        uriTwo={"/admin/create-matches"}
        buttonTwoText={"matches >"}
      />
      <CreateTeams />
      <MyFooter />
    </>
  );
}
