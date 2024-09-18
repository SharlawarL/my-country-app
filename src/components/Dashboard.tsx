'use client';

import React, { useState, useEffect } from 'react';
import fetchCountries from '../api/countries';
import Image from 'next/image';

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

const CountryCard = ({ country }: { country: Country }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      });
      if (countryRef.current) {
        observer.observe(countryRef.current);
      }
      return () => {
        observer.unobserve(country.ref);
      };
    }, [country.ref]);
  
    return (
      <div ref={country.ref} className="country-card">
        {isVisible && (
          <>
            <Image
              src={country.flag}
              alt={country.name}
              width={100}
              height={50}
              objectFit="cover"
            />
            <h2>{country.name}</h2>
            <p>{country.capital}</p>
            <p>{country.population}</p>
          </>
        )}
      </div>
    );
  };


const Dashboard = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [search, setSearch] = useState('');
    const [lazyLoad, setLazyLoad] = useState(false);

    useEffect(() => {
        const fetchCountriesData = async () => {
            const data = await fetchCountries();
            setCountries(data);
        };
        fetchCountriesData();
    }, []);

    const filteredCountries = countries.filter((country) => {
        return country?.name?.official?.toLowerCase().includes(search.toLowerCase()) ||
        country?.region?.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <div className="countries-list">
      {countries.map((country, index) => (
        <CountryCard key={index} country={country} />
      ))}
      {lazyLoad && (
        <button onClick={() => setLazyLoad(false)}>Load more</button>
      )}
    </div>

            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries"
                style={{padding: 10}}
            />
            <div className="flex justify-center items-center overflow-x-auto">
                <table className="table-auto tabler-border w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Flag</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Capital</th>
                            <th className="px-4 py-2 text-left">Population</th>
                            <th className="px-4 py-2 text-left">Area</th>
                            <th className="px-4 py-2 text-left">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCountries.map((country) => (

                            <tr>
                                <td className="px-4 py-2"><img src={country?.flags?.png} alt={country.name?.official} height={50} width={100} /></td>
                                <td className="px-4 py-2">{country.name?.official}</td>
                                <td className="px-4 py-2 text-left">{country.capital}</td>
                                <td className="px-4 py-2 text-left">
                                    {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    }).format(country?.population)}
                                </td>
                                <td className="px-4 py-2 text-left">
                                    {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    }).format(country?.area)}
                                </td>
                                <td className="px-4 py-2 text-left">{country.region}</td>
                            </tr>
                            //   <li key={country.name?.official}>
                            //     <img src={country.flag} alt={country.name?.official} />
                            //     <h2>{country.name?.official}</h2>
                            //     <p>Capital: {country.capital}</p>
                            //     <p>Population: {country.population}</p>
                            //   </li>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
