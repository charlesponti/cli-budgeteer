/**
 * # 'One Number' Budget
 *
 * Calculate the weekly flexible spending budget. This done
 * by subtracting monthly fixed costs from  monthly income
 * and dividing the remainder by 4.3.
 *
 * NOTE: 4.3 is used instead of 4 to account for months with 5 weeks.
 *
 * @param {number} monthlyIncome
 * @param {number} fixedCosts
 * @return {number}
 */
module.exports = function getFlexBudget(monthlyIncome, fixedCosts) {
  return (monthlyIncome - fixedCosts) / 4.3;
};
