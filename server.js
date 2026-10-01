const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/UPI_Fraud_Detection")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const transactionSchema = new mongoose.Schema({
transactionId: String,
sender: String,
receiver: String,
amount: Number,
status: String,
date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.post("/addTransaction", async (req, res) => {

const { transactionId, sender, amount } = req.body

let status = "Safe"

if(amount > 50000){
 status = "Fraud"
}

const newTransaction = new Transaction({
 transactionId,
 sender,
 amount,
 status
})

await newTransaction.save()

res.send("Transaction added")

})


app.get("/transactions", async (req, res) => {

const data = await Transaction.find();

res.json(data)

});
app.post("/addTransaction", async (req, res) => {

const { transactionId, sender, receiver, amount } = req.body

let status = "Safe"

if(amount > 50000){
  status = "Fraud"
}

const newTransaction = new Transaction({
  transactionId,
  sender,
  receiver,
  amount,
  status
})

await newTransaction.save()

res.send("Transaction added")

})

app.listen(3000, () => {
console.log("Server is Running");
});
function updateCounts() {

  const rows = document.querySelectorAll("#transactionTable tbody tr")

  let total = rows.length
  let fraud = 0

  rows.forEach(row => {
    const status = row.cells[5].innerText
    if(status === "Fraud"){
      fraud++
    }
  })

  document.getElementById("totalTransactions").innerText = total
  document.getElementById("fraudTransactions").innerText = fraud

}