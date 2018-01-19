<?php

$nome = $_POST['nome'];
$email = $_POST['email'];
$servico = $_POST['servico'];
$titulo = '=?UTF-8?B?'.base64_encode($_POST['titulo']).'?=';
$mensagem = $_POST['mensagem'];

	switch($servico){
	  case 1:
	    $nomeServico = "Site";
	    break;
	  case 2:
	    $nomeServico = "Blog";
	    break;
	  case 3:
	    $nomeServico = "Loja Virtual";
	    break;
	  default:
	    $nomeServico = "Outro";
	    break;
	}


$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/plain; charset=utf-8' . "\r\n";
$headers .= "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

/*abaixo contém os dados que serão enviados para o email
cadastrado para receber o formulário*/

$corpo = "Nome: " . $nome . "\n";
$corpo .= "Email: " . $email . "\n";
$corpo .= "Mensagem: " . $mensagem . "\n";
$corpo .= "Serviço: ".$nomeServico;

$email_to = 'murilohaas@quantumsoft.com.br';
//não esqueça de substituir este email pelo seu.

$status = mail($email_to, $titulo, $corpo, $headers);
//enviando o email.

if ($status) {
  echo "Email enviado com sucesso!";

//mensagem de form enviado com sucesso.

} else {
  echo " Falha ao enviar o Email";

//mensagem de erro no envio.

}
?>
