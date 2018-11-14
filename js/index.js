$(document).ready(function(){
  if(localStorage.uid)
  {
    window.location.href = 'function.html';
    return;
  }

  $(".wrap-whole-container h1").hide().fadeIn(500);
  $(".wrap-whole-container h3").hide().fadeIn(1000);
  $(".cta-button").hide().fadeIn(2000);
});