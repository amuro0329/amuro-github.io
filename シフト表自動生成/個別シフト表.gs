const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // 現在のSpreadSheetを取得
const sheet = activeSpreadSheet.getSheetByName('コピー元');
const sheet2 = activeSpreadSheet.getSheetByName('コピー先');

function myFunction() {
  var lastRow = sheet.getLastRow();
  let gyoumu_save = sheet.getRange(3, 1).getValue();
  var lastRow_sheet2 = sheet2.getLastRow();

  for (let j = 0; j < 8; j++) {
    let time = sheet.getRange(2, j + 3).getValue();
    for (let i = 3; i < lastRow + 1; i++) {
      var gyoumu = sheet.getRange(i, 1).getValue();
      var name = sheet.getRange(i, j + 3).getValue();

      if (name == "" || gyoumu == "業務") {
        continue;
      }

      if (gyoumu == "") {
        gyoumu = gyoumu_save;
      } else {
        gyoumu_save = gyoumu;
      }

      for (let k = 2; k < lastRow_sheet2+1; k++) {
        let NameofShift = sheet2.getRange(k, 1).getValue();
        if (name == NameofShift) {
          sheet2.getRange(k, j + 5).setValue(gyoumu);
          break;
        }
      }

    }
  }
}
