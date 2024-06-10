//  PayU build 
const PayU = require("payu");

const payuClient = new PayU({
    key: dRSqrd,
    salt: cB3bsVQSSaOTHxdP91WGdKlw140P7vQ6,
});

// payment initiate 
payuClient.paymentInitiate(JSON).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// payment verification
payuClient.verifyPayment(txnID).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// transaction details 
payuClient.getTransactionDetails(START_DATE, END_DATE).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// settelment details 
payuClient.getSettlementDetails(date / UTRnumber).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// netbanking status
payuClient.getNetbankingStatus(bankcode).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// issiunig bank status 
payuClient.getIssuingBankStatus(bin).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// checkout details 
payuClient.getCheckoutDetails(JSON).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// create an invoice 
payuClient.createInvoice(JSON).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// expire an invoice 
payuClient.expireInvoice(txnID).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// elligible bins for EMI
payuClient.eligibleBinsForEMI(bin).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// check bin types 
payuClient.checkIsDomestic(bin).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// check action status 
payuClient.checkIsDomestic(bin).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// cancle refund transaction 
payuClient.cancelRefundTransaction(MIHPAYUD, TOKEN_ID, AMOUNT).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// validate VPA
payuClient.validateVPA(VPA).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

// Update UDF
payuClient.opgsp.udfUpdate(JSON).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});


