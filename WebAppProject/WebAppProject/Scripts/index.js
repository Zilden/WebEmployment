'use strict';

var colors = ['deepskyblue', 'orange', 'firebrick', 'gold', 'magenta', 'black', 'darkblue'];

var navSelector = '[c-hover-after]';
var linkSelector = navSelector + ' > * > a';
var targetSelector = navSelector + ' > span';

Array.from(document.querySelectorAll(navSelector)).forEach(function (menu) {
  var target = menu.querySelector(targetSelector);

  menu.addEventListener('focusin', onenter);
  menu.addEventListener('pointerover', onenter);

  window.addEventListener('resize', onresize);

  function onenter(event) {
    var target = event.target.closest(linkSelector);

    if (target) {
      styleTargetBy(target);
    }
  }

  function onresize() {
    if (document.activeElement.closest(linkSelector)) {
      styleTargetBy(document.activeElement);
    } else {
      target.style.width = '';
    }
  }

  function styleTargetBy(source) {
    var rect = source.getBoundingClientRect();

    target.style.width = rect.width + 'px';
    target.style.height = rect.height + 'px';
    target.style.left = rect.left + window.pageYOffset + 'px';
    target.style.top = rect.top + window.pageYOffset + 'px';
    target.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
    target.style.transform = 'none';
  }
});

window.onload = function () {

  function addEmpleo(company, position, location) {
    var empleos = document.querySelectorAll(".empleo");
    var curr = document.createElement("div");
    curr.setAttribute("class", "empleo activo");
      
    var p1 = document.createElement("p");
    p1.setAttribute("class", "company");
    p1.innerHTML = "Compa&ntilde;ia: " + company;
      
    var p2 = document.createElement("p");
    p2.setAttribute("class", "position");
    p2.innerHTML = "Posicion: " + position;
    
    var p3 = document.createElement("p");
    p3.setAttribute("class", "location");
    p3.innerHTML = "Ubicacion: " + location

    curr.appendChild(p1);
    curr.appendChild(p2);
    curr.appendChild(p3);
      
    if (empleos.length) {
      empleos[empleos.length - 1].insertAdjacentHTML("afterEnd", curr.outerHTML);
    } else {
      document.forms[0].insertAdjacentHTML("afterEnd", curr.outerHTML);
    }
  }

  var obj = {
    company: "",
    position: "",
    location: ""
  };

  document.forms[0].onchange = function (e) {
    obj[e.target.name] = e.target.value;
  };

  document.forms[0].onsubmit = function (e) {
    e.preventDefault();
    addEmpleo(document.getElementById("company").value, document.getElementById("position").value, document.getElementById("location").value);
  };
};