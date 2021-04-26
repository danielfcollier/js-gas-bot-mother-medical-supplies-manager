// *****************************************************************************************
// >>> Configurations
// *****************************************************************************************
class Son {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const son01 = new Son("Daniel", "danielfcollier@gmail.com");
const son02 = new Son("André", "andrecollier@gmail.com");

const sons = [son01, son02];

const sheetName = "Remédios";
const sheetRange = "A2:H";

const MINIUM_DESIRED_DAYS_LEFT = 10;

// *****************************************************************************************
// >>> Simple Medical Supplies Manager
// *****************************************************************************************
function manageMedicalSupplies() {
  let dataArray = loadDataArray();
  
  let updatedDataArray = dataArray.map(applyManagementRules);

  updateSheet(updatedDataArray);


  let isSupplyEnding = verifySupplyStatus(updatedDataArray);

  if (isSupplyEnding) {
    let endingSupplies = getEndingSupplies(updatedDataArray);
    notifySons(endingSupplies);
  }

  Logger.log("Data updated!")
  return true;
}
// *****************************************************************************************
function loadDataArray() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    .getRange(sheetRange + getLastRow(sheetRange)).getValues();
}
// *****************************************************************************************
function applyManagementRules(medicalSupplyData) {
  let [dailyDose, quantity] = medicalSupplyParameters(medicalSupplyData);
  medicalSupplyData[3] = (quantity - dailyDose) >= 0 ? quantity - dailyDose : 0;
  medicalSupplyData[6] = incrementDate(new Date(), getMedicalSupplyDaysLeft(medicalSupplyData));
  return medicalSupplyData;
}
// *****************************************************************************************
function medicalSupplyParameters(medicalSupplyData) {
  let dailyDose = medicalSupplyData[2];
  let quantity = medicalSupplyData[3];
  return [dailyDose, quantity];
}
// *****************************************************************************************
function verifySupplyStatus(updatedDataArray) {
  let numberOfMedicalSuppliesEnding = updatedDataArray.reduce(function (total = 0, medicalSupplyData) {
    let daysLeft = getMedicalSupplyDaysLeft(medicalSupplyData);
    return (daysLeft - 7) <= MINIUM_DESIRED_DAYS_LEFT ? total = +1 : total;
  });
  return numberOfMedicalSuppliesEnding > 0;
}
// *****************************************************************************************
function getMedicalSupplyDaysLeft(medicalSupplyData) {
  let [dailyDose, quantity] = medicalSupplyParameters(medicalSupplyData);
  let daysLeft = Math.trunc(quantity / dailyDose);
  return daysLeft;
}
// *****************************************************************************************
function getEndingSupplies(updatedDataArray) {
  return updatedDataArray.filter(medicalSupplyData => getMedicalSupplyDaysLeft(medicalSupplyData) <= MINIUM_DESIRED_DAYS_LEFT);
}
// *****************************************************************************************
function notifySons(endingSupplies) {
  if (isNotPossibleToSendEmails()) {
    return false;
  }

  let endingSuppliesMessage = endingSupplies.reduce(buildEmailBody, "");

  let emailBody = emailTemplatePart01 + endingSuppliesMessage + emailTemplatePart02;

  sons.forEach(son => sendEmailForSon(son, emailBody));
}
// *****************************************************************************************
function sendEmailForSon(son, emailBody) {
  MailApp.sendEmail(son.email, emailSubject, '', { htmlBody: emailBody.replace("{name}", son.name) });
}
// *****************************************************************************************
function isNotPossibleToSendEmails() {
  let quotaLeft = MailApp.getRemainingDailyQuota();

  if (quotaLeft < sons.lenght) {
    Logger.log("Ops... bad day, check out better your daily quotas!")
    return true;
  }

  return false;
}
// *****************************************************************************************
function buildEmailBody(messageWithEndingSupplies, medicalSupplyData) {
  let specialReceiptMessage = medicalSupplyData[7] === "Sim" ? " ATENÇÃO: precisa de receita especial!" : "";

  return messageWithEndingSupplies + " - " + medicalSupplyData[0] + `: acaba em
` + getMedicalSupplyDaysLeft(medicalSupplyData) + " dia(s)" + specialReceiptMessage + `<br>`;
}
// *****************************************************************************************
function updateSheet(dataArray) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    .getRange(sheetRange + getLastRow(sheetRange)).setValues(dataArray);
  return true;
}
// *****************************************************************************************
function incrementDate(date, amount) {
  let tmpDate = new Date(date);
  tmpDate.setDate(tmpDate.getDate() + amount)
  return tmpDate;
};
// *****************************************************************************************