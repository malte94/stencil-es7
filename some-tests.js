const objectPerson = {
    name: 'Tom',
    age: '30'  
  }
  
  const arrowPerson = (name) => {
    return console.log("Der Name lautet " + name);
  }
  
  console.log(objectPerson);
  
  arrowPerson("Max");