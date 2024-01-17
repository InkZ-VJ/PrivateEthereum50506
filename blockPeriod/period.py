from web3 import Web3
import matplotlib.pyplot as plt
import numpy as np

# Replace with the URL of your Geth node
node_url = "http://localhost:8545"
w3 = Web3(Web3.HTTPProvider(node_url))

# Check if connected to the node
if w3.is_connected():
    print(f"Connected to Geth node at {node_url}")
else:
    print("Failed to connect to Geth node")

# Define Start and End Block Numbers
start_block = 4500  # Replace with your desired start block number
end_block = 9000    # Replace with your desired end block number

block_periods = []

for block_number in range(start_block, end_block + 1):
    block = w3.eth.get_block(block_number)
    timestamp = block.timestamp
    block_periods.append(timestamp)

# Calculate time differences between blocks
time_differences = [block_periods[i] - block_periods[i - 1] for i in range(1, len(block_periods))]

# Replace block times more than 20s with 5s
fixed_time = 5  # Replace with your desired fixed time (e.g., 5 seconds)
for i in range(len(time_differences)):
    if time_differences[i] > 100:
        time_differences[i] = fixed_time

# Calculate the average block time
average_block_time = sum(time_differences) / len(time_differences)

# Calculate the moving average with a window size of 10 blocks
window_size = 40
moving_average = np.convolve(time_differences, np.ones(window_size)/window_size, mode='valid')

# Create the plot title with the average block time
plot_title = f'Time Differences Between Blocks (Average Block Time: {average_block_time:.2f} seconds)'

# Plotting the data
plt.figure(figsize=(10, 6))

# Plot the original time differences
plt.plot(range(start_block + 1, end_block + 1), time_differences, marker='o', linestyle='', color='b', label='Block Time', markersize=2)

# Plot the moving average
start_idx = window_size - 1  # Adjust the starting index due to convolution
plt.plot(range(start_block + start_idx + 1, end_block + 1), moving_average, color='r', label=f'Moving Average (Window Size: {window_size})')

plt.title(plot_title)
plt.xlabel('Block Number')
plt.ylabel('Time Difference (seconds)')
plt.ylim(0, 20)
plt.legend()  # Display the legend

plt.tight_layout()
plt.savefig("block_time_plot_with_ma.png")