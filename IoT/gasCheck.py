from web3 import Web3

web3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# Define the range of block numbers
start_block = 7500
end_block = 8540

# Function to get total gas used and the number of transactions in a specific block
def get_block_info(block_number):
    block = web3.eth.get_block(block_number)
    if block is None:
        return None

    gas_used = block['gasUsed']
    gas_limit = block['gasLimit']
    num_transactions = web3.eth.get_block_transaction_count(block_number)

    return gas_used, gas_limit, num_transactions

# Iterate through the range of block numbers
for block_number in range(start_block, end_block + 1):
    gas_used, gas_limit, num_transactions = get_block_info(block_number)

    if gas_used is not None:
        print(f'Block {block_number} - Gas Used/Limit: {gas_used}/{gas_limit}, Number of Transactions: {num_transactions}')
    else:
        print(f'Block {block_number} not found')
