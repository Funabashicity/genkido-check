//選択式の設問群
const quiz =[
  {
    id:1,
    score:2,
    question : "Q1: バスや電車を使って１人で外出できますか",
    answers : [
    "はい",
    "いいえ",
  ],
  correct:"いいえ",
  },{
    id:2,
    score:3,
    question : "Q2: 日用品の買い物ができますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"いいえ",
  },{
    id:3,
    score:2,
    question : "Q3: 預貯金の出し入れが自分でできますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"いいえ",
  },{
    id:4,
    score:3,
    question : "Q4: 階段を手すりや壁を伝わらずに登っていますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"いいえ",
  },{
    id:5,
    score:2,
    question : "Q5: 椅子に座った状態から何もつかまらずに立ち上がっていますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"いいえ",
  },{
    id:6,
    score:1,
    question : "Q6: 15分くらい続けて歩いていますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"いいえ",  
  },{
    id:7,
    score:2,
    question : "Q7: この１年間に転んだことがありますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"はい",
  },{
    id:8,
    score:2,
    question : "Q8: 転倒に対する不安は大きいですか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"はい",
  },{
    id:9,
    score:3,
    question : "Q9: 昨年と比べて外出の回数が減っていますか",
    answers : [
      "はい",
      "いいえ",
    ],
    correct:"はい",
  },{
    id:10,
    score:1,
    question : "Q10: 性別を教えてください",
    answers : [
      "男性",
      "女性",
    ],
    correct:"男性",
  }
]

//身長・体重の設問
const quiz2 =   
    {
      id:11,
      question : "Q11: 身長と体重はいくつですか"
    }
  
//年齢の設問
  const quiz3 = 
    {
      id:12,
      question : "Q12: 年齢はいくつですか"
    }

//年齢の設問のスコアシート   
  const age_list =[
    {  
    get_age:65, 
    age_score:0
  },{ 
    get_age:66,  
    age_score:0
  },{ 
    get_age:67,  
    age_score:1
  },{ 
    get_age:68,  
    age_score:1
  },{ 
    get_age:69,  
    age_score:2
  },{ 
    get_age:70,  
    age_score:3
  },{ 
    get_age:71,  
    age_score:5
  },{ 
    get_age:72,  
    age_score:6
  },{ 
    get_age:73,  
    age_score:7
  },{ 
    get_age:74,  
    age_score:9
  },{ 
    get_age:75,  
    age_score:10
  },{ 
    get_age:76,  
    age_score:10
  },{ 
    get_age:77,  
    age_score:11
  },{ 
    get_age:78,  
    age_score:12
  },{ 
    get_age:79,  
    age_score:14
  },{ 
    get_age:80,  
    age_score:15
  },{ 
    get_age:81,  
    age_score:17
  },{ 
    get_age:82,  
    age_score:18
  },{ 
    get_age:83,  
    age_score:18
  },{ 
    get_age:84,  
    age_score:20
  },{ 
    get_age:85,  
    age_score:20
  },{ 
    get_age:86,  
    age_score:21
  },{ 
    get_age:87,  
    age_score:21
  },{ 
    get_age:88,  
    age_score:23
  },{ 
    get_age:89,  
    age_score:23
  },{ 
    get_age:90,  
    age_score:24
  }
] 

//-----------------------------------
//---変数宣言------------------------
//-----------------------------------

//何番目の設問かのカウント
let quizIndex = 0;
//点数の合計値
let total = 0;

//-----------------------------------
//---HTMLオブジェクトの取得-----------
//-----------------------------------

//身長・体重設問時使用。選択式設問欄を消す。次へボタンを設置。
const $btn_list = document.getElementById('button-list');

//選択式設問欄数を取得
const quizLength = quiz.length;

//回答ボタンを配列で取得
const $button = document.getElementsByTagName('button');
//回答ボタン数を取得
let $buttonLength = $button.length;

//年齢のselectボックスを取得
const $age = document.getElementById('age');

//結果ページへ遷移するためのボタンを取得
const $result_btn = document.getElementById('result_btn');

//結果ページへ移動するボタンのダミーのdivタグ。年齢設問時に表示する
const $dummyForm = document.getElementById('dummy-form');

//結果ページへ移動するボタンのダミーのinputタグ。年齢設問時に表示する
const $dummyBtn = document.getElementById('dummy-btn');

//身長のselectボックスを取得
const $get_height = document.getElementById('height');

//体重のselectボックスを取得
const $get_weight = document.getElementById('weight');

//身長・体重入力後次の設問へ進むためのボタンを生成
const $next_btn = document.createElement('div');
$next_btn.setAttribute("class","next_btn");
$next_btn.textContent = '次へ';



//--------------------------------------------------
//setupQUizの定義（問題文、選択肢を定義）-----------
//--------------------------------------------------
const setupQuiz = () =>{
  //設問欄にquizオブジェクトのquestion情報をいれる
  document.getElementById('js-question').textContent = quiz[quizIndex].question;
  
  //以下、回答ボタンの生成処理
  //回答ボタンのインデックスを初期化
  let $buttonIndex = 0;
  
  //変数$buttonLengthに格納しているbuttonタグの数だけボタンを表示する。
  while ($buttonIndex < $buttonLength){
    //quizオブジェクトのanswersにある値を、buttonタグへ格納
    $button[$buttonIndex].textContent = quiz[quizIndex].answers[$buttonIndex];
    $buttonIndex++;
  }
}

