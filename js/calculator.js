import { initalizeDarkMode, initalizeHamburgerMenu } from "./utils.js";

const calculateSavings = () => {
  const initialAmount =
    parseFloat(document.getElementById("initial-amount").value) || 0;
  const monthlySaving =
    parseFloat(document.getElementById("monthly-saving").value) || 0;
  const interestRate =
    parseFloat(document.getElementById("interest-rate").value) || 0;
  const years = parseFloat(document.getElementById("saving-period").value) || 1;

  const monthlyRate = interestRate / 100 / 12;
  const months = years * 12;

  let futureValue = initialAmount;
  for (let i = 0; i < months; i++) {
    futureValue = (futureValue + monthlySaving) * (1 + monthlyRate);
  }
  const earned = futureValue - initialAmount - monthlySaving * months;
  document.getElementById("final-amount").textContent = futureValue.toFixed(2);
  document.getElementById("earned-amount").textContent = earned.toFixed(2);
};

document.addEventListener("DOMContentLoaded", () => {
  initalizeDarkMode();
  initalizeHamburgerMenu();
});

document.getElementById("savings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  calculateSavings();
});
