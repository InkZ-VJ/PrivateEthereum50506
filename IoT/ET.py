import web3
import json

user_address = "0x4b81eeD5Cbe79a8b396914066f034B42BCBbA417"
httpRPC = "http://127.0.0.1:8545"
contractAddress = "0xEdE0B37fE3Cfb7ED9002B50F22AC8e7b3D160a3e"
abiPath = "./contractABI.json"
contractABI = json.load(open(abiPath))

w3 = web3.Web3(web3.HTTPProvider(httpRPC))
ET = w3.eth.contract(address = contractAddress, abi = contractABI)
user_status = ET.functions.status(user_address).call()
print(user_status)

