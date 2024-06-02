function myFunction(e) {
  // 受信データを表示
  Logger.log("受信データ: " + JSON.stringify(e.namedValues, null, 2));


  // 受信データを取得
  const values = e.values;
  const datetime = values[0];//1列目はタイムスタンプ
  const name = values[1];//2列目は名前
  const email = values[2];//3列目はメールアドレス
  const count = values[3];//4列目は人数
  const time_1 = values[4];//5列目は第1志望の時間
  const time_2 = values[5];//以下略
  const time_3 = values[6];
  const doui = values[7];
  const profession_1 = values[8];
  const profession_2 = values[9];
  const profession_3 = values[10];
  const profession_4 = values[11];
  const profession_5 = values[12];
  const comment = values[13];


  // 実行の対象となった回答が保存されるシートのクラス(Class Sheet)を取得
  const sheet = SpreadsheetApp.getActiveSheet();


  // Sheet クラスの getFormUrl() メソッドでフォームの URL を取得し、フォームを扱うための Form  クラスを取得
  const form = FormApp.openByUrl(sheet.getFormUrl());


  // すべての回答を配列に取得し、回答数を受付番号として保存する(行の番号＝受付番号)
  const res = form.getResponses();
  const index = res.length;
  Logger.log("index = " + index);


  // 同じスプレッドシートの「受付番号」シートを取得．
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const indexSheet = spreadsheet.getSheetByName("受付番号");




  // 受付番号と他の送信データを「受付番号」シートに保存
  const newRecord = [index, datetime, name, email, count, time_1, time_2,time_3,doui,profession_1,profession_2,profession_3,profession_4,profession_5,comment ];
  indexSheet.appendRow(newRecord);


  // 受付確認メールを送信
  const title =  `【${name}様】第2回皐槻祭研究室見学ツアーへの申し込み完了のお知らせ` ;
  const body = `${name}様


※このメールはシステムからの自動返信です。


この度は、第2回皐槻祭「研究室見学ツアー」にお申し込みいただきありがとうございます。
以下の内容で参加受付を完了しております。


受付番号：${index}
代表者名：${name}
メールアドレス：${email}
グループの人数：${count}


希望する時間：
  第1志望 ${time_1}
  第2志望 ${time_2}
  第3志望 ${time_3}


参加者の職業：
代表者 ${profession_1}
2人目 ${profession_2}
3人目 ${profession_3}
4人目 ${profession_4}
5人目 ${profession_5}


ご質問やコメント：
${comment}


1つの時間帯につき、参加者を15~20人程度に制限しております。申込み数がその数を超えた場合には受験生から優先的となります。予めご容赦ください。
参加時間帯の最終決定については後日連絡いたします。


▼変更・キャンセル・お問い合わせはこちら
皐槻祭実行委員会企画部門
メール：satsukisai.event@gmail.com


---------
東京農工大学工学部 皐槻祭実行委員会
広報部門
satsukisai.pr@gmail.com


`;
 //上記の内容をメールで送信する
  GmailApp.sendEmail(email, title, body);
}
