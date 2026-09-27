function hasFreeShipping(orderTotal, isMember, country) {
  return orderTotal >= 100 || (isMember && country === "BR");
}

const scenarios = [
  { orderTotal: 99, isMember: false, country: "BR" },
  { orderTotal: 100, isMember: false, country: "BR" },
  { orderTotal: 99, isMember: true, country: "BR" },
  { orderTotal: 99, isMember: true, country: "US" }
];

for (const scenario of scenarios) {
  const eligible = hasFreeShipping(
    scenario.orderTotal,
    scenario.isMember,
    scenario.country
  );

  console.log(scenario, eligible ? "Free shipping" : "Shipping fee applies");
}
