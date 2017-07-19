const data = {
  datasets: [{
    label: 'Random Data',
    fill: false,
    showLine: false,
    borderColor: 'rgba(128, 128, 192, 1)',
    backgroundColor: 'rgba(128, 128, 192, 0.5)',
    data: Array.from(Array(20), () => {return {x: Math.random(), y: Math.random()}})
  }]
}

const options = {
  title: {
    display: true,
    text: 'Example Scatter Chart'
  },
  responsive: false
}

window.onload = function() {
  const canvas = document.getElementById('canvas')
  const scatter = Chart.Scatter(canvas, {
    data: data,
    options: options
  })
}
