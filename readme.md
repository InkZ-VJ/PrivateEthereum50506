# Private Network for Internet of Things Systems
This is list of requirement setup local private ethereum network at Faculty of Electical Engineering 050506
---
> requirment

|Software|version|
|--------|-------|
|[Ubuntu](#ubuntu)|22.04.2|
|[Node.JS](#nodejs)|20.2.0|
|[NPM](#node-package-managernpm)|9.6.7|
|[NPX](#node-package-executenpx)|10.2.2|
|[Solidity(solc)](#solidity-command-line-compilersolc)|0.8.20|
|[Go-Ethereum(Geth)](#go-ethereumgeth)|1.11.6|
|Python|3.10.6|
---
> ## Ubuntu 
Ubuntu are Linux operating systems that reccommend for programming  
* Open _**powershell as adminstator**_ 
* Run this command for install window subsystems Linux version2(wsl2) 
```
wsl --install
```
* Initial your username and password for using Ubuntu
---
> ## Node.JS 
Node.JS is an open-source and cross-platform JavaScript runtime environment.  
for set up Node.JS in Ubuntu
* Open _**wsl2 or Ubuntu**_ in 2 differnt ways
    1. Powershell as administrator: run command `wsl`
    2. Find application in window search name **Ubuntu** and open it
* Run command for install NodeJS
```
sudo apt update
sudo apt install nodejs
```
* For check NodeJS installed correctly use this commnd to check  NodeJS version
```
node -v
```
Note: `-v` or `--version` for check version of command
```
Output:
20.2.0
```
---
### Node Package Manager(NPM)
NPM is tools for helpping pull NodeJS moduls
* Open a terminal in WSL Ubuntu.
* Run this command for install `npm`
```
sudo apt install npm
```
* Check NPM version by
```
npm -v
```
```
Output:
9.6.7
```
---
### Node Package Execute(NPX)
NPX is tools for helpping run node modules with out install dependency. It suit for run module command that run once 
* Open a terminal in WSL Ubuntu.
* Run this command for install `npx`
```
npm install -g npx
```
Note: `-g` is stand for install globally
* Check NPM version by
```
npx -v
```
```
Output:
10.2.2
```
* Test by run
```
npx cowsay wow
```
```
Output:
 _____
< wow >
 -----
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
* If you follw setp by step and still found an error Search that shown in google and correct it that output should be same as shown
---
> ## Solidity command-line compiler(Solc)
Solidity compler is used to compile solidity source code
* Open _**Ubuntu**_
* Run this command for install `solc` command
```
npm install -g solc
```
* Check `solc` version by
```
solv --version
```
```
Output:
solc, the solidity compiler commandline interface
Version: 0.8.20+commit.a1b79de6.Linux.g++
```
---
> ## Go-Ethereum(Geth)
Geth is an Ethereum client written in Go. This means running Geth turns a computer into an Ethereum node. Ethereum is a peer-to-peer network where information is shared directly between nodes rather than being managed by a central server
* Open a terminal in WSL Ubuntu.
* Install `geth`  with this command
```
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum=1.11.6
```
* Check your `geth` version
```
geth --version
```
```
Output:
geth version 1.11.6-stable-ea9e62ca
```
---
> ## Python
Python is used for interaction with Smart contract in Private Blockchain
* Open a terminal in WSL Ubuntu.


---
> ## Lisense
By Vatcharapong Jittiprasert   
Conference: 
* [ECTI-CARD 2023 ID: SS1P-O017 pages: 288-291](https://ecticard2023.ecticard.org/wp-content/uploads/2023/06/ECTICARD-2023-Proceeding-Full-Paper.pdf)