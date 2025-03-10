"use client";
import SpeciesCard from "../../components/SpeciesCard";
import { useState, useEffect } from "react";

type Species = {
  id: number;
  name: string;
};

type Links = {
  self: string;
  first: string;
  prev: string;
  next: string;
  last: string;
};


async function fetchSpeciesData(){
    let apiUrl = `http://localhost:3000/api/species`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

export default function Home() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      const initialData = await fetchSpeciesData();
      setSpecies(initialData.data); 
      setNext(initialData.links.next);
      setPrev(initialData.links.prev); 
    };

    loadInitialData();
  }, []);

  // Fetch new species data when going to the next page
  const fetchNextPage = async () => {
    if (next) {
      const response = await fetch(`http://localhost:3000/api/species?next=${next}`);
      const data = await response.json();
      setSpecies(data.data);
      setNext(data.links.next); // Update the next page URL
      setPrev(data.links.prev); // Update the prev page URL
    }
  };

  // Fetch new species data when going to the previous page
  const fetchPrevPage = async () => {
    if (prev) {
      const response = await fetch(`http://localhost:3000/api/species?prev=${prev}`);
      const data = await response.json();
      setSpecies(data.data);
      setNext(data.links.next); // Update the next page URL
      setPrev(data.links.prev); // Update the prev page URL
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <a href="#">Search by Species </a>
        <a href="#">Search by Location </a>
      </nav>

      <div className="grid grid-2">
        {species.map((speciesItem: Species) => (
          <SpeciesCard key={speciesItem.id} sp={speciesItem} />
        ))}
      </div>
   
      {/* Paginator */}
      <div className="paginator">
        <button 
          className="paginator-btn" 
          onClick={fetchPrevPage} 
          disabled={!prev}
          data-label="Previous"
        >
        </button>
        <button 
          className="paginator-btn"
          onClick={fetchNextPage} 
          disabled={!next}
          data-label="Next"
        >
        </button>
      </div>

      <footer className="footer">
        &copy; 2024 My Next.js App
      </footer>
    </div>
  );
}
