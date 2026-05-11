import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import CreateTournament from "./CreateTournament";
import CreatePlayers from "./CreatePlayers";
import CreateTeams from "./CreateTeams";
import CreateMatches from "./CreateMatches";

export default function AdminPage() {
  return (
    <>
      <MyNavBar />
      <CreateTournament />
      <CreatePlayers />
      <CreateTeams />
      <CreateMatches />
      <MyFooter />
    </>
  );
}
