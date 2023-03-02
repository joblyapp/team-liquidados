import LogIn from "../components/login/logIn";
import StatsIndex from "../components/stats/statsIndex";

export default function StatsPage({ loggedIn }) {
  return (
    <>
      {!loggedIn ? (
        <LogIn />
      ) : (
        <>
          <StatsIndex />
        </>
      )}
    </>
  );
}
