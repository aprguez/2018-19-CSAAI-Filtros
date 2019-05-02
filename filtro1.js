function main() {
  console.log("En main()....");

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc');
  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');
  //-- Acceso a los deslizadores
  deslizador_R = document.getElementById('deslizador_R');
  deslizador_V = document.getElementById('deslizador_V');
  deslizador_A = document.getElementById('deslizador_A');
  //-- Valores de los deslizadores
  range_valueR = document.getElementById('range_valueR');
  range_valueV = document.getElementById('range_valueV');
  range_valueA = document.getElementById('range_valueA');
  gris = document.getElementById('gris');
  original = document.getElementById('original');
    original.onclick = () => {
        ctx.drawImage(img, 0,0);
    }

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  gris.onclick = () => {
    ctx.drawImage(img, 0,0);
    console.log('gris');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    for (var i = 0; i < data.length; i+=4){
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];
      brillo = (3 * r + 4 * g + b)/8;
      data[i] = data[i+1] = data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function RGB(){

    range_valueR.innerHTML = deslizador_R.value;
    range_valueV.innerHTML = deslizador_V.value;
    range_valueA.innerHTML = deslizador_A.value;

    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    //-- Obtener los umbrales
    var umbral_R = deslizador_R.value
    var umbral_V = deslizador_V.value
    var umbral_A = deslizador_A.value

    //-- Filtrar la imagen según los nuevos umbrales
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_R)
          data[i] = umbral_R;
      if (data[i+1] > umbral_V)
          data[i+1] = umbral_V;
      if (data[i+2] > umbral_A)
          data[i+2] = umbral_A;
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada de los deslizadores
  deslizador_R.oninput = () => {
    RGB()
    ctx.putImageData(imgData, 0, 0);
  }

  deslizador_V.oninput = () => {
    RGB()
    ctx.putImageData(imgData, 0, 0);
  }

  deslizador_A.oninput = () => {
    RGB()
    ctx.putImageData(imgData, 0, 0);
  }
}
