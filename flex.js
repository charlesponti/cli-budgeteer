/**
 * 'One Number' Budget
 * Calculate the weekly flexible spending budget. This done
 * by taking one's monthly income, subtracting the individuals
 * fixed costs of living, and dividing the remainder by 4.3. 4.3
 * is used instead of 4 to account for months with 5 weeks.
 * @param monthlyIncome
 * @param fixedCosts
 * @return {number}
 */
module.exports = function (monthlyIncome, fixedCosts) {
  return (monthlyIncome - fixedCosts) / 4.3
}
