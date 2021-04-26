// *****************************************************************************************
function notification_sendEmailForSon(son, emailBody) {
  MailApp.sendEmail(son.email, emailSubject, '', { htmlBody: emailBody.replace("{name}", son.name) });
}
// *****************************************************************************************
function notification_notifySons(endingSupplies) {
  if (notification_isNotPossibleToSendEmails()) {
    return false;
  }

  let endingSuppliesMessage = endingSupplies.reduce(notification_buildEmailBody, "");

  let emailBody = emailTemplatePart01 + endingSuppliesMessage + emailTemplatePart02;

  sons.forEach(son => notification_sendEmailForSon(son, emailBody));
}
// *****************************************************************************************
function notification_buildEmailBody(messageWithEndingSupplies, medicalSupplyData) {
  let specialReceiptMessage = medicalSupplyData[7] === "Sim" ? " ATENÇÃO: precisa de receita especial!" : "";

  return messageWithEndingSupplies + " - " + medicalSupplyData[0] + `: acaba em
` + supply_getDaysLeft(medicalSupplyData) + " dia(s)" + specialReceiptMessage + `<br>`;
}
// *****************************************************************************************
function notification_isNotPossibleToSendEmails() {
  let quotaLeft = MailApp.getRemainingDailyQuota();

  if (quotaLeft < sons.lenght) {
    Logger.log("Ops... bad day, check out better your daily quotas!")
    return true;
  }

  return false;
}
// *****************************************************************************************