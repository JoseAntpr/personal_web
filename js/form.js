var form = document.getElementById("form-contact");

var inputName = document.getElementById("name")
var inputknow = document.getElementsByName("know-me")

var inputOther = document.createElement("input");
inputOther.setAttribute("id","know-me");
inputOther.setAttribute("type","text");
inputOther.setAttribute("name","know");
inputOther.setAttribute("placeholder","¿Cómo me has conocido?");
inputOther.setAttribute("required","");

for (var i = 0; i < inputknow.length; i++){
  inputknow[i].addEventListener('click', function(event){
    if(this.value == "other"){
      this.parentNode.appendChild(inputOther);
    }else{
      if(document.getElementById("know-me")){
        this.parentNode.removeChild(inputOther);
      }
    }
  });
}

form.addEventListener("submit", function(event){

  var inputName = document.getElementById("name");
  var inputEmail = document.getElementById("email");
  var inputKnowMe = {
    "friend": document.getElementById("answer_1"),
    "google": document.getElementById("answer_2"),
    "other": document.getElementById("answer_3")
  };
  var inputPhone = document.getElementById("phone");
  var inputTextArea = document.getElementById("text-area");

  if(inputName.checkValidity() == false){
    alert("Escribe tu nombre");
    inputName.focus();
    event.preventDefault();
    return false;
  };

  if(inputEmail.checkValidity() == false){
    alert("Escribe tu email correctamente");
    inputEmail.focus();
    event.preventDefault();
    return false;
  }

  if(inputKnowMe.friend.checkValidity() == false){
    alert("Selecciona como me has conocido");
    event.preventDefault();
    return false;
  };

  if(document.getElementById("know-me")){
    if(document.getElementById("know-me").checkValidity() == false){
      alert("Escribe como me has conocido");
      document.getElementById("know-me").focus();
      event.preventDefault();
      return false;
    }
  };

  if(inputPhone.checkValidity() == false || inputPhone.value.length != 9) {
    alert("Escribe correctamente el número de teléfono");
    inputPhone.focus();
    event.preventDefault();
    return false;
  };

  //textoDividido = inputTextArea.value.split(" ");
  if(inputTextArea.checkValidity() == false){
    alert("La caja de texto no puede estar vacía");
    inputTextArea.focus();
    event.preventDefault();
    return false;

  } else if(wordCount(inputTextArea.value) > 150){
    alert("Has sobrepasado el número de palabras");
    inputTextArea.focus();
    event.preventDefault();
    return false;
  }


});

wordCount = function(texto){
  NumeroCaracteres = texto.lenght;

  textoDividido = texto.split(" ");

  return textoDividido.length;
}
