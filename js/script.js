/**
 * "showPage" function: create and insert/append the elements needed to display a "page" of nine students
 *
 * @param {array} list - array of students data.
 * @param {number} page - number of the relevant page
 * @param {number} itemsPerPage - number of items/students to display in the page
 */

const showPage = (list, page, itemsPerPage) => {
  // defeine start index and end index
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  // get student ul list element
  const studentList = document.getElementsByClassName("student-list")[0];
  let htmlStudentListString = "";
  studentList.innerHTML = htmlStudentListString;

  // loop over list param and insert student items to page
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      htmlStudentListString = `
      <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
    </li>
      `;
      studentList.insertAdjacentHTML("beforeend", htmlStudentListString);
    }
  }
}; // end showPage function

/**
 * "addPagination" function: create and insert/append the elements needed for the pagination buttons
 * @param {array} list - array of students data.
 */

const addPagination = (list) => {
  // calc ammount of buttons
  let btnsNum = Math.ceil(list.length / 9);

  // get link ul list element
  const linkList = document.getElementsByClassName("link-list")[0];
  let htmlLinkListString = "";
  linkList.innerHTML = htmlLinkListString;

  // loop over number of buttons and insert buttons to page
  for (let i = 0; i < btnsNum; i++) {
    htmlLinkListString = `
     <li>
       <button type="button">${i + 1}</button>
     </li>
   `;
    linkList.insertAdjacentHTML("beforeend", htmlLinkListString);
  }

  // add active class to the first button
  const btns = linkList.getElementsByTagName("button");
  btns[0].classList.add("active");

  // onclick event listener - remove active class from prev active button and add active class to new clicked
  linkList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      // remove active class from all buttons
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
      }
      // add active class to clicked button
      event.target.classList.add("active");

      // call the showPage function with the relevant page
      showPage(list, event.target.textContent, 9);
    }
  });
}; // end addPagination function

/**
 * "searchBar" function: create, add and set functionality of the search bar
 */
const searchBar = (list) => {
  // create html search bar string
  let searchBarHtmlString = `
   <label for="search" class="student-search">
     <span>Search by name</span>
     <input id="search" placeholder="Search by name...">
     <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;

  // insert html search bar before end of the header element
  const header = document.getElementsByClassName("header")[0];
  header.insertAdjacentHTML("beforeend", searchBarHtmlString);

  // insert html “No results found” message and hide it by default
  let noMatchesHtmlString =
    "<p id='no-results-message' style='display: none; '>No results found</p>";
  header.insertAdjacentHTML("afterend", noMatchesHtmlString);

  // add keyup event listener for the search bar functionality
  const inputElem = document.getElementById("search");
  inputElem.addEventListener("keyup", () => {
    // get and store the input value
    let inputValue = inputElem.value;

    // filter and create new array
    let filterdArrOfStudent = list.filter(
      (e) =>
        e.name.first.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        e.name.last.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

    // toggle “No results found” if no matches are found for a search
    if (filterdArrOfStudent.length === 0) {
      document.getElementById("no-results-message").style.display = "block";
    } else {
      document.getElementById("no-results-message").style.display = "none";
    }

    // display student that matches the search keyword
    showPage(filterdArrOfStudent, 1, 9);
    // add buttons according to ammount of student
    addPagination(filterdArrOfStudent);
  });
}; // end searchBar function

// Call functions
showPage(data, 1, 9);
addPagination(data);
searchBar(data);
