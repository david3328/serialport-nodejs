const socket = io();

socket.on('arduino:data',data=>{
  document.getElementById('lectura').innerHTML = data;
})