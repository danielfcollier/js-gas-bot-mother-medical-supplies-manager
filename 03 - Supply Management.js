// *****************************************************************************************
// >>> Simple Medical Supplies Manager
// *****************************************************************************************
function manageMedicalSupplies() {
  let endingSupplies;

  // Initialization
  let dataArray = dataHandling_loadArray();
  Logger.log("Yesterday:")
  Logger.log(dataArray)

  // Action
  dataArray = dataArray.map(supply_applyManagementRules);
  Logger.log("Today:")
  Logger.log(dataArray);

  // Storing
  dataHandling_updateSheet(dataArray);

  // Notification
  let isSupplyEnding = supply_verifyStatus(dataArray);
  if (isSupplyEnding) {
    endingSupplies = supply_getOnesEnding(dataArray);
    notification_notifySons(endingSupplies);
  }

  Logger.log("Data updated!")
  return true;
}
// *****************************************************************************************
function supply_verifyStatus(dataArray) {
  let numberOfMedicalSuppliesEnding = dataArray.reduce($getNumberOfMedicalSuppliesEnding, 0);
  return numberOfMedicalSuppliesEnding > 0;

  //
  function $getNumberOfMedicalSuppliesEnding(daysLeft_total, dataRow) {
    let daysLeft = supply_getDaysLeft(dataRow);
    return (daysLeft <= MINIUM_DESIRED_DAYS_LEFT) ? daysLeft_total = daysLeft_total + 1 : daysLeft_total;
  }
}
// *****************************************************************************************
function supply_getOnesEnding(dataArray) {
  return dataArray.filter(dataRow => supply_getDaysLeft(dataRow) <= MINIUM_DESIRED_DAYS_LEFT);
}
// *****************************************************************************************
function supply_applyManagementRules(dataRow) {
  let [dailyDose, quantity] = supply_getParameters(dataRow);
  dataRow[3] = (quantity - dailyDose) >= 0 ? quantity - dailyDose : 0;
  dataRow[6] = incrementDate(new Date(), supply_getDaysLeft(dataRow));
  return dataRow;
}
// *****************************************************************************************
function supply_getParameters(dataRow) {
  let dailyDose = dataRow[2];
  let quantity = dataRow[3];
  return [dailyDose, quantity];
}
// *****************************************************************************************
function supply_getDaysLeft(dataRow) {
  let [dailyDose, quantity] = supply_getParameters(dataRow);
  let daysLeft = Math.trunc(quantity / dailyDose);
  return daysLeft;
}
// *****************************************************************************************