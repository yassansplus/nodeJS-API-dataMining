       
function  refreshMyChart(detections) {
    
let dataBrute = count(detections); 
console.log(detections.length)
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['nb people', 'nb male', 'nb female', 'age Average'],
        datasets: [{
            label: '# of Votes',
            data: [dataBrute[0], dataBrute[1],dataBrute[2], dataBrute[3]],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


}

function count(detections){
    let total = [];
    let nbMale = 0
    let nbFemale = 0
    let age = 0;
    for(let i =0; i< detections.length; i++){
     
        if(detections[i].gender == "female" ){
            nbFemale++;
        }else{
            nbMale++
        }
        age += detections[i].age;        
    }
    total[0] = detections.length;
    total[1] =nbMale;
    total[2] =nbFemale;
    total[3] =(age/total[0]);
    return total;
}