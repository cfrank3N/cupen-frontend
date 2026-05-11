import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import CreateTournament from "./CreateTournament";
import CreatePlayers from "./CreatePlayers";

export default function AdminPage() {
  return (
    <>
      <MyNavBar />
      <CreateTournament />
      <CreatePlayers />
      <MyFooter />
    </>
  );
}
