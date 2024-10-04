const calculateMetricBmi = function (cm, kg) {
  return parseFloat(kg / (cm / 100) ** 2).toFixed(1);
};

const calculateImperialBmi = function (inc, lbs) {
  return parseFloat(703 * (lbs / Math.pow(inc, 2))).toFixed(1);
};

const getHealthyWeightMetric = function (index, height) {
  return parseFloat(index * (height / 100) ** 2).toFixed(1);
};

const getHealthyWeightImperial = function (index, lbsSum) {
  const st = lbsSum / 14;
  const lbs = lbsSum - st * 14;
  return `${st}st ${lbs}lbs`;
};

const getResultString = function (bmi, min, max) {
  let value;
  if (bmi < 18.5) {
    value = "Underweight";
  } else if (bmi > 18.5 && bmi < 24.9) {
    value = "Healthy";
  } else if (bmi > 25 && bmi < 29.9) {
    value = "Overweight";
  } else {
    value = "Obese";
  }
  return value;
};
