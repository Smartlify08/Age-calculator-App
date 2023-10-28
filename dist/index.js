// Calculate days, month and years of a person
// day = current day - given day
// month = current month - given month
// year = current year - given year;
// 2023 - 2006 = 17, 10-6 = 4months 24-12 = 12days

// Create function to calculate the age of the person.

class ErrorHandler {
  timeout(param) {
    param.className = "form-control p-2 p-lg-2";
    param.previousElementSibling.style.color = "var(--Smokeygrey)";
    param.nextElementSibling.style.display = "none";
    const existingErrMsg = param.parentElement.querySelector(".err-msg");
    console.log(existingErrMsg);
    if (existingErrMsg) {
      existingErrMsg.remove();
    }
  }

  showBorder(param) {
    param.className = "border border-1 border-danger form-control p-2 p-lg-2";
    param.previousElementSibling.style.color = "var(--Lightred)";

    setTimeout(() => this.timeout(param), 20000);
  }

  dayInvalid(day) {
    const err_msg = document.createElement("p");
    day.parentElement.append(err_msg);
    day.parentElement.style.position = "relative";
    err_msg.textContent = "Must be a valid day";
    err_msg.className = "err-msg";

    // day.previousElementSibling.style.margin = "2rem 0 0 0";
    this.showBorder(day);
    console.log("Must be a valid day");
  }

  dateInvalid(date, month, year) {
    const err_msg = document.createElement("p");
    date.parentElement.append(err_msg);
    date.parentElement.style.position = "relative";
    err_msg.textContent = "Must be a valid date";
    err_msg.className = "err-msg";
    this.showBorder(date);
    this.showBorder(month);
    this.showBorder(year);
  }

  monthInvalid(month) {
    const err_msg = document.createElement("p");
    month.parentElement.append(err_msg);
    month.parentElement.style.position = "relative";
    err_msg.textContent = "Must be a valid month";
    err_msg.className = "err-msg";
    this.showBorder(month);
    console.log(month);
  }

  yearInvalid(year) {
    const err_msg = document.createElement("p");
    year.parentElement.append(err_msg);
    year.parentElement.style.position = "relative";
    err_msg.textContent = "Must be in the past";
    err_msg.className = "err-msg";
    this.showBorder(year);
  }

  emptyInputs(inputs) {
    inputs.forEach((input) => {
      const err_msg = document.createElement("p");
      // const existingErrMsg =
      //   input.children[0].parentElement.querySelector(".err-msg");
      // if (existingErrMsg) {
      //   existingErrMsg.remove();
      // }
      input.children[0].parentElement.style.position = "relative";
      input.children[0].parentElement.appendChild(err_msg);
      err_msg.textContent = "This field is required";
      err_msg.className = "err-msg";
      this.showBorder(input.children[1]);
    });
  }
}

class Verifyall {
  calculateYear(year) {
    const errorHandler = new ErrorHandler();
    const getYear = new Date().getFullYear();

    const checkValidYear =
      (year.value.length < 4 && year.value != "") ||
      year.value.length > 4 ||
      year.value.isAlpha ||
      year.value > getYear ||
      isNaN(parseInt(getYear - year.value))
        ? errorHandler.yearInvalid(year)
        : parseInt(getYear - year.value);
    return checkValidYear;
  }

  // ! I was going to check if there is an alphabet or not in the input values, display the value of the year calculated in the output div

  calculateMonth(month) {
    const errorHandler = new ErrorHandler();
    const getMonth = new Date().getMonth() + 1;
    console.log(month.value);

    const checkValidMonth =
      month.value > getMonth && month.value <= 12
        ? parseInt(getMonth - month.value) + 12
        : month.value > 12
        ? errorHandler.monthInvalid(month)
        : `Month: ${parseInt(getMonth) - month.value}`;
    return checkValidMonth;
  }

  calculateDay(day, month, year) {
    const errorHandler = new ErrorHandler();
    const getDay = new Date().getDate();

    const checkValidDay =
      day.value > getDay && day.value <= 31
        ? parseInt(getDay - day.value) + 30
        : day.value > 31 ||
          isNaN(getDay - day.value) ||
          (day.value < 1 && day.value != "")
        ? errorHandler.dayInvalid(day)
        : `Day: ${parseInt(getDay - day.value)}`;

    function thirtyDays(day, month) {
      const thirtyDayMonths = ["4", "9", "11", "6"];
      const months = thirtyDayMonths.forEach((thirtydaymonth) => {
        if (
          (day.value == 31 && month.value == thirtydaymonth) ||
          (day.value > 29 && month.value == "2")
        ) {
          errorHandler.dateInvalid(day, month, year);
        }
      });
    }
    thirtyDays(day, month);
    return checkValidDay;
  }

  checkFields(day, month, year, input) {
    const errorHandler = new ErrorHandler();
    const day_output = document.querySelector(".day");
    const month_output = document.querySelector(".month");
    const year_output = document.querySelector(".year");

    const dayOnly = day.value != "" && month.value == "" && year.value == "";

    const monthOnly = day.value == "" && month.value != "" && year.value == "";

    const yearOnly = day.value == "" && month.value == "" && year.value != "";
    const allEmpty = day.value == "" && month.value == "" && year.value == "";

    if (dayOnly === true || monthOnly === true || yearOnly === true) {
      day_output.textContent = "-";
      console.log("day only");
    }
    // else if (monthOnly) {
    // } else if (yearOnly) {
    // }
    // if (allEmpty) {
    //   errorHandler.emptyInputs(input);
    else {
      day_output.textContent = this.calculateDay(day, month, year);
    }
  }
}

function UI() {
  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const btn_output = document.querySelector(".circle");
  const year_output = document.querySelector(".year");
  const day_output = document.querySelector(".day");
  const month_output = document.querySelector(".month");
  console.log(day_output);

  console.log(day.previousElementSibling);

  const input_box = document.querySelectorAll(".input-box");
  // input_box.forEach((box) => {
  //   console.log(box);
  //   setTimeout(() => {
  //     console.log(box.children);
  //     box.children[1].style.border = "1px solid green";
  //   }, 2000);
  // });

  // const errorHandler = new ErrorHandler();
  // errorHandler.dayInvalid(day);
  const verify = new Verifyall();

  btn_output.addEventListener("click", () => {
    if (!verify.checkFields(day, month, year, input_box)) {
    }

    if (
      !verify.calculateYear(year) ||
      !verify.calculateMonth(month) ||
      !verify.calculateDay(day, month, year)
    ) {
      console.log("Invalid");
    }
    const outputYear = verify.calculateYear(year);
    console.log(outputYear);
    year;

    console.log(verify.calculateMonth(month));
    console.log(verify.calculateDay(day, month, year));
  });
}

UI();

// ! Starting outputing into UI, create error msg for month, refactor code
// !Create Timeout function for each error, to avoid text clattering. And do the month error
