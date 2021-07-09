import {Contract, ContractFactory} from "ethers";
import hre from "hardhat";

async function main() {
  const _DecentragramFac: ContractFactory = await hre.ethers.getContractFactory(
    "Decentragram"
  );
  const _Decentragram: Contract = await _DecentragramFac.deploy();

  const Decentragram: Contract = await _Decentragram.deployed();

  console.log("Decentragram deployed to:", Decentragram.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
