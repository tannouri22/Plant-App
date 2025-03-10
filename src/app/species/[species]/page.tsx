import { notFound } from "next/navigation"; // For handling 404s
import 'dotenv/config';
import { Species } from './../../../../data/Species'
import Image from 'next/image';
import Gallery from "../../../../components/Gallery";

async function fetchSpeciesData(speciesId: string): Promise<Species> {
  let apiUrl = `https://trefle.io/api/v1/species/${speciesId}?token=${process.env.ACCESS_TOKEN}`
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Species not found');
  }
  const data = await response.json();
  return data.data;
}

export default async function SpeciesInfo({params, }: { params: {species: string }}) {
  const {species} = await params;

  try {
    const sp = await fetchSpeciesData(species);
    const images = sp.images && Object.keys(sp.images).length > 0
    ? Object.entries(sp.images).flatMap(([key, value]) => value)
    : [];
    console.log(images);

  return (
    <div>
      <h1 className="species-title">{sp.common_name}</h1>
      <div className="species-flex">
        {sp.image_url && <Image className="species-image-contain" alt={`Image of ${sp.scientific_name}`} height={300} width={300} src={sp.image_url}/>}
        <div>
          {sp.common_name && <p> <span className="label">Common Name: </span> {sp.common_name}</p>}
          {sp.scientific_name && <p>Scientific Name: {sp.scientific_name}</p>}
          {sp.genus && <p>Genus: {sp.genus}</p>}
          {sp.family && <p>Family: {sp.family}</p>}
          {sp.vegetable !== null && <p>Vegetable: {sp.vegetable ? 'Yes' : 'No'}</p>}
          {sp.edible !== null && <p>Edible: {sp.edible ? 'Yes' : 'No'}</p>}
          {sp.edible_part && <p>Edible Part: {sp.edible_part}</p>}
        </div>     
      </div>
      {/* Render the Gallery component if there are images */}
      <div className="species-flex">
        {images.length > 0 && <Gallery images={images} />} 
      </div>
     
    </div>

  );
  } catch (error){
    console.error("Error fetching species:", error);
    notFound();
  }
}

