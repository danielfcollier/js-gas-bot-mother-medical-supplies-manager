// *****************************************************************************************
function myArrayMin(array){
  let len = array.length;
  let index = [];
  let min = Infinity;
  
  while (len--){
    if (array[len]<min){
      min = array[len];
      index = len;
    }
  }
  return [min, index];
}
// *****************************************************************************************
function formatDate(date,type){
 
  switch (type) {
    case 1:
     return Utilities.formatDate(date, "GMT-03:00", "dd/MM/yyyy");
    case 2:
      return Utilities.formatDate(date, "GMT-03:00", "yyyy-MM-dd");
    default:   
      return Utilities.formatDate(date, "GMT-03:00", "dd/MM/yyyy");
  } 
}
// *****************************************************************************************
function incrementDate(date, amount) {
  let tmpDate = new Date(date);
  tmpDate.setDate(tmpDate.getDate() + amount)
  return tmpDate;
};
// *****************************************************************************************