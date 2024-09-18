import axios from 'axios';

interface Country {
    name: {
        "common": string,
        "official": string
    };
    capital: [];
    area: number;
    population: number;
    flags: {
        "png": string,
        "svg": string
    };
    region: string
}
const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  console.log("response ====>", response)
  return response.data as Country[];
};

export default fetchCountries;
