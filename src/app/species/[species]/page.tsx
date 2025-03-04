import { notFound } from "next/navigation"; // For handling 404s
import 'dotenv/config';
import { Species } from './../../../../data/Species'
import Image from 'next/image';

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

  return (
    <div>
      <h1>Species Information</h1>
      
      {sp.common_name && <p>Common Name: {sp.common_name}</p>}
      {sp.scientific_name && <p>Scientific Name: {sp.scientific_name}</p>}
      {sp.genus && <p>Genus: {sp.genus}</p>}
      {sp.family && <p>Family: {sp.family}</p>}
      {sp.image_url && <Image alt={`Image of ${sp.scientific_name}`} height={100} width={100} src={sp.image_url}/>}
      {sp.vegetable !== null && <p>Vegetable: {sp.vegetable ? 'Yes' : 'No'}</p>}
      {sp.edible !== null && <p>Edible: {sp.edible ? 'Yes' : 'No'}</p>}
      {sp.edible_part && <p>Edible Part: {sp.edible_part}</p>}
      
      {sp.images && sp.images && Object.keys(sp.images).length > 0 && (
        <div>
          <h2>Images:</h2>
          <div className="gallery">
          {Object.entries(sp.images).map(([key, value]) => (
            value.map((image: any) => (
              <div key={image.id} className="gallery-item">
                <Image className="gallery-image" height={100} width={100} src={image.image_url} alt={`Image of ${sp.scientific_name}`} />
                <p>Copyright: {image.copyright}</p>
              </div>
            ))
          ))}
          </div>
        </div>
      )}
    </div>

  );
  } catch (error){
    console.error("Error fetching species:", error);
    notFound();
  }
}

