const btn_output = document.querySelector(".circle");
const day_input = document.querySelector("#day");
const month_input = document.querySelector("#month");
const year_input = document.querySelector("#year");

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const month_output = document.querySelector(".month");
const day_output = document.querySelector(".day");
const year_output = document.querySelector(".year");

// Current Year - year input value = years lived
// current month - month input value = months lived
// Current day - day input value = days lived
// if the current month < month input value then do current month - month input value + 12
// If the current day < day input value then do currentday - dayinput value + 7

function timeout(param) {
  param.className = "form-control p-2 p-lg-2";
  param.previousElementSibling.style.color = "var(--Smokeygrey)";
  param.classList.remove("border-danger");
  const existingErrMsg = param.parentElement.querySelector(".err-msg");
  if (existingErrMsg) {
    existingErrMsg.remove();
  }
}
function showBorder(param) {
  param.parentElement.children[0].style.color = "var(--Lightred)";
  param.className = "border border-1 border-danger rounded-2 p-2 p-lg-2";
  setTimeout(() => timeout(param), 3000);
}

function showNoContent() {
  day_output.textContent = "--";
  month_output.textContent = "--";
  year_output.textContent = "--";
}

btn_output.addEventListener("click", () => {
  showNoContent();
  const getYearsLived = currentYear - year_input.value;
  let getDaysLived = parseInt(currentDate - day_input.value);
  let getMonthsLived = parseInt(currentMonth - month_input.value);

  // Errors
  // Day > 31 or < 1, month > 12 or < 1, year > currentYear
  // Conditions true? then textCOntents remain the same show border

  if (getMonthsLived < 0 && month_input.value <= 12) {
    getMonthsLived += 12;
  }
  if (getDaysLived < 0 && day_input.value <= 31) {
    getDaysLived += 7;
  }

  day_output.textContent = getDaysLived;
  month_output.textContent = getMonthsLived;
  year_output.textContent = getYearsLived;

  // Check for empty inputs
  if (year_input.value == "") {
    showNoContent();
    showBorder(year_input);
    const err_msg = document.createElement("p");
    console.log(year_input.parentElement);
    year_input.parentElement.style.position = "relative";
    year_input.parentElement.append(err_msg);
    err_msg.className = "err-msg";
    err_msg.textContent = "This field is required";
  }
  if (month_input.value == "") {
    const err_msg = document.createElement("p");
    showNoContent();
    showBorder(month_input);
    month_input.parentElement.style.position = "relative";
    month_input.parentElement.append(err_msg);
    err_msg.className = "err-msg";
    err_msg.textContent = "This field is required";
  }
  if (day_input.value == "") {
    const err_msg = document.createElement("p");
    showNoContent();
    showBorder(day_input);
    day_input.parentElement.style.position = "relative";
    day_input.parentElement.append(err_msg);
    err_msg.className = "err-msg";
    err_msg.textContent = "This field is required";
  }

  if (day_input.value > 31 || (day_input.value < 1 && day_input.value != "")) {
    const err_msg = document.createElement("p");
    day_input.parentElement.style.position = "relative";
    day_input.parentElement.append(err_msg);
    err_msg.className = "err-msg";
    err_msg.textContent = "Must be a valid day";
    showBorder(day_input);
    showNoContent();
    day_output.textContent = "--";
  }
  if (month_input.value > 12 && month_input.value !== "") {
    const err_msg = document.createElement("p");
    month_input.parentElement.style.position = "relative";
    month_input.parentElement.append(err_msg);
    err_msg.className = "err-msg";
    err_msg.textContent = "Must be a valid month";
    showBorder(month_input);
    showNoContent();
    month_output.textContent = "--";
  }
  if (year_input.value > currentYear && year_input.value != "") {
    showNoContent();
    const err_msg = document.createElement("p");
    year_input.parentElement.style.position = "relative";
    year_input.parentElement.append(err_msg);
    err_msg.className = "err-msg";
    err_msg.textContent = "Must be in the past";
    showBorder(year_input);
  }
});
