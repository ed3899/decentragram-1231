import {expect, assert} from "chai";
import {ethers} from "hardhat";
import {loadFixture, deployContract} from "ethereum-waffle";
import DecentragramJSON from "../artifacts/contracts/Decentragram.sol/Decentragram.json";
import {Contract, Wallet} from "ethers";
import {Provider} from "@ethersproject/abstract-provider";

async function fixture() {
  const _DecentagramFac = await ethers.getContractFactory("Decentragram");
  const _Decentagram = await _DecentagramFac.deploy();
  const Decentragram = await _Decentagram.deployed();
  return {Decentragram};
}

describe("Decentragram", function () {
  it("Deploys succesfully", async function () {
    const {Decentragram} = await loadFixture(fixture);
    const address = await Decentragram.address;
    assert.notStrictEqual(address, "0x0");
    assert.notStrictEqual(address, "");
    assert.notStrictEqual(address, null);
    assert.notStrictEqual(address, undefined);
  });

  it("Has a name", async function () {
    const {Decentragram} = await loadFixture(fixture);
    const name = await Decentragram.name();
    assert.strictEqual(name, "Decentragram");
  });
});

describe("Images", async function () {
  let result;

  it("Creates images", async function () {
    const {Decentragram} = await loadFixture(fixture);
    const [owner, author] = await ethers.getSigners();

    result = await Decentragram.connect(author).uploadImage(
      "testHash",
      "Some description"
    );

    let image = await Decentragram.images(1);
  });
});
