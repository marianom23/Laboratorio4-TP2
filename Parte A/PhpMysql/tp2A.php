<?php
$dsn = 'mysql:host=localhost;dbname=tp2-lab4;port=3306';
$db_user = 'root';
$db_password = '';
$opt = [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION];
$mysql = new PDO($dsn,$db_user,$db_password,$opt);
set_time_limit(400000);
error_reporting(0);

if($_POST){
  for ($codigo=1; $codigo <=300 ; $codigo++) {
  try {
  $api = file_get_contents("https://restcountries.eu/rest/v2/callingcode/$codigo");
  $json = json_decode($api);
  if(isset($json)){
    foreach ($json as $key => $pais) {
      $nombrePais = $pais->name;
      $capitalPais = $pais->capital;
      $region = $pais->region;
      $poblacion = $pais->population;
      $latitud = $pais->latlng[0];
      $longitud = $pais->latlng[1];
      $codigoPais = $pais->numericCode;
      $busquedaPais = $mysql->prepare("SELECT * FROM pais WHERE codigoPais = $codigoPais");
      $busquedaPais->execute();
      $result=$busquedaPais->rowCount();
      if($result != 0){
        //EXISTE
        $update = $mysql->prepare("UPDATE pais SET nombrePais = '$nombrePais' ,capitalPais = '$capitalPais', region = '$region',
        poblacion = '$poblacion', latitud = '$latitud',longitud = '$longitud' WHERE codigoPais = '$codigoPais'");
        $update->execute();
      }else {
        //NO EXISTE
        $sql = "INSERT INTO pais (codigoPais,nombrePais,capitalPais,region,poblacion,latitud,longitud) VALUES(?,?,?,?,?,?,?)";
        $insertar = $mysql->prepare($sql);
        $insertar->execute([$codigoPais,$nombrePais,$capitalPais,$region,$poblacion,$latitud,$longitud]);
      }
    }
  }else{
    continue;
      }
    } catch (\Exception $e) {}
  }
}
 ?>
 <!DOCTYPE html>
 <html lang="es" dir="ltr">
   <head>
     <meta charset="utf-8">
     <title></title>
   </head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <body class="d-flex justify-content-center">
       <div class="">
          <h1>TP 2 LABORATORIO</h1>
         <form class="migrar" action="index.php" method="post" onsubmit="return estaSeguro()">
           <button class="btn btn-primary" type="submit" name="button">MIGRAR PAISES</button>
         </form>
       </div>
	</body>

  <!--Jquery-->
  <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
     <script type="text/javascript">
     function estaSeguro(){
       if(confirm("Esta Seguro? esto puede tardar alrededor un minuto")){
         return true;
       }else{
         return false;
       }
     }
     </script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
   </body>
 </html>
