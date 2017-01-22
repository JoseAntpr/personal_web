$(document).ready(function(){
  var API_URL = "http://localhost:8000/api/";
  var comments = [];
  var newCommentInput = $('#new-comment');
  var commentContainer = $('#comment-container');
  var loader = $('.loader');

  var drawComments = function(){
    commentContainer.empty();

    if(comments.length==0){
      commentContainer.append('<li> No hay comentarios </li>');
    }else{
      var commentToAdd = '';
      for(var i = 0 ; i < comments.length ; i++){
        commentToAdd += '<li class="comment-item">'+comments[i].Comment+'</li>';
      }
      commentContainer.append(commentToAdd);
    }

  };

  var createComment = function (comment){

    var success = function(data){
      newCommentInput.val('');
      comments.push(data);
      drawComments();
    };

    var data = {
      'Comment': comment
    };

    $.ajax({
      type: "POST",
      url: API_URL+ "comments",
      data: data,
      success: success
    })
    .fail(function(error){
      console.error("Error creando comentario.", error);
    });
  };

  $('#send-new-comment').on("click", function(event){
    if(newCommentInput.val() != ''){
      event.preventDefault();
      createComment(newCommentInput.val());
    }

  });

  var getComments =  function(){
    var success = function(data){
      comments = data;
      drawComments();
    };
    var error = function(error){
      console.error("Error cargando tareas.", error);
    }
    var complete =  function(object,textStatus){
      loader.hide();
      if(textStatus == 'error'){
        console.log("Ha habido un error, revisalo");
      }else{
        console.log("Todo ha ido de forma correcta");
      }
    }
    var beforeSend = function () {
      loader.show();
      console.log("before send");
    }
    $.ajax({
      type: "GET",
      url: API_URL+ "comments",
      success: success,
      error:error,
      complete:complete,
      beforeSend:beforeSend
    });
  };

  setTimeout(function(){
    getComments();
  },2000);

});
