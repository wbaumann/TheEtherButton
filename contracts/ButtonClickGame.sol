pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/math/Math.sol";
import "./ButtonClickGameControls.sol";

contract ButtonClickGame is ERC721Token("The Ether Button", "Butt"), ButtonClickGameControls {

    /**
     * @dev This event is fired whenever a user clicks on a button, thereby creating a click
     * and resetting our block timer
     */
    event ButtonClick(address indexed owner, uint256 tokenId);

    /**
     * Defines the main struct for button clicks, which contains all relevant metadata about
     * the click action.
     *
     * Please ensure that alterations to this struct respect the byte-packing rules:
     * http://solidity.readthedocs.io/en/develop/miscellaneous.html
     */
    struct ButtonClickMetadata {
        // Tracks how far the user was away from the desired block (0 is optimal)
        uint64 blocksAwayFromDesiredBlock;

        // Defines the "generation" of this game. This gets incremented whenever the button is clicked
        // at the desired block
        uint64 clickGeneration;

        // The timestamp from the block when this click occurred
        uint64 clickTime;
    }

    /**
     * An array which contains a complete list of of ButtonClickMetadata, each of which
     * represents a unique time in which the button was clicked. The ID of each click
     * event is an index into this array
     */
    ButtonClickMetadata[] clicks;

    /**
     * Defines the current game generation. Users can play again whenever this increments.
     * Note: This always starts with generation 1
     *
     * http://solidity.readthedocs.io/en/develop/contracts.html?#visibility-and-getters
     */
    uint256 public gameGeneration = 1;

    /**
     * Defines the block number at which a click will "win"
     *
     * http://solidity.readthedocs.io/en/develop/contracts.html?#visibility-and-getters
     */
    uint256 public blockNumberForVictory;

    /**
     * A mapping from a specific address to which generation the user last clicked the button
     * during. Regardless of whether a user transfers his/her click token, we only allow a 
     * single button click per game generation
     */
    mapping (address => uint256) public addressLastClickedForGeneration;


    /**
     * @dev This method contains the core game logic, tracking a distinct button "click" event and 
     * saving all relevant metadata associated with it. This method will generate both a ButtonClick 
     * and Transfer event. Callers can ONLY call this method a single time per game generation.
     *
     * @return the id in our array, which is the latest click
     */
    function clickButton() external isStarted payable returns (uint256) {
        // Avoid spamming the game with a minimum fee
        require(msg.value >= minimumFee);

        // Don't allow the game to be played indefinitely
        require(gameGeneration <= 65535);

        // Require that the user has never click the button previously this round
        require(addressLastClickedForGeneration[msg.sender] < gameGeneration);

        // Immediately bump the user's last button click to this generation
        addressLastClickedForGeneration[msg.sender] = gameGeneration;

        // Ensure that 0 is the effective floor for elapsed blocks
        // Math.max256 won't work due to integer underflow, which will give a huge number if block.number > blockNumberForVictory
        uint256 _blocksAwayFromDesiredBlock;
        if (blockNumberForVictory > block.number) {
            _blocksAwayFromDesiredBlock = blockNumberForVictory - block.number;
        } else {
            _blocksAwayFromDesiredBlock = 0;
        }

        // Keep the local value before possibly incrementing it in the victory condition
        uint256 _generation = gameGeneration;

        // Victory condition!!
        if (_blocksAwayFromDesiredBlock == 0) {
            gameGeneration++;
        }

        // Update the blockNumber that is required for the next victory condition
        blockNumberForVictory = block.number + requiredBlocksElapsedForVictory;

        // Create a new click
        ButtonClickMetadata memory _click = ButtonClickMetadata({
            blocksAwayFromDesiredBlock: uint64(_blocksAwayFromDesiredBlock),
            clickGeneration: uint64(_generation),
            clickTime: uint64(now)
        });
        uint256 newClickId = clicks.push(_click) - 1;

        // Emit the click event
        emit ButtonClick(msg.sender, newClickId);

        // Formally mint this token and transfer ownership
        _mint(msg.sender, newClickId);

        return newClickId;
    }

    /**
     * Fetches information about a specific click event
     * 
     * @param _id The ID of a specific button click token
     */
    function getClickMetadata(uint256 _id) external view returns (
        uint256 blocksAwayFromDesiredBlock,
        uint256 clickTime,
        uint256 clickGeneration,
        address owner
    ) {
        ButtonClickMetadata storage metadata = clicks[_id];

        blocksAwayFromDesiredBlock = uint256(metadata.blocksAwayFromDesiredBlock);
        clickTime = uint256(metadata.clickTime);
        clickGeneration = uint256(metadata.clickGeneration);
        owner = ownerOf(_id);
    }

}