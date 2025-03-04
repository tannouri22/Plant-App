export type Species = {
    id: string;
    common_name: string | null;
    scientific_name: string;
    image_url: string;
    vegetable: boolean;
    genus: string;
    family: string;
    edible: boolean;
    edible_part: string | null;
    images: {
      [key: string]: {
        id: number;
        image_url: string;
        copyright: string;
      }[];
    };
    common_names: Record<string, any>;
    distribution: {
      native: string[];
    };
    distributions: {
      native: {
        id: number;
        name: string;
        slug: string;
        tdwg_code: string;
        tdwg_level: number;
        species_count: number;
        links: {
          self: string;
          plants: string;
          species: string;
        };
      }[];
    };
    flower: {
      color: string | null;
      conspicuous: boolean | null;
    };
    foliage: {
      texture: string | null;
      color: string | null;
      leaf_retention: boolean | null;
    };
    fruit_or_seed: {
      conspicuous: boolean | null;
      color: string | null;
      shape: string | null;
      seed_persistence: boolean | null;
    };
    sources: {
      last_update: string;
      id: string;
      name: string;
      url: string | null;
      citation: string | null;
    }[];
    specifications: {
      ligneous_type: string | null;
      growth_form: string | null;
      growth_habit: string | null;
      growth_rate: string | null;
      average_height: {
        cm: number | null;
      };
      maximum_height: {
        cm: number | null;
      };
      nitrogen_fixation: boolean | null;
      shape_and_orientation: string | null;
      toxicity: string | null;
    };
    synonyms: string[];
    growth: {
      description: string | null;
      sowing: string | null;
      days_to_harvest: number | null;
      row_spacing: {
        cm: number | null;
      };
      spread: {
        cm: number | null;
      };
      ph_maximum: number | null;
      ph_minimum: number | null;
      light: string | null;
      atmospheric_humidity: string | null;
      growth_months: string | null;
      bloom_months: string | null;
      fruit_months: string | null;
      minimum_precipitation: {
        mm: number | null;
      };
      maximum_precipitation: {
        mm: number | null;
      };
      minimum_root_depth: {
        cm: number | null;
      };
      minimum_temperature: {
        deg_f: number | null;
        deg_c: number | null;
      };
      maximum_temperature: {
        deg_f: number | null;
        deg_c: number | null;
      };
      soil_nutriments: string | null;
      soil_salinity: string | null;
      soil_texture: string | null;
      soil_humidity: string | null;
    };
    links: {
      self: string;
      plant: string;
      genus: string;
    };
  };
  