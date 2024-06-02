function displayNames() {
    var q1 = document.getElementById("q1").value;
    var q2 = document.getElementById("q2").value;
    var q3 = document.getElementById("q3").value;
    var q4 = document.getElementById("q4").value;
    var q5 = document.getElementById("q5").value;
if (document.getElementById('q1').value == "")  {
    var q1 = "①①①①"
}
if (document.getElementById('q2').value == "" )  {
    var q2 = "②②②"
}
if (document.getElementById('q3').value == "" )  {
    var q3 = "③③"
}
if (document.getElementById('q4').value == "" )  {
    var q4 = "④④"
}
if (document.getElementById('q5').value == "" )  {
    var q5 = "⑤⑤"
}
    document.getElementById("answer").innerHTML ='「' + q1 + '」したら「' + q2 +'」になる「' + q3 +'」の「'+ q4 +'」を「'+q5+'」';
}
