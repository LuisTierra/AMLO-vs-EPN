var url = "http://localhost:5000/api/inflation";
xl =[];
yl = [];
yl2=[];
    //data= [t1]
    d3.json(url).then(function(data){
        var cuenta=Object.keys(data).length;
    for (var i=0; i< cuenta; i++){
        xl.push(data[i].mes)
        yl.push(data[i].variacion_2018)
        yl2.push(data[i].variacion_2019)}
        let EPN ={
            x: xl, 
            y: yl}
        let AMLO ={
            x: xl, 
            y: yl2}
        var layout={
            title: "Inflation",
            xaxis:{
                title: "Month"
            },
            yaxis: {
                title:"Variation Rate"
            }
        };
        Plotly.plot(document.getElementById('plot'), [EPN, AMLO], layout);})