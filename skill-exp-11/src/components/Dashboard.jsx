import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="dashboard">
      <h2>Dashboard</h2>
      <Link to="/local">Local Users</Link><br/>
      <Link to="/users">API Users</Link><br/>
      <Link to="/posts">Fake Posts</Link>
    </div>
  );
}