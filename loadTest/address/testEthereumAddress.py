# Open the file in read mode
with open('./ethereum_addresses.txt', 'r') as f:
    # Read all the lines in the file
    addresses = f.readlines()

# Now 'addresses' is a list where each element is an Ethereum address
# Remove any newline characters at the end of each address
addresses = [address.strip() for address in addresses]

# Print out the first 10 addresses to verify
for i in range(10):
    print(addresses[i])
