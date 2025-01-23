// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketPlace is ERC721, Ownable {
    struct Brand {
        string name;
        string description;
        address owner;
        bool exists;
    }

    struct Product {
        uint256 productId;
        string name;
        uint256 price;
        address brandOwner;
        bool minted;
    }

    uint256 public productCounter;
    mapping(address => bool) public hasRegisteredBrand;
    mapping(address => Brand) public brands;
    mapping(uint256 => Product) public products;
    mapping(address => uint256[]) public brandProducts;
    mapping(address => uint256[]) public userOwnedProducts;

    modifier onlyBrandOwner() {
        require(
            hasRegisteredBrand[msg.sender],
            "Only brand owners can call this function"
        );
        _;
    }

    modifier productExists(uint256 productId) {
        require(products[productId].price > 0, "Product does not exist");
        _;
    }

    modifier notBrandOwner(uint256 productId) {
        require(
            products[productId].brandOwner != msg.sender,
            "Brand owners cannot buy their own NFTs"
        );
        _;
    }

    event BrandRegistered(address indexed creator, string name, string description);
    event ProductAdded(uint256 indexed productId, string name, uint256 price, address indexed brandOwner);
    event NFTPurchased(address indexed buyer, uint256 indexed productId);

    constructor() ERC721("BrandNft","BNFT") Ownable(msg.sender) {}

    function registerBrand(string memory name, string memory description) external {
        require(!hasRegisteredBrand[msg.sender], "Brand already registered");

        brands[msg.sender] = Brand({
            name: name,
            description: description,
            owner: msg.sender,
            exists: true
        });
        hasRegisteredBrand[msg.sender] = true;

        emit BrandRegistered(msg.sender, name, description);
    }

    function addProduct(
        string memory name,
        uint256 price
    ) external onlyBrandOwner {
        require(price > 0, "Price must be greater than zero");

        productCounter++;
        products[productCounter] = Product({
            productId: productCounter,
            name: name,
            price: price,
            brandOwner: msg.sender,
            minted: false
        });

        brandProducts[msg.sender].push(productCounter);

        emit ProductAdded(productCounter, name, price, msg.sender);
    }

    function buyNFT(uint256 productId)
        external
        payable
        productExists(productId)
        notBrandOwner(productId)
    {
        Product storage product = products[productId];
        require(!product.minted, "NFT already minted");
        require(msg.value >= product.price, "Insufficient funds");

        product.minted = true;
        _mint(msg.sender, productId);
        userOwnedProducts[msg.sender].push(productId);

        emit NFTPurchased(msg.sender, productId);
    }

    function getBrandProducts(address brandOwner) external view returns (uint256[] memory) {
        return brandProducts[brandOwner];
    }

    function getAllNFTs() external view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCounter);
        for (uint256 i = 1; i <= productCounter; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    function getUserOwnedProducts(address user) external view returns (uint256[] memory) {
        return userOwnedProducts[user];
    }
}
