import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import CreateTournament from "./CreateTournament";
import NavigationButton from "./NavigationButton";

export default function CreateTournamentPage() {
  return (
    <>
      <MyNavBar />
      <NavigationButton
        uriOne={"/"}
        buttonOneText={"< home"}
        uriTwo={"/admin/create-players"}
        buttonTwoText={"players >"}
      />
      <CreateTournament />
      <MyFooter />
    </>
  );
}
