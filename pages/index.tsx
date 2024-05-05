
import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "../components/footer";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import { NextPage } from 'next';
import Abi from '../functionABI/abi.json'



const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const mintPrepareContractWrite = usePrepareContractWrite({
    address: "0x96b38c930131A929429B8eaa7C35339D4eCE015D",
    abi: Abi,
    functionName: "mint",
    enabled: true,
    args: [],
  });

  const mintContractWrite: any = useContractWrite(
    mintPrepareContractWrite.config
  );

  const mintWaitForTransaction = useWaitForTransaction({
    hash: mintContractWrite.data?.hash,
  });

  const mint = async () => {
    mintContractWrite.write?.();
  };

  useEffect(() => {
    if (mintWaitForTransaction.status == "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction completed successfully",
      });

      mintContractWrite.reset();
    }
  }, [mintWaitForTransaction.status]);

  


  return (
    <section className="bg-black">
      <header className="bg-black text-gray-600 body-font border-b-[0.2px] border-[#8543f3] relative">
        <div className="container mx-auto flex flex-wrap p-7 flex-col md:flex-row items-center ">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="mr-4" src="/Vector 5.png" />
            <img className="h-full" src="/RAPID CHAIN.png" />
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-gray-400">
        
            <a  href="https://testnet.rapidscan.io" target="_blank" className="mr-5 hover:text-gray-200">RapidScan</a>
            <a href="https://faucet.rapidchain.io" target="_blank" className="mr-5 hover:text-gray-200">Faucet</a>
  
          </nav>


          <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button onClick={openConnectModal} className="inline-flex items-center bg-black border-1 border-[#8543f3] border py-2 px-14 focus:outline-none text-[#8543f3] hover:bg-[#8543f3] hover:text-black rounded text-base mt-4 md:mt-0">
                              Connect Wallet
                            </button>
                             
                            );
                          }
                          if (chain.unsupported) {
                            return (

                              <button onClick={openChainModal} className="inline-flex items-center bg-black border-1 border-[#8543f3] border py-2 px-14 focus:outline-none text-[#8543f3] hover:bg-[#8543f3] hover:text-black rounded text-base mt-4 md:mt-0">
                              Wrong Network
                            </button>
                              
                            );
                          }

                          return (


                            <button onClick={openAccountModal} className="inline-flex items-center bg-black border-1 border-[#8543f3] border py-2 px-14 focus:outline-none text-[#8543f3] hover:bg-[#8543f3] hover:text-black rounded text-base mt-4 md:mt-0">
                            {account.displayName}
                                      {account.displayBalance
                                        ? ` (${account.displayBalance})`
                                        : ''}
                          </button>
                           
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>


         
        </div>
      </header>
      <section
        className="text-gray-400 bg-black body-font "
        style={{ height: "100vh" }}
      >
        <img src="/Group 198.png" className="absolute" />
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10   from-[#8543f3] via-[#d065f6]/0 to-[#8543f3] rounded ">
            <img
            style={{borderRadius:'14px'}}
              className="object-cover object-center bg-black w-full p-[1px] hover:scale-110 transition ease-in-out delay-150 duration-300 rotate-30"
              alt="hero"
              src="./nft.png"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-center md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Before they sold out
            </h1>
            <p className="mb-8 leading-relaxed">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>

            <div className="mt-3 w-1/2 mx-auto flex gap-2 ">
              <button  onClick={(e) => mint()} className="bg-gradient-to-r bg-transparent from-[#8543f3] to-[#d065f6] w-full text-[#08080f] hover:bg-gradient-to-r hover:from-violet-900 hover:to-[#4e295b] hover:text-[#a98ed5]  px-6 py-3 rounded text-md font-semibold text-semibold transition  ">
                Mint
              </button>
              <img src="/Vector.svg" className="absolute bottom-0 right-0" style={{zIndex: "-1"}} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}
