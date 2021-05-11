$(document).ready(function(){
  handleDlDropdown();
  function handleDlDropdown() {
    $('.dl_dropdown dt').on('click', function(){
      var $dl = $(this).parent();
      $dl.toggleClass('active');
    });
  }
})