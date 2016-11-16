/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

window.onload = function() {
  changeColor('rsa', '#b03636');
  changeColor('ita', '#b03636');
  changeColor('gre', '#b03636');
  changeColor('mdv', '#b03636');
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
  document.getElementById(id).setAttribute('fill', color);
}
