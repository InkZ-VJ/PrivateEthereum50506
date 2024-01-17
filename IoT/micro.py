import RPi.GPIO as GPIO
import web3
import schedule
import time
import json
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(0,GPIO.OUT,initial = GPIO.HIGH)
GPIO.setup(2,GPIO.OUT,initial = GPIO.HIGH)
GPIO.setup(3,GPIO.OUT,initial = GPIO.HIGH)

httpRPC = "https://1973-184-22-234-66.ngrok-free.app"
user1_address = "0x4b81eeD5Cbe79a8b396914066f034B42BCBbA417"
user2_address = "0x07df0171E932865BADB4f45f4008c5f08F456881"
user3_address = "0xEb116a822B7e220Cc0153cDA62f375a3157d7Ce2"
contract_address = "0xEdE0B37fE3Cfb7ED9002B50F22AC8e7b3D160a3e"
abiPath = "/home/blockchainku2/Desktop/contractABI.json"
contractABI = json.load(open(abiPath))
w3 = web3.Web3(web3.HTTPProvider(httpRPC))

def system_call():
    ET_contract = w3.eth.contract(address = contract_address, abi = contractABI)
    user1_status = ET_contract.functions.status(user1_address).call()
    user2_status = ET_contract.functions.status(user2_address).call()
    user3_status = ET_contract.functions.status(user3_address).call()
    if user1_status == True :
        GPIO.output(0,GPIO.HIGH)
    if user2_status == True :
        GPIO.output(2,GPIO.HIGH)
    if user3_status == True :
        GPIO.output(3,GPIO.HIGH)
            
    if user1_status == False :
        GPIO.output(0,GPIO.LOW)
    if user2_status == False :
        GPIO.output(2,GPIO.LOW)
    if user3_status == False :
        GPIO.output(3,GPIO.LOW)          

schedule.every(5).seconds.do(system_call)

while True:
    schedule.run_pending()
    time.sleep(5)

