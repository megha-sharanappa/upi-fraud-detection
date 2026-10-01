let totalTransactions = 0;
let fraudTransactions = 0;

async function addTransaction() {

const tid = document.getElementById("tid").value;
const amount = parseFloat(document.getElementById("amount").value);
const bank = document.getElementById("bank").value;

if (!tid || !amount || !bank) {
alert("Please fill all fields");
return;
}

let status = "Safe";

if (amount > 10000) {
status = "Fraud";
}

await fetch("http://localhost:3000/addTransaction", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
transactionId: tid,
sender: bank,
receiver: "UPI",
amount: amount,
status: status
})
});

loadTransactions();

}

async function loadTransactions() {

const res = await fetch("http://localhost:3000/transactions")
const data = await res.json()

const tbody = document.getElementById("tbody")
tbody.innerHTML = ""

data.forEach(t => {

const row = tbody.insertRow()

const dateObj = new Date(t.date)

const date = dateObj.toLocaleDateString()
const time = dateObj.toLocaleTimeString()

row.insertCell(0).textContent = t.transactionId
row.insertCell(1).textContent = t.amount
row.insertCell(2).textContent = t.sender
row.insertCell(3).textContent = date
row.insertCell(4).textContent = time
row.insertCell(5).textContent = t.status
if(t.status === "Fraud"){
row.style.backgroundColor = "red"
row.style.color = "white"
}

if(t.status === "Safe"){
row.style.backgroundColor = "green"
row.style.color = "white"
}

})

}