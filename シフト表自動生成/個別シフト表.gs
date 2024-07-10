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
/**
セルが結合されていると一番上にしかデータがなく、ほかはすべて空っぽ("")。
結合されたセルに一番上のセルと同じ値を代入するために、
業務の値を一時的に値を保管しておき(gyoumu_save)、もし一番上にない結合セル("")があった場合には
gyoumu_saveをgyoumuに代入する。
**/

//もし、空欄のセル(結合されていて空欄になっている)があった場合は保管しておいた値を使用する。
      if (gyoumu == "") {
        gyoumu = gyoumu_save;
      } else {
        gyoumu_save = gyoumu;
//空欄のセル出ない場合はgyoumu_saveに値を保管しておく。
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
