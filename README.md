# Medical Supplies Manager for My Mother

This is a live script to help me and my brother to be ahead of the current medicins stocks of our mother.

It runs daily to update her medical supplies (based on the given rules, e.g., 1 or 2 daily). 

If any medicin is ending in the next 10 days, the script sends an email message to warn us to buy her medicins.

## Script 

The main routine is:

```javascript
function manageMedicalSupplies() {
  let endingSupplies;

  // Initialization
  let dataArray = dataHandling_loadArray();

  // Action
  dataArray = dataArray.map(supply_applyManagementRules);

  // Storing
  dataHandling_updateSheet(dataArray);

  // Notification
  let isSupplyEnding = supply_verifyStatus(dataArray);
  if (isSupplyEnding) {
    endingSupplies = supply_getOnesEnding(dataArray);
    notification_notifySons(endingSupplies);
  }
}
```

The working spreadsheet is not supplied here, because it is a live system for us. 

Emails notifications are build up with .reduce() to get the variable summary of ending supplies. More details can be found at [05 - Notification.js](https://github.com/danielfcollier/js-gas-mother-medical-supplies-manager/blob/master/05%20-%20Notification.js)

