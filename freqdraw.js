// windowが読み込まれてから実行
window.onload = function(){
    back();//背景
    db();//デシベル・・・縦軸
    par();//周波数・・・横軸
}

//　背景
function back(){
    var canvas = document.getElementById('mainCanvas');
    var ctx = canvas.getContext('2d');

    //　破線
    ctx.setLineDash([1,9]);//点の数
    ctx.save();//点線のため

    //　背景
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
    ctx.closePath();

    //　枠線
    //　縦
    ctx.setLineDash([]);//直線にするため
    ctx.lineWidth = 8;//線の太さ
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(1, 0);//線が傾く
    ctx.lineTo(0, mainCanvas.height);//座標点同士を繋いで線を引く
    ctx.closePath();
    ctx.stroke();
    //　横
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height-1);
    ctx.lineTo(mainCanvas.width, mainCanvas.height-1);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();//細字になる．弱くなる

    //　横のグリッド

    //　80db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*2);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*2);
    ctx.closePath();
    ctx.stroke();

    //　70db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*3);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*3);
    ctx.closePath();
    ctx.stroke();

    //　60db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*4);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*4);
    ctx.closePath();
    ctx.stroke();

    //　50db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*5.5);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*5.5);
    ctx.closePath();
    ctx.stroke();




    //1000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2-218, 0);
    ctx.lineTo(mainCanvas.width/2-218, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //2000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2-37, 0);
    ctx.lineTo(mainCanvas.width/2-37, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //3000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2+145, 0);
    ctx.lineTo(mainCanvas.width/2+145, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //4000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2+327, 0);
    ctx.lineTo(mainCanvas.width/2+327, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();
}

// 周波数表記
function par(){
    var canvas2 = document.getElementById('heightCanvas');
    var ctx2 = canvas2.getContext('2d');
    ctx2.font = "22px Helvetica";
    ctx2.fillText('0',20, 17, 100);
    // ctx2.fillText('250',70, 17, 100);
    // ctx2.fillText('500',110, 17, 100);
    ctx2.fillText('5msec',190, 17, 100);
    ctx2.fillText('10msec',370, 17, 100);
    ctx2.fillText('15msec',555, 17, 100);
    ctx2.fillText('20msec',740, 17, 100);
    ///ctx2.fillText('(msec)',800, 17, 100);//座標指定
}

// dB表記
function db(){
    var canvas3 = document.getElementById('widthCanvas');
    var ctx3 = canvas3.getContext('2d');
    ctx3.font = "22px Helvetica";
    //ctx3.fillText('(Hz)',0, 20, 100);
    ctx3.fillText(' 1.0',1, 50, 100);
    ctx3.fillText(' 0',10, 190, 100);
    ctx3.fillText(' -1.0',-5, 320, 100);
}

//　周波数領域の描画
function freqDraw(){
    timerId = setInterval(function(){
    var canvas = document.getElementById('mainCanvas');
    var canvasCtx = canvas.getContext('2d');

    //*************************************************************
    panner.connect(analyser);
    var times = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(times);
    //************************************************************

    //　30db~100db
    var min = 30;
    var max = 100;
    var range = max - min;

    //　スペクトラムのデータを取得
    var spectrum = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(spectrum);

    //　Canvasをクリア
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    //　背景
    back();
    //　直線
    canvasCtx.setLineDash([]);
    //　描画
    canvasCtx.beginPath();
    for(var i=0,len = times.length;i<len;i++){

      //********************************************************
      var x = (i/len)*canvas.width;
      var y = (1 - (times[i] / 255)) * canvas.height;
      //*********************************************************


        // // x座標の算出 (元波形の1/8,~2500Hz)
        // var x = (i / len)*5*canvas.width;
        // // y座標の算出
        // var y = (- 1 * ((spectrum[i]-analyser.maxDecibels)/range))*canvas.height;

        //(i===0)?canvasCtx.moveTo(x+1,y):canvasCtx.lineTo(x+1,y);
        (i===0)?canvasCtx.moveTo(x,y):canvasCtx.lineTo(x,y);

    }
    canvasCtx.strokeStyle = "#000000";
    canvasCtx.stroke();
  },130);
}
//　描画開始
//function start(){ freqDraw(); }
//　一時停止
//function stop(){ clearInterval(timerId); }
