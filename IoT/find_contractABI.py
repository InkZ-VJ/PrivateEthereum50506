from web3 import Web3

# Connect to an Ethereum node
web3 = Web3(Web3.HTTPProvider('http://localhost:8485'))

contract_address = '0x005375900b7b877Bc896241eb5ADF63D95323A67'

try:
    # Retrieve the contract's ABI as a hexadecimal string
    contract_abi_hex = web3.eth.get_code(contract_address).hex()
except Exception as e:
    print(f"Error: {e}")
    contract_abi_hex = None

if contract_abi_hex:
    print(f"Contract ABI (Hexadecimal):\n{contract_abi_hex}")
else:
    print("Contract ABI not found")
