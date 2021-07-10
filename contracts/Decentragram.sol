//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.6;

contract Decentragram {
    string public name = "Decentragram";

    // Store Images
    mapping(uint256 => Image) public images;
    uint256 public imageCount = 0;

    struct Image {
        uint256 id;
        string hashImg;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint256 id,
        string imgHash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    // Create Images
    function uploadImage(string calldata _imgHash, string calldata _description)
        public
    {
        // Increment image id
        imageCount += 1;
        Image memory newImage;

        images[imageCount] = Image({
            id: imageCount,
            hashImg: _imgHash,
            description: _description,
            tipAmount: 0,
            author: payable(msg.sender)
        });

        // Add image to contract -> For returning purposes
        newImage = images[imageCount];

        // Emit event
        emit ImageCreated(
            newImage.id,
            newImage.hashImg,
            newImage.description,
            newImage.tipAmount,
            newImage.author
        );
    }

    // Tip Images
}
