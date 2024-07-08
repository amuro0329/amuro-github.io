const WEBHOOK_URL = "**************************************************" //ウェブフックのURLを入れる

const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // 現在のSpreadSheetを取得
const sheet2 = activeSpreadSheet.getSheetByName('メンション');

function getMonth(month) {
  const sheetName = "タスク管理_" + month + "月";
  return sheetName;
}

function myFunction() {
  const today = new Date;
  var month = today.getMonth() + 1;

  var sheetName = getMonth(month);
  announce(sheetName);

  sheetName = getMonth(month % 12 + 1);
  announce(sheetName);
}

function announce(Nameofsheet) {
  //アクティブシートを取得
  const sheet = activeSpreadSheet.getSheetByName(Nameofsheet);

  //データがある最終行を取得
  var lastRow = sheet.getLastRow();

  const date = new Date();
  const days = 1000 * 60 * 60 * 24;

  for (let i = 2; i < lastRow + 1; i++) {
    var colData = sheet.getRange(i, 8).getValue();
    var situation = sheet.getRange(i, 9).getValue();

    if (!(colData instanceof Date)) {
      continue; // colData が Date でない場合、スキップ
    }

    //現在時刻と期限の差をdiffとする
    var diff = colData.getTime() - date.getTime();
    var diffWeek = colData.getDate() - date.getDate();

    //期限まで残り1日以内または一週間前で、状態が完了ではない場合に実施
    if (diff < days || diffWeek == 7) {
      if (situation != "完了") {
        var workId = sheet.getRange(i, 1).getValue();
        const genre = sheet.getRange(i, 2).getValue();
        const name = sheet.getRange(i, 3).getValue();
        const content = sheet.getRange(i, 5).getValue();
        const remarks = sheet.getRange(i, 6).getValue();
        //メンションのIDをシート2から探す
        for (let j = 1; j < 50; j++) {
          var MentionName = sheet2.getRange(j, 1).getValue();
          if (name == MentionName) {
            var mention = sheet2.getRange(j, 2).getValue();
            break;
          } else {
            var mention = "error";
          }
        }
        //期限をMM/dd HH:mm形式で表示
        var deadline = Utilities.formatDate(colData, "JST", "MM/dd HH:mm");

        if (diff < 0) {
          var alert = "**期限を過ぎています。必ず提出してください**";
        } else {
          var alert = "期限が迫っています。";
          if (diffWeek == 7) {
            alert += "期限まであと**一週間**です。";
          } else if (diff < days) {
            alert += "**今日中に**提出してください。";
          }
        }

        //Discordで送信する内容
        let payload = {
          "content": "------------\n" + mention + "\n作業ID:" + workId + "\n期限:" + deadline + "\nジャンル:" + genre + "\n担当者:" + name + "\n内容:" + content + "\n備考:" + remarks + "\n" + alert + "\n"
        };

        let options =
        {
          "method": "post",
          "payload": payload
        };

        UrlFetchApp.fetch(WEBHOOK_URL, options);
      }
    }
  }
}
