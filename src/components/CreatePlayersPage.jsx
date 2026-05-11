import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import CreatePlayers from "./CreatePlayers";
import NavigationButton from "./NavigationButton";

export default function CreatePlayersPage() {
  return (
    <>
      <MyNavBar />
      <NavigationButton
        uriOne={"/admin/create-tournament"}
        buttonOneText={"< tournament"}
        uriTwo={"/admin/create-teams"}
        buttonTwoText={"teams >"}
      />
      <CreatePlayers />
      <MyFooter />
    </>
  );
}
