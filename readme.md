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
|[Go-Ethereum(Geth)](#go-ethereumgeth)|1.11.6|
|[Solidity(solc)](#solidity-command-line-compilersolc)|0.8.20|
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
> ## Private Network Set Up  

> ### Node.JS 
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
---
### Node Package Execute(NPX)
NPX is tools for helpping run node modules with out install dependency. It suit for run module command that run once 
* Open a terminal in WSL Ubuntu.
* Run this command for install `npx`
```
sudo npm install -g npx
```
Note: `-g` is stand for install globally
* Check NPM version by
```
npx -v
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
#### Mostly error occur with graceful-fs  
use this command to delete graceful-fs package in node_modules
```
sudo rm -fR /usr/local/lib/node_modules/npx/node_modules/npm/node_modules/graceful-fs
```
---
> ### Go-Ethereum(Geth)
Geth is an Ethereum client written in Go. This means running Geth turns a computer into an Ethereum node. Ethereum is a peer-to-peer network where information is shared directly between nodes rather than being managed by a central server
* Open a terminal in WSL Ubuntu.
* Install `geth`  with this command
```
wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.11.6-ea9e62ca.tar.gz
tar -xvf geth-linux-amd64-1.11.6-ea9e62ca.tar.gz
sudo mv geth-linux-amd64-1.11.6-ea9e62ca/geth /usr/local/bin/
```
* `wget`: download of files from the Web
* `tar`: used to create and manipulate archive files in various formats
* Check your `geth` version
```
geth --version
```
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
---
> ## Python
Python is used for interaction with Smart contract in Private Blockchain
* Open a terminal in WSL Ubuntu.


---
> ## Lisense
By Vatcharapong Jittiprasert   
Conference: 
* [ECTI-CARD 2023 ID: SS1P-O017 pages: 288-291](https://ecticard2023.ecticard.org/wp-content/uploads/2023/06/ECTICARD-2023-Proceeding-Full-Paper.pdf)