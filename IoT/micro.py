import RPi.GPIO as GPIO
import web3
import schedule
import time
import json
#GPIO setup
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(14,GPIO.OUT,initial = GPIO.HIGH)
GPIO.setup(15,GPIO.OUT,initial = GPIO.HIGH)

httpRPC = "https://94ae-158-108-38-24.ngrok-free.app"
user1_address = "0xE0c823e7d3435817ad034ed1CECa0f9711e03805"
user2_address = "0x07df0171E932865BADB4f45f4008c5f08F456881"
contract_address = "0x79F183f64CFD68a077bD6c2700f2a4D6059F277C"
abiPath = "/home/blockchainku2/Desktop/contractABI.json"
contractABI = json.load(open(abiPath))
w3 = web3.Web3(web3.HTTPProvider(httpRPC))

def system_call():
    ET_contract = w3.eth.contract(address = contract_address, abi = contractABI)
    user1_status = ET_contract.functions.status(user1_address).call()
    user2_status = ET_contract.functions.status(user2_address).call()
    if user1_status == True :
        GPIO.output(14,GPIO.HIGH)
    if user2_status == True :
        GPIO.output(15,GPIO.HIGH)
    if user1_status == False :
        GPIO.output(14,GPIO.LOW)
    if user2_status == False :
        GPIO.output(15,GPIO.LOW)       

schedule.every(5).seconds.do(system_call)

while True:
    schedule.run_pending()
    time.sleep(5)

