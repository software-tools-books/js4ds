const border = 'rgb(128, 128, 192)'
const background = Chart.helpers.color(border).alpha(0.5).rgbString()

const randPercent = () => {
  return (Math.random() * 2) - 1
}

const data = {
  datasets: [{
    label: 'Random Data',
    fill: false,
    showLine: false,
    borderColor: border,
    backgroundColor: background,
    data: [{
      x: randPercent(),
      y: randPercent(),
    }, {
      x: randPercent(),
      y: randPercent(),
    }, {
      x: randPercent(),
      y: randPercent(),
    }, {
      x: randPercent(),
      y: randPercent(),
    }, {
      x: randPercent(),
      y: randPercent(),
    }, {
      x: randPercent(),
      y: randPercent(),
    }, {
      x: randPercent(),
      y: randPercent(),
    }]
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
