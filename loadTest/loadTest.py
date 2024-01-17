from web3 import Web3
import json
import time

# Connect to your Ethereum node
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# Replace 'YOUR_PRIVATE_KEY' with your actual private key
private_key = '0x7f81a5f87ce01049b8b63f520179fc3ed9ebd9def0cbe4aca334eec5e1c573e6'
account = w3.eth.account.from_key(private_key)

# Load the contract ABI and address
contract_address = '0xEdE0B37fE3Cfb7ED9002B50F22AC8e7b3D160a3e'

abiPath = "./contractABI.json"
contract_abi = json.load(open(abiPath))

# Create a contract instance
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Define the gas price and gas limit for the transactions
gas_price = w3.to_wei('1', 'gwei')  # Adjust gas price as needed
gas_limit = 1000000  # Adjust gas limit as needed

# Iterate through 200 addresses and send setPrice transactions
for i in range(5):
    address_to_send_to = '0x4b81eeD5Cbe79a8b396914066f034B42BCBbA417'  # Replace with the actual recipient address
    cost_to_set = 20  # Replace with the desired cost

    # Build the setPrice transaction
    nonce = w3.eth.get_transaction_count(account.address)
    tx = contract.functions.setPrice(address_to_send_to, cost_to_set).build_transaction({
        'chainId': 50506,
        'gas': gas_limit,
        'gasPrice': gas_price,
        'nonce': nonce,
    })

    # Record the start time
    start_time = time.time()

    # Sign the transaction
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)

    # Send the transaction
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    # Wait for transaction confirmation
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Record the end time
    end_time = time.time()

    # Calculate the time taken for the transaction
    time_taken = end_time - start_time
    
    #get Block number
    get_receipt = w3.eth.get_transaction_receipt(tx_hash)
    block_number = get_receipt['blockNumber']
    
    #get Transaction fee
    gas_used = receipt['gasUsed']
    gas_price = w3.eth.get_transaction(tx_hash)['gasPrice']
    transaction_fee_wei = gas_used * gas_price
    transaction_fee_ether = w3.from_wei(transaction_fee_wei, 'ether')

    print(f'Transaction {i+1}:')
    print(f'Hash: {tx_hash.hex()}')
    print(f'The block number at {block_number}')
    print(f'Gas used: {gas_used} gas')
    print(f'Transaction fee: {transaction_fee_ether} Coins')
    print(f'Transaction Time Taken: {time_taken:.2f} seconds \n')