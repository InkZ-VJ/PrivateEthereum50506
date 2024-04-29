import { expect } from "chai";
import { Signer } from "ethers";

 function TestOnlyOwner(error: any) {
    // Check if the error message contains the specific custom error
    const errorMessage = error.message;
    expect(errorMessage).to.include("OwnableUnauthorizedAccount");
}

export default {
    TestOnlyOwner,
}

