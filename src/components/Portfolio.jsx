import React from "react";
import whitelist_dapp from "../assets/portfolio/whitelist_dapp.png";
import nft_collection from "../assets/portfolio/nft_collection.png";
import dBank from "../assets/portfolio/dBank.png";
import portfolio from "../assets/portfolio/portfolio.png";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      desc:"1. Simple Solidity Project",
      src: whitelist_dapp,
      website: "https://whitelist-dapp-hellosumitg.vercel.app/",
      github: "https://github.com/hellosumitg/whitelist-dapp"
    },
    {
      id: 2,
      desc:"2. ERC721 Project",
      src: nft_collection,
      website: "https://nft-collection-hellosumitg.vercel.app/",
      github: "https://github.com/hellosumitg/nft_collection"
    },
    {
      id: 3,
      desc:"3. ERC20 Project",
      src: dBank,
      website: "https://d-bank-hellosumitg.vercel.app/",
      github: "https://github.com/hellosumitg/dBank"
    },
    {
      id: 4,
      desc:"4. Portfolio Project",
      src: portfolio,
      website: "https://portfolio-hellosumitg.vercel.app/",
      github: "https://github.com/hellosumitg/portfolio"
    }
  ];

  return (
    <div
      name="portfolio"
      className="w-full px-20 pt-20 text-white bg-gradient-to-b from-black to-gray-800 lg:px-0"
    >
      <div className="flex flex-col justify-center w-full h-full max-w-screen-lg p-4 mx-auto">
        <div className="pb-8">
          <p className="inline text-4xl font-bold border-b-4 border-gray-500">
            Portfolio
          </p>
          <p className="pt-5 pb-5">Check out some of my work right here :</p>
        </div>

        <div className="grid gap-8 px-12 lg:grid-cols-2 sm:px-0">
          {portfolios.map(({ id, src, desc, website, github }) => (
            <div key={id} className="rounded-lg shadow-md shadow-gray-600">
              <div>
                <p className="font-bold text-center">{desc}</p>
              </div>
              <img
                src={src}
                alt=""
                className="duration-200 rounded-md hover:scale-105"
              />
              <div className="flex items-center justify-center">
                <a href={website} type="button" target="_blank" rel="noopener noreferrer" className="w-1/2 px-6 py-3 m-4 text-center duration-200 hover:scale-105">Demo</a>
                <a href={github} type="button" target="_blank" rel="noopener noreferrer" className="w-1/2 px-6 py-3 m-4 text-center duration-200 hover:scale-105">Code</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;