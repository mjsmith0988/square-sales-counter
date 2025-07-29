export default async function handler(req, res) {
try {
const response = await fetch("https://connect.squareup.com/v2/payments", {
headers: {
Authorization: `Bearer ${process.env.SQUARE_TOKEN}`,
"Content-Type": "application/json",
},
});

const data = await response.json();

const sales = data.payments?.filter(
(payment) =>
payment.location_id === process.env.SQUARE_LOCATION_ID &&
payment.amount_money?.amount === 100 && // £1.00 in pence
payment.note?.toLowerCase().includes("£100 jackpot")
);

res.status(200).json({ sold: sales?.length || 0 });
} catch (error) {
console.error(error);
res.status(500).json({ error: "Failed to fetch sales" });
}
}

