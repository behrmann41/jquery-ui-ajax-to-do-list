$(function() {
  $.ajax({
    method: 'GET',
    url: '/tasks/data',
    success: function(data){
      data.forEach(function(task){
         $('#accordion').append('<h3>' + task.catagory + '</h3><ul><li>' + task.description + '</li></ul>')
      })
      var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
      };
      $( "#accordion" ).accordion({
        icons: icons
      });
      $( "#accordion li" ).draggable({
            appendTo: "body",
            helper: "clone"
      });
      $( "#plan ol" ).droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ":not(.ui-sortable-helper)",
            drop: function( event, ui ) {
              $( this ).find( ".placeholder" ).remove();
              $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
            }
          }).sortable({
            items: "li:not(.placeholder)",
            sort: function() {
              // gets added unintentionally by droppable interacting with sortable
              // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
              $( this ).removeClass( "ui-state-default" );
            }
          });
    },
    error: function (err){
      console.log('error', err)
    }
  })
});