const currentDate = Date.now() //1717529357899

// const today = (new Date(Date.now())).toISOString().replace('T', ' '); // 2024-06-04 19:49:52.221Z
// const formattedDate = today.split('.')[0]; //2024-06-04 19:56:02

const today = (new Date(Date.now())).toISOString().split('.')[0]; // 
const formattedDate = today.split(':').slice(0, -1).join(':')
// console.log(today)
console.log(formattedDate); 

// console.log(typeof newDate.toISOString()); 