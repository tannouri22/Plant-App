import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <nav className="navbar">
        <a href="#">Search by Species </a>
        <a href="#">Search by Location </a>
      </nav>

      <div className="grid grid-2">
        <div className="card">
          <h2>Feature 1</h2>
          <p>This is a simple description.</p>
        </div>
        <div className="card">
          <h2>Feature 2</h2>
          <p>This is another feature.</p>
        </div>
      </div>

      <button className="btn btn-primary">Click Me</button>

      <footer className="footer">
        &copy; 2024 My Next.js App
      </footer>
    </div>
  );
}
