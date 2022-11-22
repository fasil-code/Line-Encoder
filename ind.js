let inputVa = document.getElementById("fname");
let fl=document.getElementById('ut1');
function randomArray() {
    let ans="";
    for (let i = 1; i <= 20; i++) {
        ans+=(Math.floor((Math.random() * 1.99)));
    }
    return ans;
  }
  function zeroPositon() {
    let start = (Math.floor(Math.random() * 4.99));
    return start;
  }
  function generate(){

    let start=parseInt(zeroPositon());
    var val=randomArray();
    console.log(typeof(val));
    console.log(x);
    console.log(val);
    console.log(typeof(x));
    let end=parseInt(fl.value);
    console.log(end);
    let req=(val.substring(start,start+end+1));
let re="";
for(let i=0;i<end;i++){
    re+='0';
}
val=val.replace(req,re);

   
    console.log(val);
    inputVa.value=val;
  }
