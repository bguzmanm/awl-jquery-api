$(document).ready(function () {

  $.ajax({
    type: 'GET',
    url: 'https://mindicador.cl/api/tasa_desempleo',
    dataType: 'json',
  }).done(function (data) {
    var datos = data.serie;
    var grafico = [];
    datos.forEach(element => {
      element.fecha = element.fecha.split("T")[0];
      grafico.push({
        x: new Date(element.fecha),
        y: element.valor,
      });

      console.log(typeof element.valor);
    });

    var chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      zoomEnabled: true,
      theme: 'dark2',
      title: {
        text: 'Tasa de Desempleo'
      },
      axisX: { title: 'fecha', valueFormatString: "MMM YY", interval: 2 },
      axisY: { title: 'tasa' },
      legend: {
        verticalAlign: "top",
        fontSize: 16,
        dockInsidePlotArea: true
      },
      data: [
        {
          type: 'line',
          name: 'desempleo',
          connectionNullData: true,
          dataPoints: grafico,
        },
      ]
    });

    chart.render();


    $('#tasa_desempleo').DataTable({
      data: datos,
      columns: [
        { data: 'fecha' }, { data: 'valor' }
      ]
    });

  });



});