/* Brian Walsh Project 5 Employee Directory
This project is best viewed in full screen size, where all
12 employees are visible. Also, this project works in Chrome, but
not Firefox or Explorer. I dont know why, as all my other projects
had no issues across other browzers. */
let employees = []; // this array holds all data from the API
let employeeList = $('#employeeList');
let main = $('.main');
// object constructor to hold all data of employees
function Person (icon, name, username, cell, email, location, dob) {
  this.icon = icon;
  this.name = name;
  this.username = username;
  this.cell = cell;
  this.email = email;
  this.location = location;
  this.dob = dob;
} // end object constructor

/* call the API and construct the object for each employee
then store in the array and call function displayEmployeeList */
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    $.each(data.results, function(i, item) {
      let profile = new Person(
        item.picture,
        item.name,
        item.login.username,
        item.cell,
        item.email,
        item.location,
        item.dob
      );
      employees.push(profile);
    }); // end each()
    displayEmployeeList(employees); 
      // listener for each employee   
      $('.employee').on('click', function (e) {
        let picture = $(this).find('img').attr('src');
        let clicked = employees.find(x => x.icon.medium === picture);
        displayModal(clicked);
      }) // end listener
  } // end success()
}); // end ajax()
// displays list of 12 employees and creates all required html
function displayEmployeeList(employees) {
  $.each(employees, function(i, item) {
    let employee = document.createElement('div');
    $(employee).addClass('employee');
    let icon = document.createElement('div');
    $(icon).addClass('icon');
    let img = document.createElement('img');
    img.src = item.icon.medium;
    let shortProfile = document.createElement('div');
    $(shortProfile).addClass('shortProfile');
    let name = document.createElement('h3');
    name.textContent = `${item.name.first} ${item.name.last}`;
    let email = document.createElement('p');
    email.textContent = item.email;
    let location = document.createElement('p');
    location.textContent = item.location.city;
    icon.appendChild(img);
    shortProfile.append(name);
    shortProfile.append(email);
    shortProfile.append(location);
    employee.append(icon);
    employee.append(shortProfile);
    employeeList.append(employee);
  }); // end each
} // end displayEmployeeList

//creates and displays the modal and all requirements
function displayModal(clicked) {
  let overlay = document.createElement('div');
  $(overlay).addClass('overlay');
  let modal = document.createElement('div');
  $(modal).addClass('modal');
  let action = document.createElement('div');
  $(action).addClass('action');
  let closeButton = document.createElement('button');
  $(closeButton).addClass('btn');
  closeButton.textContent = 'X';
  let arrowUp = document.createElement('i');
  let arrowDown = document.createElement('i');
  arrowDown.textContent = 'arrow_back';
  arrowDown.style = "color:white;background-color:gray;border: 1px black solid;";
  arrowUp.textContent = 'arrow_forward';
  arrowUp.style = "color:white;background-color:gray;border: 1px black solid;";
  $(arrowDown).addClass('material-icons arrow');
  $(arrowUp).addClass('material-icons arrow');
  let longProfile = document.createElement('div');
  $(longProfile).addClass('longProfile');
  let img = document.createElement('img');
  img.src = clicked.icon.medium;
  let name = document.createElement('h3');
  name.textContent = `${clicked.name.first} ${clicked.name.last}`;
  let userName = document.createElement('p');
  userName.textContent = `Username: ${clicked.username}`;
  let line = document.createElement('p');
  line.textContent = '____________________________________';
  let email = document.createElement('p');
  email.textContent = clicked.email;
  let cellPhone = document.createElement('p');
  cellPhone.textContent = `Cell: ${clicked.cell}`;
  let location = document.createElement('p');
  $(location).addClass('location');
  location.textContent = `${clicked.location.street}, ${clicked.location.state} ${clicked.location.postcode}`;
  let city = document.createElement('p');
  city.textContent = `${clicked.location.city}`;
  $(city).addClass('location');
  let born = document.createElement('p');
  let dob = clicked.dob.slice(0, 11);
  let birthDay = dob.slice(8, 10);
  let birthMonth = dob.slice(5, 7);
  let birthYear = dob.slice(0, 4);
  born.textContent = `Birthday: ${birthMonth}/${birthDay}/${birthYear}`
  // put everything on the page
  $(longProfile).append(img);
  $(longProfile).append(name);
  $(longProfile).append(email);
  $(longProfile).append(city);
  $(longProfile).append(line);
  $(longProfile).append(userName);
  $(longProfile).append(cellPhone);
  $(longProfile).append(location);
  $(longProfile).append(born);
  $(action).append(arrowDown);
  $(action).append(arrowUp);
  $(action).append(closeButton);
  $(modal).append(action);
  $(modal).append(longProfile);
  $(overlay).append(modal);
  $(main).append(overlay);
  /* get index value of current employee and set logic to prevent 
  index value becoming out of range for array */
  let currentEmployee = employees.indexOf(clicked);
  if(currentEmployee === 0) { $(arrowDown).hide();}
  if(currentEmployee === 11) { $(arrowUp).hide();}
  // listener for arrowUp
  $(arrowUp).on('click', function (e) {
    $(overlay).hide();
    currentEmployee += 1;
    let nextEmployee = employees[currentEmployee];
    displayModal(nextEmployee);
  })// end listener
  // listener for arrowDown
  $(arrowDown).on('click', function (e) {
    $(overlay).hide();
    currentEmployee -= 1;
    let nextEmployee = employees[currentEmployee];
    displayModal(nextEmployee);
  }) // end listener
  // listener for close button
  $(closeButton).on('click', function(e) {
    $(overlay).hide();
  }) // end listener
} // end displayModal()

// listener for search button
$('#name').change(function (e) {
  let search = $('#name').val().toLowerCase();
  let clicked = employees.find(x => x.name.first.includes(search) || x.name.last.includes(search) || x.username.includes(search));
  if(clicked === undefined){
    alert('no such employee');
  }
  $('#name').val('');
  displayModal(clicked);
}); // end listener

