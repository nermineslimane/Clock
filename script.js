function httpGet (theUrl) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', theUrl, false) // false for synchronous request
  xmlHttp.send(null)
  return xmlHttp.responseText
}

function currentTime () {
  var date = new Date() /* creating object of Date class */
  var hour = date.getHours()
  var min = date.getMinutes()
  var sec = date.getSeconds()
  hour = updateTime(hour)
  min = updateTime(min)
  sec = updateTime(sec)

  updateBackround(hour)
  document.getElementById('clock').innerText =
    hour + ' : ' + min + ' : ' + sec /* adding time to the div */
  var t = setTimeout(function () {
    currentTime()
  }, 1000) /* setting timer */
}

function updateTime (k) {
  if (k < 10) {
    return '0' + k
  } else {
    return k
  }
}
function updateBackround (hour) {
  lat = 37.2767579
  lng = 9.8641609
  navigator.geolocation.getCurrentPosition(function (p) {
    lat = p.coords.latitude
    lng = p.coords.longitude
  })

  data = httpGet(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
  )
  obj = JSON.parse(data)
  console.log(obj.results.sunrise)
  sunrise = new Date(obj.results.sunrise).getHours() - 1
  sunset = new Date(obj.results.sunset).getHours() - 1
  if (hour > sunrise && hour < sunset) {
    document
      .getElementsByTagName('body')[0]
      .setAttribute('class', 'body-morning')
  } else {
    document.getElementsByTagName('body')[0].setAttribute('class', 'body-night')
  }
}
currentTime() /* calling currentTime() function to initiate the process */