//---------------------------
//setupQuizの実行-----------
//---------------------------
setupQuiz();


//--------------------------------------------------
//setupQUiz2の定義(身長・体重の設問文・回答欄を定義)----
//--------------------------------------------------
const setupQuiz2 = () =>{
  //設問欄にquiz2オブジェクトのquestion情報をいれる
  document.getElementById('js-question').textContent = quiz2.question;
  //身長・体重のselectボックスを表示
  $get_height.style.display = 'block';
  $get_weight.style.display = 'block';
  //入力後、次の質問へ進めるボタンを生成
  $btn_list.appendChild($next_btn);
  //選択式設問の回答ボタンを非表示
  $button[1].style.display = 'none';
  $button[0].style.display = 'none';

  next_click();
}

//--------------------------------------------------
//setupQUiz3の定義(年齢の設問文を定義)----
//--------------------------------------------------
const setupQuiz3 = () =>{
  //設問欄にquiz2オブジェクトのquestion情報をいれる
  document.getElementById('js-question').textContent = quiz3.question;
  //身長・体重のselectボックスを非表示
  $get_height.style.display = 'none';
  $get_weight.style.display = 'none';
  //次へボタンの表示を非表示
  $next_btn.style.display = 'none';
  //年齢のselectボックスを表示
  $age.style.display = 'block';
  //ダミーの次ページへ遷移するボタンを表示
  $dummyForm.style.display = 'block';

  result_click();
}


//------------------------------------------------------------
//clickHandlerの定義（選択式設問で回答をクリックした時の処理）
//------------------------------------------------------------
 const clickHandler = (e)=>{
    //クリックされたターゲットのオブジェクトのクラスリストにclick-hilightクラスを追加
    //クリックした時に水色になる処理
    e.target.classList.add('click-hilight');
    new Promise((result)=>{
      //クリックしてから、100ミリ秒後にclick-hilightクラスを外され、色が戻る
      setTimeout(()=>{
        e.target.classList.remove('click-hilight');
        result();
      },100);
      //result()が実行されthen()の処理に移る
    }).then(()=>{
      //もし、クリックしたオブジェクトのテクスト情報が、quizオブジェクトのcorrect情報と同じ場合
      if(quiz[quizIndex].correct === e.target.textContent){
        //quizオブジェクトのscoreをtotalへ加算する。
        total += quiz[quizIndex].score;
      }
       //回答した数をカウントする
       quizIndex++;
       //もし設問数がquizIndex(回答数)と比べて少なければ選択式問題を継続。そうでなければ身長体重設問へ。
       if(quizIndex < quizLength){
         setupQuiz();
       }else{
         setupQuiz2();
       }
    });
 }


 //------------------------------------------------------------------
 //clickHandlerの起動
 //------------------------------------------------------------------
 //ボタンの数ぶんのクリックイベントの記述を、while文でまとめた
 let handleIndex = 0;
 while(handleIndex < $buttonLength){
  //クリックされたボタンのオブジェクト情報でclickHandlerを実行
   $button[handleIndex].addEventListener('click',(e)=>{     
    clickHandler(e);
 });
 handleIndex++;
 }


 //------------------------------------------------------------------
 //次へボタンの定義
 //------------------------------------------------------------------
 const next_click = () =>{
  //次へボタンが押されたら
   $next_btn.addEventListener('click',()=>{
    //もし身長と体重の値がどちらもnullではない場合
    if($get_height.value !== 'null' && $get_weight.value !== 'null'){
      //取得した身長・体重の値を取得
      const height = $get_height.value; 
      const weight = $get_weight.value;
      //小数点第2以下を四捨五入。roundメソッドは小数点を四捨五入するので小数点第2位を四捨五入できるよう調整
      const $actbmi = weight / height / height;
      const bmi = Math.round($actbmi * 10)/10
      //もしBMIが18.5以下ならtotalへ加算
      if(bmi < 18.5){
        total += 3;       
      }
      //setupQUiz3の実行
      setupQuiz3(); 
    //もし、身長・体重のどちらかの値にnullがはいっていたら  
    }else{
      //ウィンドウアラートを出す
      window.alert('値を選択してください');
    }
   });
 }

 
//------------------------------------------------------------------
 //結果ページボタンの処理
 //------------------------------------------------------------------
 const result_click = () => {
  //ダミーの「元気度を測定」ボタンが押されたら実行
  $dummyBtn.addEventListener('click',(e)=>{
    //もし年齢の値がnullだったら
    if($age.value === 'null' ){
      //ウィンドウアラートを表示
      window.alert('年齢を選択してください');
    }else{
      //年齢が選択されていたら該当するスコアをtotalへ格納
      total += age_list[$age.value].age_score;
      //total変数に格納されている値をgetTotal変数として、セッションストレージへセットする
      sessionStorage.setItem('getTotal',total);
      //selectボックスの値をint型へ変更
      actAge = parseInt($age.value);
      //actAgeに65を加えることで年齢が割り出される。セッションストレージへセットする。
      sessionStorage.setItem('getAge',actAge + 65);
      //ダミーではなく非表示になっている画面遷移ボタンを間接的にクリック
      $result_btn.click();
    }
   });
 }
