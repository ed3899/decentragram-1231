import {expect, assert, should} from "chai";
import {ethers} from "hardhat";
import {loadFixture, deployContract} from "ethereum-waffle";
import DecentragramJSON from "../artifacts/contracts/Decentragram.sol/Decentragram.json";
import {
  BigNumber,
  Contract,
  ContractReceipt,
  ContractTransaction,
  Event,
  Transaction,
  Wallet,
} from "ethers";

import {Provider} from "@ethersproject/abstract-provider";
import {Result} from "ethers/lib/utils";

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

describe.only("Images", async function () {
  const {Decentragram} = await loadFixture(fixture);
  let result: ContractTransaction;
  let txReceipt: ContractReceipt;

  it.only("Creates images", async function () {
    const [owner, author] = await ethers.getSigners();
    const hash = "testHash";
    const description = "Some description";

    let imageCount: BigNumber;
    let event: Result;

    result = await Decentragram.connect(author).uploadImage(hash, description);
    txReceipt = await result.wait();

    event = (txReceipt.events as unknown as Event[])[0].args as Result;

    imageCount = await Decentragram.imageCount();
    assert.strictEqual(imageCount.toNumber(), 1);

    assert.strictEqual(imageCount.toNumber(), 1);
    assert.strictEqual(
      event.id.toNumber(),
      imageCount.toNumber(),
      "id is correct"
    );
    assert.strictEqual(event.imgHash, hash, "Hash is correct");
    assert.strictEqual(
      event.description,
      description,
      "Description is correct"
    );
    assert.strictEqual(event.tipAmount.toNumber(), 0, "Tip amount is correct");
    assert.strictEqual(event.author, author.address, "Author is correct");

    //Failure when hash is empty
    await expect(
      Decentragram.connect(author).uploadImage("", "Image description")
    ).to.be.revertedWith("Img hash cannot be empty");

    //Failure with blank descriptions
    await expect(Decentragram.connect(author).uploadImage("Hash", "")).to.be
      .reverted;
  });
});
