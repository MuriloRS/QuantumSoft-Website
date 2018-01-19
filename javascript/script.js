
var menuEstaAberto = false;


$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link

    $("#btnMenu").click(function(){
      menuEstaAberto = true;
    });

    $("#btn-enviar").click(function(){

      var nome = $("#campo-nome").val();
      var email = $("#campo-email").val();
      var mensagem = $("#campo-mensagem").val();

      if(nome != "" && email != "" && mensagem != ""){

        validaCampos(nome,email,mensagem);

        $("#envio-email").html('<img src="imagens/Spinner.svg" alt="">');

        $.ajax({
          url: 'php/envia_email_gmail.php',
          method: 'POST',
          data: $("#form-envia-mensagem").serialize(),
          success: function(data){
            var retorno = data;

            //Limpa o campo envio-email
            $("#envio-email").html("");

            //Preenche o envio-email com a mensagem de retorno
            $("#envio-email").html(retorno);

            //Se nessa mensagem de retorno tiver a palavra sucesso
            //então pinta a palavra de verde
            if(retorno.toLowerCase().indexOf("sucesso") >= 0){
              $("#envio-email").css({color: "green"});
            }
            else{
              $("#envio-email").css({color: "red"});
            }

            //reseta o form
            document.getElementById("form-envia-mensagem").reset();

            //Espera 10 segundos e tira a mensagem
            setTimeout(removeMessageSuccess, 10000);
          }

        });

      }
      else{

        validaCampos(nome,email,mensagem);
      }
    });

    $("#mainNav a, .botao-apresentacao, .btn-confiraServicos").on('click', function(event) {

    var elementoSelec = $('.botao-apresentacao');

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;
      var position = $(hash).offset().top;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        
        scrollTop: (position)
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;

      });

      if($(document).width() < 767 && menuEstaAberto == true){

        $("#btnMenu").click();// FAZ UM CLIQUE NO BOTAO QUE CHAMA O MENU PARA OCULTAR O MENU
        menuEstaAberto = false;
              return false;
      }

    } // End if
  });

});

function removeMessageSuccess(){
    $("#envio-email").html("");
}

function removeMensagemAvisoInputs(){
  $("#erroNome").html("");

  $("#erroEmail").html("");

  $("#erroMensagem").html("");
  
}

function validaCampos(nome, email, mensagem){

  if(nome == ''){
    $("#erroNome").html("Preencha o campo nome.");
  }
  else{
    $("#erroNome").html("");
  }

  if(email == ''){
    $("#erroEmail").html("Preencha o campo email.");
  }
  else{
    $("#erroEmail").html("");
  }

  if(mensagem == ''){
    $("#erroMensagem").html("Preencha o campo mensagem.");
  }
  else{
    $("#erroMensagem").html("");
  }


  setTimeout(removeMensagemAvisoInputs, 10000);
}
