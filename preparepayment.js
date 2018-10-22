'use strict';
/* import RippleAPI and support libraries */
const RippleAPI = require('ripple-lib').RippleAPI;

// TESTNET ADDRESS 1
const ADDRESS_1 = "rnTsHZMB3Fq3RPy2LQb6xzvQ3w1gTeZdxv"
const SECRET_1 = "snLbVnfSLSKoRrYQesWiajYyfJxgy"
// TESTNET ADDRESS 2
const ADDRESS_2 = "rBuiYpvmmEfU4MErex6bsgenLaAtY5ZDCs"

const instructions = {maxLedgerVersionOffset: 5}
const currency = 'XRP'
const amount = '100'

/*Address
rBuiYpvmmEfU4MErex6bsgenLaAtY5ZDCs
Secret
ssB4Wb57L2PEKJcnMshooq7xMmRC3
Balance
10,000 XRP*/



/* Define the payment to place here */
const payment = {
  source: {
    address: ADDRESS_1,
    maxAmount: {
      value: amount,
      currency: currency
    }
  },
  destination: {
    address: ADDRESS_2,
    amount: {
      value: amount,
      currency: currency
    }
  }
}

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com'                 // MAINNET
  server: 'wss://s.altnet.rippletest.net:51233'   // TESTNET
})

api.connect().then(() => {
  console.log('Connected...')
  api.preparePayment(ADDRESS_1, payment, instructions).then(prepared => {
    const {signedTransaction, id} = api.sign(prepared.txJSON, SECRET_1)
    console.log(id)
    api.submit(signedTransaction).then(result => {
      console.log(JSON.stringify(result, null, 2))
      api.disconnect()
    })
  })
}).catch(console.error)

/*
TRANSACTION
subscribe:113 {
  "engine_result": "tesSUCCESS",
  "engine_result_code": 0,
  "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
  "ledger_hash": "A2FC5AADF313101D4DD771FBBAC2016AE176BBB5E81F0459C878633D81EB3BEE",
  "ledger_index": 13670867,
  "meta": {
    "AffectedNodes": [
      {
        "ModifiedNode": {
          "FinalFields": {
            "Account": "rBuiYpvmmEfU4MErex6bsgenLaAtY5ZDCs",
            "Balance": "10201010000",
            "Flags": 0,
            "OwnerCount": 0,
            "Sequence": 1
          },
          "LedgerEntryType": "AccountRoot",
          "LedgerIndex": "854EF276F9EF813C02952ADF01B513B8D5443447667518DDA5861C48B0EAC6AD",
          "PreviousFields": {
            "Balance": "10101010000"
          },
          "PreviousTxnID": "EF8F0A009EEAAE4ED0C56C3F6251F674F75CFAF7ABB059C586BF5C0B03AFB4AF",
          "PreviousTxnLgrSeq": 13670837
        }
      },
      {
        "ModifiedNode": {
          "FinalFields": {
            "Account": "rnTsHZMB3Fq3RPy2LQb6xzvQ3w1gTeZdxv",
            "Balance": "9798989904",
            "Flags": 0,
            "OwnerCount": 2,
            "Sequence": 9
          },
          "LedgerEntryType": "AccountRoot",
          "LedgerIndex": "B20ED8FC264D140552E007F0DECACEC5EEBDF6DDF9547EE591ED4E45DCE92572",
          "PreviousFields": {
            "Balance": "9898989916",
            "Sequence": 8
          },
          "PreviousTxnID": "EF8F0A009EEAAE4ED0C56C3F6251F674F75CFAF7ABB059C586BF5C0B03AFB4AF",
          "PreviousTxnLgrSeq": 13670837
        }
      }
    ],
    "TransactionIndex": 0,
    "TransactionResult": "tesSUCCESS"
  },
  "status": "closed",
  "transaction": {
    "Account": "rnTsHZMB3Fq3RPy2LQb6xzvQ3w1gTeZdxv",
    "Amount": "100000000",
    "Destination": "rBuiYpvmmEfU4MErex6bsgenLaAtY5ZDCs",
    "Fee": "12",
    "Flags": 2147483648,
    "LastLedgerSequence": 13670869,
    "Sequence": 8,
    "SigningPubKey": "02B39857BFE5CDEC7EE628C4953FE01B3B35891E7CC84835308DE79515921EBE5A",
    "TransactionType": "Payment",
    "TxnSignature": "3044022050B6BF1BCE9D0033E3EA7E894B3BB04E40B969DF2EAE63F88C0720E574D606DB02206002D22C298DDB2EB51A3B8D43B03A1A76121555E911FEB5FF5636DFF6DE2CD5",
    "date": 593482302,
    "hash": "23BB688309DED2881B887D691202DC88526E8CDC1D00491377E23FA888561B93"
  },
  "type": "transaction",
  "validated": true
}
*/