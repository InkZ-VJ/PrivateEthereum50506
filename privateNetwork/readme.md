# Setup Private Network
In this part we will lead you for setup Node for connect to our local privte network 50506 in `wsl Ubuntu`
> ## Create foilder
```
mkdir <fileName>
cd <fileName>/
```
* `mkdir <foilderName>` : make directory
* `cd <pathFile>` : change directory

> ## Create Node File
```
mkdir -p Node/data/keystore
```
> ## Import Genesis File From Github

Clone genesis file from github 
```
git clone https://github.com/VatJittiprasert/PrivateEthereum50506.git
```
* `git clone <httpURL>` : clone file in Github repository 
Copy genesis file to Node foilder
```
cd PrivateEthereum50506/privateNetwork/
cp static-nodes.json genesis.json ../../Node/data
```
* `cp <filePath> <destinationPath>` : copy file to destinationPath
> ## Setup Node
Used genesis tools for setup node data
 ```
 cd ../.. 

npx quorum-genesis-tool \
--validators 1 \
--members 0 \
--bootnodes 0 \
--outputPath artifacts

mv artifacts/<created_Date>/* artifacts/
 ```
* `npx quorum-genesis-tool <cmd>` : run genesis tools command
* `mv <path1> <path2>` : move foilderPath1 to path2

### Clone Important Data For Setup Node from Validator0 to Node Foilder
```
cd artifacts/validator0
cp nodekey* address ../../Node/data
cp account* ../../Node/data/keystore
```
### Initialize Node

```
cd ../../Node/
geth --datadir data init data/genesis.json
```

> ## Run Node
```
export ADDRESS=$(grep -o '"address": *"[^"]*"' ./data/keystore/accountKeystore | grep -o '"[^"]*"$' | sed 's/"//g')
export PRIVATE_CONFIG=ignore
geth --datadir data \
    --networkid 50506 --verbosity 5 \
    --syncmode full \
    --mine --miner.threads 1 --miner.gasprice 0 --miner.etherbase <YOUR_ADDRESS> \
    --http --http.addr 127.0.0.1 --http.port 22000 --http.corsdomain "*" --http.vhosts "*" \
    --http.api admin,eth,debug,miner,net,txpool,personal,web3,istanbul \
    --unlock ${ADDRESS} --allow-insecure-unlock --password ./data/keystore/accountPassword \
    --port 30300 --authrpc.addr 127.0.0.1 --authrpc.port 8560
```






























