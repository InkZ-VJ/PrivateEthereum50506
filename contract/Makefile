.PHONY: compile node test
complie:
	npx hardhat compile
node:
	npx hardhat node
test:
	npx hardhat test
task_block_number:
	npx hardhat block-number

.PHONY: deploy_node
deploy_node:
	npx hardhat run --network localhost scripts/master.ts