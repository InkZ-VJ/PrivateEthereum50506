import web3
import json
# from web3.middleware.geth_poa import geth_poa_middleware

user_address = "0x4134599a56e2230cf6D657f20d09652Eb9D26f8e"
httpRPC = "http://127.0.0.1:22000"
contractAddress = "0x79F183f64CFD68a077bD6c2700f2a4D6059F277C"
abiPath = "./contractABI.json"
contractABI = json.load(open(abiPath))

w3 = web3.Web3(web3.HTTPProvider(httpRPC))
# w3.middleware_onion.inject(geth_poa_middleware, layer=0)
ET = w3.eth.contract(address = contractAddress, abi = contractABI) # type: ignore

user_status = ET.functions.status(user_address).call()
print(user_status)

