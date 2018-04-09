console.log('hello');
$(document).ready(function() {

$.ajax({
  url: 'https://randomuser.me/api/?results=12?',
  dataType: 'json',
  success: function(data) {
    console.log(typeof data);
    console.log(data);
    let employee = '<ul>';
    $.each(data.results, function(i, empData) {
         employee += '<img src"'+ empData.results[i].picture.medium +'">';
         employee += '<li>' + empData.results[i].name.first + '</li>';
         employee += '<li>' + empData.results[i].name.last + '</li>';
         employee += '<li>' + empData.results[i].email + '</li>';
         employee += '<li>' + empData.results[i].location.city + '</li>';
    });
    employeeHTML += '</ul>';
    $('#personel').html(employee);
  }
});
}); // end ready