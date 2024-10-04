const calculatroRaidiosEl = document.querySelector(".calculator__radios");
const radios = calculatroRaidiosEl.querySelectorAll(".radio__input");
const calculatorResultEl = document.querySelector(".calculator__result");
const calculatorBodyEl = document.querySelector(".calculator__body");
const fields = calculatorBodyEl.querySelectorAll(".field");

const heightEl = calculatorBodyEl.querySelector(
  ".field__input-wrapper-cm .field__input"
);
const weightEl = calculatorBodyEl.querySelector(
  ".field__input-wrapper-kg .field__input"
);
const heightFtEl = calculatorBodyEl.querySelector(
  ".field__input-wrapper-ft .field__input"
);
const heightInEl = calculatorBodyEl.querySelector(
  ".field__input-wrapper-in .field__input"
);
const weightStEl = calculatorBodyEl.querySelector(
  ".field__input-wrapper-st .field__input"
);
const wightLbsEl = calculatorBodyEl.querySelector(
  ".field__input-wrapper-lbs .field__input"
);

let emptyResult = true;

calculatroRaidiosEl.addEventListener("change", (e) => {
  fields.forEach((field) => field.classList.toggle("visually-hidden"));
});

const getCheckedRadio = function () {
  return Array.from(radios).find((el) => el.checked);
};
calculatorBodyEl.addEventListener("input", (e) => {
  const checked = getCheckedRadio();
  if (checked.value === "Metric") {
    if (heightEl.value > 0 && weightEl.value > 0) {
      calculatorResultEl.textContent = "";
      calculatorResultEl.classList.add("calculator__result-flex");
      const html = generateHtmlMetricBmiResult();
      calculatorResultEl.insertAdjacentHTML("afterbegin", html);
      emptyResult = false;
    } else {
      if (!emptyResult) {
        calculatorResultEl.classList.remove("calculator__result-flex");
        calculatorResultEl.textContent = "";
        const html = generateEmptyResult();
        calculatorResultEl.insertAdjacentHTML("afterbegin", html);
        emptyResult = true;
      }
    }
  } else if (checked.value === "Imperial") {
    if (weightStEl.value > 0 && heightFtEl.value > 0) {
      calculatorResultEl.textContent = "";
      calculatorResultEl.classList.add("calculator__result-flex");
      const html = generateImperialHtmlBmiResult();
      calculatorResultEl.insertAdjacentHTML("afterbegin", html);
      emptyResult = false;
    } else {
      if (!emptyResult) {
        calculatorResultEl.classList.remove("calculator__result-flex");
        calculatorResultEl.textContent = "";
        const html = generateEmptyResult();
        calculatorResultEl.insertAdjacentHTML("afterbegin", html);
        emptyResult = true;
      }
    }
  }
});

const generateEmptyResult = function () {
  return `
    <h3 class="calculator__result-heading">Welcome!</h3>
    <p>
      Enter your height and weight and you’ll see your BMI result here
    </p>
  `;
};

const generateHtmlResult = function (bmi, weightValue, range) {
  return `
    <div class="calculator__result-body">
      <p class="calculator__result-value-header">Your BMI is...</p>
      <p class="calculator__result-value">${bmi}</p>
    </div>
    <p class="calculator__result-description">
      Your BMI suggests you’re a ${weightValue} weight. Your ideal weight is
      between ${range}.
    </p>`;
};

const generateHtmlMetricBmiResult = function () {
  const height = heightEl.value;
  const weight = weightEl.value;

  const bmi = calculateMetricBmi(height, weight);
  const min = getHealthyWeightMetric(18.5, height);
  const max = getHealthyWeightMetric(24.9, height);

  const resultString = getResultString(bmi, min, max);

  return generateHtmlResult(bmi, resultString, `${min}kgs - ${max}kgs`);
};

const generateImperialHtmlBmiResult = function () {
  const heightFt = getOrZero(heightFtEl.value);
  const heightIn = getOrZero(heightInEl.value);
  const weightSt = getOrZero(weightStEl.value);
  const wightLbs = getOrZero(wightLbsEl.value);

  const lbs = weightSt * 14 + wightLbs;
  const inc = heightFt * 12 + heightIn;

  const bmi = calculateImperialBmi(inc, lbs);

  const min = getHealthyWeightImperial(18.5, lbs);
  const max = getHealthyWeightImperial(24.9, lbs);

  const resultString = getResultString(bmi, min, max);

  return generateHtmlResult(bmi, resultString, `${min} - ${max}`);
};

const getOrZero = function (val) {
  return val ? parseFloat(val) : 0;
};
