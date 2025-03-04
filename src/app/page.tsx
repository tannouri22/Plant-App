"use client";
import SpeciesCard from "../../components/SpeciesCard";
import { useState, useEffect } from "react";

type Species = {
  id: number;
  name: string;
};


export default function Home() {

  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        let apiUrl = `http://localhost:3000/api/species`;
        const response = await fetch(apiUrl);
        const json = await response.json();
        setSpecies(json.data || []); // Ensure we use the correct path in response
      } catch (error) {
        console.error("Error fetching distributions:", error);
      }
    };

    fetchDistributions();
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <a href="#">Search by Species </a>
        <a href="#">Search by Location </a>
      </nav>

      <div className="grid grid-2">
        {species.map((speciesItem) => (
          <SpeciesCard key={speciesItem.id} sp={speciesItem} />
        ))}
      </div>
   

      <footer className="footer">
        &copy; 2024 My Next.js App
      </footer>
    </div>
  );
}
