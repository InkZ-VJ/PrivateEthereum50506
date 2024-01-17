import os
import binascii
from coincurve import PrivateKey
from sha3 import keccak_256
from web3 import Web3
import json

def generate_ethereum_address():
    # Generate a random private key
    private_key = PrivateKey(os.urandom(32))

    # Get the corresponding public key
    public_key = private_key.public_key.format(compressed=False)[1:]

    # Take the Keccak-256 hash of the public key
    public_key_hash = keccak_256(public_key).digest()

    # The Ethereum address is the last 20 bytes of this hash
    ethereum_address = binascii.hexlify(public_key_hash[-20:]).decode()

    # Convert to checksum address
    checksum_address = Web3.to_checksum_address('0x' + ethereum_address)

    # Ensure the private key has the "0x" prefix
    formatted_private_key = '0x' + private_key.to_hex()

    return formatted_private_key, checksum_address

# Generate 100 Ethereum addresses and private keys
addresses = [generate_ethereum_address() for _ in range(100)]

# Create a list of dictionaries with keys "Private Key" and "Address"
address_list = [{"Private Key": private_key, "Address": address} for private_key, address in addresses]

# Save the addresses and private keys to a JSON file
with open('./ethereum_addresses_with_private_keys.json', 'w') as f:
    json.dump(address_list, f, indent=4)

# Now the private keys in the JSON file will have the "0x" prefix
