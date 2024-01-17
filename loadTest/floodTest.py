from web3 import Web3
import json
import concurrent.futures

# Connect to your Ethereum node
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

private_key = '0x7f81a5f87ce01049b8b63f520179fc3ed9ebd9def0cbe4aca334eec5e1c573e6'
account = w3.eth.account.from_key(private_key)

# Load the contract ABI and address
contract_address = '0xEdE0B37fE3Cfb7ED9002B50F22AC8e7b3D160a3e'
abiPath = "./contractABI.json"
contract_abi = json.load(open(abiPath))

# Create a contract instance
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Define the gas price and gas limit for the transactions
gas_limit = 1000000 
initial_gas_price = w3.to_wei('1.1', 'gwei')  # Initialize gas_price

# Open the file in read mode
with open('./address/ethereum_addresses.txt', 'r') as f:
    # Read all the lines in the file
    addresses = f.readlines()

# Remove any newline characters at the end of each address
addresses = [address.strip() for address in addresses]

# Function to send a transaction
def send_transaction(i, gas_price):
        
    address_to_send_to =  addresses[i]
    cost_to_set = 5

    # Get the current nonce
    nonce = w3.eth.get_transaction_count(account.address,'pending')
    nonce = nonce + i

    # Build the setPrice transaction
    tx = contract.functions.setPrice(address_to_send_to, cost_to_set).build_transaction({
        'chainId': 50506,
        'gas': gas_limit,
        'gasPrice': gas_price,
        'nonce': nonce,
    })

    # Sign the transaction
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)

    # Send the transaction
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    # Update gas_price for the next transaction
    new_gas_price = gas_price * 1.11
    
    return tx_hash, new_gas_price

# Number of transactions to send concurrently
num_transactions = 1000

# Initialize gas_price with the initial value
current_gas_price = initial_gas_price

# Create a thread pool for concurrent transaction sending
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Submit the transaction sending tasks
    tx_futures = [executor.submit(send_transaction, i, current_gas_price) for i in range(num_transactions)]

    # Wait for all transactions to complete and get results
    for i, tx_future in enumerate(concurrent.futures.as_completed(tx_futures)):
        tx_hash, current_gas_price = tx_future.result()
        print(f'Transaction {i + 1}: Hash: {tx_hash.hex()}, Gas Price: {current_gas_price}')
