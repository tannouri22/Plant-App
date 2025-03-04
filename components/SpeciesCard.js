import Image from "next/image";
import Link from 'next/link';
  
export default function SpeciesCard({ sp }){

    return (
        <div className="card">
            <Link href={`/species/${sp.id}`}>
            <div className="flex">
                <Image 
                    height={100}
                    width={100} 
                    src={sp.image_url} 
                    alt={sp.common_name} 
                    className="image-contain"
                />
                <div>
                    <p className="card-title">{sp.common_name}</p>
                    <p>{sp.scientific_name}</p>
                </div>
                
            </div>
            </Link>
        </div>
    );
}