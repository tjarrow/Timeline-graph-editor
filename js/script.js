
   var leftPanel = document.getElementById('panel-1'),
       leftArrow = document.getElementById('arrow-left'),
       rightPanel = document.getElementById('panel-3'),
       mainPanel = document.getElementById('panel-2'),
       rightArrow = document.getElementById('arrow-right');

leftArrow.onclick = function() {
  leftPanel.classList.toggle('side-panel__hidden');
  //leftArrow.classList.toggle("arrow-left__hidden");
  leftArrow.classList.toggle('arrow-left__hidden');
  //leftArrow.classList.toggle("arrow-left__hidden");
  mainPanel.classList.toggle("main-pannel__to-side");
}

rightArrow.onclick = function() {
  rightPanel.classList.toggle('side-panel__hidden');
  rightArrow.classList.toggle('arrow-right__hidden');
  mainPanel.classList.toggle("main-pannel__to-side");

}
