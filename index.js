//Query selector or javascript linking to html o=id or classes;
myDiv = document.getElementById("tester");
let header = document.querySelector("text");
let dis = document.getElementById("dis");
let subdis = document.getElementById("subdis");
let subdisz = document.getElementById("subdisz");

//dimensions xDimension (x-points) && yDimension(y-points);
let xDimension = [];
let yDimension = [];

function getInputValue() {


  //fetch bitstream
  let inputVal = document.getElementById("fname").value;
  let inputVal1=inputVal;
  //fetch type of scheme
  var e = document.getElementById("scheme");
  var value = e.value;
  // type of scheme according to int;
  let type = parseInt(value);



  // type 1 ->unipolar
  //type 2: ->polar nrl
  //type 3: ->polar nri
  // type 4:manchester
  //type 5: differential  machester
  // type 6: ami without scrabling
// type 7:ami 8 zero
//type 8:ami 4 zero
  // <---- Setting amplitude min and max ----->
  let maxi;
  let mini;
  
    if (type === 1) {
    maxi = 5;
    mini = 0;
  } else {
    maxi = 5;
    mini = -5;
  }

  //  checking validness of string
  if (inputVal.length == 0) {
    alert("No length of bitstream");
    return;
  } else {
    let check = false;
    for (let i = 0; i < inputVal.length; i++) {
      if (inputVal[i] == "0" || inputVal[i] === "1" || inputVal[i] === " ") {
        continue;
      } else {
        alert("No valid string");
      return;
      }
    }
  }
  // checking validness of string end;if passed then go to below section.


////AMI HDB3

  if(type===8){
    let count=0;
    let code1="1002";
    let code2="0002"
    let start=0;
    let count1=0;
    // replacing consecative zeroes with code;
    for(let i=0;i<inputVal.length;i++){
      if(inputVal[i]!=='0')count1++;
    if(inputVal[i]==='0'){
    count++;
    }
    else{
count=0;

    }
    if(count===4){
      start=i;
      let req=(inputVal.substring(start-3,start+1));
      count=0;
      if(count1%2===0){
        inputVal=inputVal.replace(req,code1);
        count1+=2;

      }
  
    else{
      count1+=1;
      inputVal=inputVal.replace(req,code2);
    }
     }}
    
    console.log(inputVal);
    
    
    let X=0.0;
    let prev=maxi;
    let flag=false;
     for(let i=0;i<inputVal.length;i++){
    if(inputVal[i]==='1'){
      if (flag === false) {
        xDimension.push(X);
        yDimension.push(prev);
        X += 1;
        xDimension.push(X);
        yDimension.push(prev);
        flag = true;
      }
    
      else {
        prev = -prev;
        xDimension.push(X);
        yDimension.push(prev);
        X += 1;
        xDimension.push(X);
        yDimension.push(prev);
      }
    
    
    }
    else if(inputVal[i]==='2'){
      xDimension.push(X);
      yDimension.push(prev);
      X += 1;
      xDimension.push(X);
      yDimension.push(prev);
      flag=true;
    }
     else {
            xDimension.push(X);
            yDimension.push(0);
            X += 1;
            xDimension.push(X);
            yDimension.push(0);
          }
    
    
    
     }
    
    
    
    
    
    
    }
    
//AMI B8ZS
if(type===7){
let count=0;
let code="00021021";
let start=0;
// replacing consecative zeroes with code;
for(let i=0;i<inputVal.length;i++){
if(inputVal[i]==='0'){
count++;
}
if(count===8){
  start=i;
  let req=(inputVal.substring(start-7,start+1));
  count=0;
inputVal=inputVal.replace(req,code);
 }}




let X=0.0;
let prev=maxi;
let flag=false;
 for(let i=0;i<inputVal.length;i++){
if(inputVal[i]==='1'){
  if (flag === false) {
    xDimension.push(X);
    yDimension.push(prev);
    X += 1;
    xDimension.push(X);
    yDimension.push(prev);
    flag = true;
  }

  else {
    prev = -prev;
    xDimension.push(X);
    yDimension.push(prev);
    X += 1;
    xDimension.push(X);
    yDimension.push(prev);
  }


}
else if(inputVal[i]==='2'){
  xDimension.push(X);
  yDimension.push(prev);
  X += 1;
  xDimension.push(X);
  yDimension.push(prev);
  flag=true;
}
 else {
        xDimension.push(X);
        yDimension.push(0);
        X += 1;
        xDimension.push(X);
        yDimension.push(0);
      }



 }






}








  //  Ami without scrambling
  if (type === 6) {
    // stroring prev value;
    let prev = maxi;
    let flag = false;
    let X = 0.0; // xaxis point;
    for (let i = 0; i < inputVal.length; i++) {
      // ploting points for 1 and 0 in x and y axis;
      if (inputVal[i] === "1") {
        if (flag === false) {
          xDimension.push(X);
          yDimension.push(prev);
          X += 1;
          xDimension.push(X);
          yDimension.push(prev);
          flag = true;
        } else {
          prev = -prev;
          xDimension.push(X);
          yDimension.push(prev);
          X += 1;
          xDimension.push(X);
          yDimension.push(prev);
        }
      } else {
        xDimension.push(X);
        yDimension.push(0);
        X += 1;
        xDimension.push(X);
        yDimension.push(0);
      }
    }
    xDimension.push(X);
    yDimension.push(0);
  }

  // end of ami without scrambling

  // Differintial manchester plotting points
  if (type === 5) {
    let X = 0.0;
    let flag = false;
    let prev;
    for (let i = 0; i < inputVal.length; i++) {
      if (inputVal[i] === "1") {
        if (flag === false) {
          // handling first zero or 1;
          xDimension.push(X);
          yDimension.push(maxi);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(maxi);
          xDimension.push(X);
          yDimension.push(mini);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(mini);
          prev = mini;
          flag = true;
        } else {
          xDimension.push(X);
          yDimension.push(prev);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(prev);

          prev = -prev;
          xDimension.push(X);
          yDimension.push(prev);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(prev);
        }
      } else {
        if (flag === false) {
          xDimension.push(X);
          yDimension.push(mini);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(mini);
          xDimension.push(X);
          yDimension.push(maxi);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(maxi);
          prev = maxi;
          flag = true;
        } else {
          prev = -prev;
          xDimension.push(X);
          yDimension.push(prev);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(prev);

          prev = -prev;
          xDimension.push(X);
          yDimension.push(prev);
          X += 0.5;
          xDimension.push(X);
          yDimension.push(prev);
        }
      }
    }
    xDimension.push(X);
    yDimension.push(0);
  }

  //  end of Differintial manchester

  //Manchester Encoding (Thomson); plotting points
  if (type === 4) {
    let X = 0.0;
    for (let i = 0; i < inputVal.length; i++) {
      if (inputVal[i] == "1") {
        xDimension.push(X);
        yDimension.push(maxi);
        X += 0.5;
        xDimension.push(X);
        yDimension.push(maxi);
        xDimension.push(X);
        yDimension.push(mini);
        X += 0.5;
        xDimension.push(X);
        yDimension.push(mini);
      } else {
        xDimension.push(X);
        yDimension.push(mini);
        X += 0.5;
        xDimension.push(X);
        yDimension.push(mini);
        xDimension.push(X);
        yDimension.push(maxi);
        X += 0.5;
        xDimension.push(X);
        yDimension.push(maxi);
      }
    }
    xDimension.push(X);
    yDimension.push(0);
  }

  // End of Manchester Encoding

  // polar Nri

  if (type === 3) {
    let X = 0.0;
    let prev=mini;
    if(inputVal[0]==='1'){
      xDimension.push(0);
      yDimension.push(prev);
    }
   
   

    for (let i = 0; i < inputVal.length; i++) {
if(inputVal[i]==='1'){

  prev=(-prev);
  xDimension.push(X);
  yDimension.push(prev);
  X+=1;
  xDimension.push(X);
  yDimension.push(prev);



                }
else {

xDimension.push(X);
yDimension.push(prev);
X+=1;
xDimension.push(X);
yDimension.push(prev);
} }
  }

  // end polar nri

  // Polar Encoding ploting points;

  if (type === 2) {
    let X = 0.0;
    for (let i = 0; i < inputVal.length; i++) {
      if (inputVal[i] == "1") {
        xDimension.push(X);
        yDimension.push(maxi);
        X += 1;
        xDimension.push(X);
        yDimension.push(maxi);
      } else {
        xDimension.push(X);
        yDimension.push(mini);
        X += 1;
        xDimension.push(X);
        yDimension.push(mini);
      }
    }
  }

  // Polar Encoding ploting points end ;
 // Unipolar plotting points
// 
  if (type === 1) {
    let X = 0.0;
    for (let i = 0; i < inputVal.length; i++) {
      if (inputVal[i] == "1") {
        xDimension.push(X);
        yDimension.push(maxi);
        X += 1;
        xDimension.push(X);
        yDimension.push(maxi);
      } else {
        xDimension.push(X);
        yDimension.push(0);
        X += 1;
        xDimension.push(X);
        yDimension.push(0);
      }
    }
  }
  // Unipolar plotting points end;

  let check = false;
  let rat;
  var nrzi = -5;

  // Competitive Part




  // Function to reverse a string ;
  function reverseString(str) {
    const arrayStrings = str.split("");
    const reverseArray = arrayStrings.reverse();
    const joinArray = reverseArray.join("");
    return joinArray;
  }
// function of longest common subsequence for string and its reverse;
  function LCS(S) {
    let n = S.length;
    let s1 = S;
    let s2 = S.split("").reverse().join("");

    let dp = new Array(n + 1);
    for (let i = 0; i < dp.length; i++) {
      dp[i] = new Array(n + 1);
    }

    for (let i = 0; i < n + 1; i++) {
      for (let j = 0; j < n + 1; j++) {
        if (i == 0 || j == 0) {
          dp[i][j] = 0;
        }
      }
    }

    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        if (s1[i - 1] == s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    //return dp[n][m];
   

    let ans = "";
    let i = n;
    let j = n;
    while (i > 0 && j > 0) {
      if (s1[i - 1] === s2[j - 1]) {
        ans += s1[i - 1];
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    ans = reverseString(ans);
    return ans;
  }

  function longestPalindromicSubsequence(seq) {
    let n = seq.length;

    let word = LCS(seq);
    // console.log(word);
    return word;
  }
  //console.log(longestPalindromicSubsequence(inputVal));
  subdis.innerHTML =
    "Longest Palindromic Subsequence is " +
    " " +
    longestPalindromicSubsequence(inputVal1);




    ///Manachers Algorithm
  var longestPalindrome = function (s) {
    if (!s || !s.length) return "";
    let str = "#" + s.split("").join("#") + "#";
    let C = 0,
      max = 0,
      P = new Array(str.length).fill(0);

    for (let i = 0; i < str.length; i++) {
      if (i > max) {
        P[i] = 1;
      } else {
        let j = C - i + C < 0 ? 0 : C - i + C;
        P[i] = Math.min(P[j], max - i < 0 ? 1 : max - i);
      }
      let lo = i - P[i],
        hi = i + P[i];
      while (lo >= 0 && hi < str.length && str[lo] === str[hi]) {
        lo--, hi++;
      }
      P[i] = hi - i;

      if (i + P[i] > max) {
        max = i + P[i];
        C = i;
      }
    }
    let len = Math.max(...P);
    let index = P.indexOf(len);
    let res = str.substring(index - len + 1, index + len);
    return res.split("#").join("");
  };

  dis.innerHTML ="longest Palindromic Substring is is : " + longestPalindrome(inputVal1);

// longest streak of zeroes.
    var longestStreakofZeroes= function (s) {

      let count=0;
      let start=0;
      let maximum=-1;
      let f=false;
      for(let i=0;i<s.length;i++){
          if(s[i]==='0'){
              count++;
              f=true;
          }
          else{
              count=0;
          }
          if(count>maximum){
              maximum=count;
              start=i;
          }
      }
      let res=[start,maximum];
return res;

    }
let z=longestStreakofZeroes(inputVal);

let first=z[0];
let second=z[1];
if(second==='-1'){
  subdisz.innerHTML ="longest streak of zeroesis is : " + 0;
}
else{

  let res=inputVal.substring(first-second+1,first+1);
  subdisz.innerHTML ="longest streak  Substring is is : " + second +" (" +res+") ";
}




}

x = 0;



// style of graph part PLoty .js
function trace() {
  var trace1 = {
    x: xDimension,
    y: yDimension,
    type: "scatter",
    line: { width: 5, color: "white" },
  };

  var data = [trace1];
  var layout = {
    plot_bgcolor: "#1c1c1c",
    paper_bgcolor: "#FFF3",

    xaxis: { range: [0, 20] },
    yaxis: { range: [-6, 6] },
    font: {
      family: "Courier New, monospace",
      size: 18,
      color: "white",
    },
    xaxis: {
      showgrid: true,
      zeroline: true,
      showline: true,
      //mirror: 'ticks',
      gridcolor: "#bdbdbd",
      gridwidth: 1,
      zerolinecolor: "green",
      zerolinewidth: 1,
      linecolor: "#636363",
      linewidth: 1,
    },
    yaxis: {
      zerolinecolor: "green",
    },
  };
  Plotly.newPlot("tester", data, layout);
}
var trace1 = {
  x: xDimension,
  y: yDimension,
  type: "scatter",
  line: { width: 5, color: "green" },
};

var data = [trace1];
var layout = {
  plot_bgcolor: "#1c1c1c",
  paper_bgcolor: "#FFF3",
  xaxis: { range: [0, 100] },
  yaxis: { range: [-6, 6] },
  font: {
    family: "Courier New, monospace",
    size: 18,
    color: "white",
  },
  xaxis: {
    showgrid: true,
    gridcolor: "#bdbdbd",
    gridwidth: 1,
    zerolinewidth: 1,
    linecolor: "#636363",
    linewidth: 1,
  },
};
Plotly.newPlot("tester", data, layout);
