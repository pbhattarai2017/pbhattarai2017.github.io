let myLocalhostButton = document.querySelector('#my-localhost');
let ssid = document.querySelector('#ssid');
let ipaddress = document.querySelector('#ipaddress');

myLocalhostButton.addEventListener('click', function (e) {
  fetchLocalhostInfo();
  console.log('run f');
});

async function fetchLocalhostInfo() {
  let response = await fetch(
    'https://mylocalhost-17223-default-rtdb.firebaseio.com/localhost.json',
    {
      mode: 'cors',
      method: 'GET',
    }
  );

  if (response.status == 200) {
    let body = await response.json();
    console.log(body);
  } else {
    console.log('Error occured');
  }
}
