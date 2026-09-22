const CATEGORIES = {
  calendar: "月・季節・国・気持ち",
  routine: "毎日の生活・頻度",
  town: "町の施設・建物",
  body: "体・動物の部位",
  nature: "自然・風景・植物",
  verbs: "動詞（現在形・過去形）"
};

const raw = {
  calendar: [
    ["1月","January"],["2月","February"],["3月","March"],["4月","April"],["5月","May"],["6月","June"],["7月","July"],["8月","August"],["9月","September"],["10月","October"],["11月","November"],["12月","December"],
    ["春","spring"],["夏","summer"],["秋","fall","autumn"],["冬","winter"],
    ["日本","Japan"],["アメリカ","America","the United States","the U.S."],["イギリス","the U.K.","the UK","United Kingdom"],["カナダ","Canada"],["オーストラリア","Australia"],["中国","China"],["韓国","Korea","South Korea"],["フランス","France"],["ドイツ","Germany"],["イタリア","Italy"],["インド","India"],
    ["幸せな","happy"],["悲しい","sad"],["怒った","angry"]
  ],
  routine: [
    ["起きる","get up"],["朝食を食べる","eat breakfast","have breakfast"],["歯を磨く","brush my teeth","brush one's teeth"],["ゴミを出す","take out the trash","take out the garbage"],["自分の部屋を掃除する","clean my room"],["友達と遊ぶ","play with my friends","play with friends"],
    ["家を出る（出発する）","leave home"],["学校へ行く","go to school"],["昼食を食べる","eat lunch","have lunch"],["家に帰る","go home"],["宿題をする","do my homework","do homework"],
    ["テレビを見る","watch TV","watch television"],["犬の散歩をする","walk the dog","take the dog for a walk"],["夕食を作る","make dinner","cook dinner"],["食卓の用意をする","set the table"],["夕食を食べる","eat dinner","have dinner"],["ペットにえさをやる","feed my pet","feed the pet"],
    ["食器を片付ける","clear the table"],["皿洗いをする","wash the dishes","do the dishes"],["お風呂を掃除する","clean the bath","clean the bathroom"],["お風呂に入る","take a bath"],["寝る（ベッドに入る）","go to bed"],
    ["いつも・常に（100%）","always"],["たいてい・普段は（約80%）","usually"],["よく・しばしば（約60%）","often"],["ときどき（約50%）","sometimes"],["決して〜ない（0%）","never"]
  ],
  town: [
    ["家（いえ）","house","home"],["学校","school"],["本屋・書店","bookstore","bookshop"],["駅（えき）","station","train station"],["図書館","library"],["神社（じんじゃ）","shrine"],
    ["病院","hospital"],["消防署","fire station"],["警察署","police station"],["スーパーマーケット","supermarket"],["花屋","flower shop","florist"],["寺（てら・寺院）","temple"],
    ["レストラン","restaurant"],["公園","park"],["スタジアム・競技場","stadium"],["体育館・ジム","gym","gymnasium"],["動物園","zoo"],["水族館","aquarium"],
    ["博物館・美術館","museum"],["城（しろ）","castle"],["中学校","junior high school","middle school"],["デパート・百貨店","department store"],["プール","pool","swimming pool"],["遊園地","amusement park"]
  ],
  body: [
    ["頭（あたま）","head"],["首（くび）","neck"],["肩（かた）","shoulder"],["手（て）","hand"],["脚（あし・太もも〜足首）","leg"],["目／耳","eye / ear","eye/ear"],
    ["鼻／口","nose / mouth","nose/mouth"],["尾・しっぽ","tail"],["毛皮・体毛","fur"],["翼・つばさ","wing"],["羽・羽毛","feather"],["甲羅（こうら）・から","shell"]
  ],
  nature: [
    ["海（うみ）","sea","ocean"],["砂浜・ビーチ","beach"],["山（やま）","mountain"],["森（もり）","forest","woods"],["熱帯雨林（ジャングル）","jungle","rain forest","rainforest"],["砂漠（さばく）","desert"],
    ["サバンナ","savanna","savannah"],["湖（みずうみ）","lake"],["池（いけ）","pond"],["川（かわ）","river"],["滝（たき）","waterfall"],["温泉（おんせん）","hot spring"],
    ["空（そら）","sky"],["太陽（たいよう）","sun"],["星・星空","star","stars"],["木（き・樹木）","tree"],["木の実・ナッツ","nut","nuts"],["葉・木の葉","leaf","leaves"],
    ["草・芝生","grass"],["花（はな）","flower"],["果物（くだもの）","fruit"],["虫・昆虫","insect","bug"],["海藻・のり","seaweed"],["水（みず）","water"]
  ],
  verbs: [
    ["見る・会う","see / saw","see/saw"],["食べる","eat / ate","eat/ate"],["行く","go / went","go/went"],["楽しむ","enjoy / enjoyed","enjoy/enjoyed"],["訪れる","visit / visited","visit/visited"],["作る","make / made","make/made"],["勉強する","study / studied","study/studied"],["する","do / did","do/did"],
    ["話す・おしゃべりする","talk / talked","talk/talked"],["歌う","sing / sang","sing/sang"],["料理する","cook / cooked","cook/cooked"],["（テレビ等をじっと）見る","watch / watched","watch/watched"],["遊ぶ・演奏する","play / played","play/played"],["練習する","practice / practiced","practice/practiced","practise / practised"],["計画する（nを重ねる）","plan / planned","plan/planned"],["〜である・いた（is/am/are）","be / was・were","be / was / were","be/was/were"]
  ]
};

const WORDS = Object.entries(raw).flatMap(([category, rows]) => rows.map((row, index) => ({
  id: `${category}-${index + 1}`, category, ja: row[0], answers: row.slice(1), en: row[1]
})));

// 添付された学校プリント（A〜E）の出題内容を、スマホで自動採点できる形に整理。
const GRAMMAR_CHOICES = [
  {id:"gc-1",unit:"基本表現",prompt:"How about ____?",ja:"あなたはどうですか？",options:["you","have","really","ride"],answer:"you"},
  {id:"gc-2",unit:"基本表現",prompt:"Do you ____ any questions?",ja:"何か質問はありますか？",options:["have","good","you","ride"],answer:"have"},
  {id:"gc-3",unit:"基本表現",prompt:"I'm ____ at running.",ja:"私は走ることが得意です。",options:["good","really","have","ride"],answer:"good"},
  {id:"gc-4",unit:"基本表現",prompt:"Can you ____ a unicycle?",ja:"あなたは一輪車に乗れますか？",options:["ride","have","good","you"],answer:"ride"},
  {id:"gc-5",unit:"季節と行事",prompt:"What ____ do you like?",ja:"あなたはどの季節が好きですか？",options:["season","sport","food","color"],answer:"season"},
  {id:"gc-6",unit:"季節と行事",prompt:"____ summer, we have summer vacation.",ja:"夏には、夏休みがあります。",options:["In","At","On","For"],answer:"In"},
  {id:"gc-7",unit:"季節と行事",prompt:"In fall, we ____ a school festival.",ja:"秋には、文化祭があります。",options:["have","are","do","like"],answer:"have"},
  {id:"gc-8",unit:"季節と行事",prompt:"「夏休み」の正しい英語は？",ja:"つづりを選ぼう",options:["summer vacation","sumer vacation","summer bacation","summer vecation"],answer:"summer vacation"},
  {id:"gc-9",unit:"日常の動作",prompt:"I ____ the piano every day.",ja:"私は毎日ピアノを練習します。",options:["play","run","eat","go"],answer:"play"},
  {id:"gc-10",unit:"日常の動作",prompt:"I leave my house ____ 7:30.",ja:"私は7時30分に家を出ます。",options:["at","on","in","to"],answer:"at"},
  {id:"gc-11",unit:"過去形",prompt:"____ you cook dinner yesterday?",ja:"あなたは昨日、夕食を作りましたか？",options:["Did","Do","Are","Were"],answer:"Did"},
  {id:"gc-12",unit:"過去形",prompt:"We went ____ yesterday. It was fun.",ja:"私たちは昨日キャンプに行きました。",options:["camping","camp","camped","camps"],answer:"camping"},
  {id:"gc-13",unit:"過去形",prompt:"What ____ you do during the summer vacation?",ja:"夏休みの間、何をしましたか？",options:["did","do","was","were"],answer:"did"},
  {id:"gc-14",unit:"過去形",prompt:"「それは楽しかったです。」",ja:"正しい英文を選ぼう",options:["It was fun.","I was fun.","It were fun.","I am fun."],answer:"It was fun."},
  {id:"gc-15",unit:"過去形",prompt:"I went ____ juku yesterday.",ja:"私は昨日、塾へ行きました。",options:["to","in","at","for"],answer:"to"},
  {id:"gc-16",unit:"過去形",prompt:"A: How ____ it?  B: It was great!",ja:"それはどうでしたか？",options:["was","is","did","are"],answer:"was"},
  {id:"gc-17",unit:"時刻と日常",prompt:"I get ____ at seven every morning.",ja:"私は毎朝7時に起きます。",options:["up","to","on","in"],answer:"up"},
  {id:"gc-18",unit:"時刻と日常",prompt:"She gets up ____ 7:30.",ja:"彼女は7時30分に起きます。",options:["at","on","in","for"],answer:"at"},
  {id:"gc-19",unit:"時刻と日常",prompt:"____ time do you go to bed?",ja:"あなたは何時に寝ますか？",options:["What","How","Where","When"],answer:"What"},
  {id:"gc-20",unit:"時刻と日常",prompt:"A: Do you get up early?  B: No, I ____.",ja:"いいえ、起きません。",options:["don't","not","am not","do"],answer:"don't"},
  {id:"gc-21",unit:"会話",prompt:"When is your birthday?",ja:"自然な返事を選ぼう",options:["My birthday is January 6th.","I want a card.","I see.","I'm sorry."],answer:"My birthday is January 6th."},
  {id:"gc-22",unit:"会話",prompt:"What time do you take a bath?",ja:"自然な返事を選ぼう",options:["I take a bath at 9:00.","Yes, I do.","I like hot water.","My birthday is May."],answer:"I take a bath at 9:00."},
  {id:"gc-23",unit:"会話",prompt:"Where do you want to go?",ja:"自然な返事を選ぼう",options:["I want to go to the U.S.","I want to go to singing.","I want to go to TV.","I'm good."],answer:"I want to go to the U.S."},
  {id:"gc-24",unit:"会話",prompt:"What do you want to be?",ja:"自然な返事を選ぼう",options:["I want to be a teacher.","I want to eat pizza.","I like soccer.","I live in Osaka."],answer:"I want to be a teacher."}
];

const SENTENCE_QUESTIONS = [
  {id:"gs-1",unit:"基本表現",ja:"手を挙げなさい。",answer:"Raise your hands."},
  {id:"gs-2",unit:"基本表現",ja:"ノートを閉じなさい。",answer:"Close your notebooks."},
  {id:"gs-3",unit:"基本表現",ja:"座りなさい。",answer:"Sit down."},
  {id:"gs-4",unit:"基本表現",ja:"立ちなさい。",answer:"Stand up."},
  {id:"gs-5",unit:"基本表現",ja:"テレビを見なさい。",answer:"Look at the TV."},
  {id:"gs-6",unit:"基本表現",ja:"私もです。",answer:"Me, too.",alternatives:["Me too."]},
  {id:"gs-7",unit:"基本表現",ja:"私は走ることが得意です。",answer:"I'm good at running.",alternatives:["I am good at running."]},
  {id:"gs-8",unit:"季節と行事",ja:"あなたはどの季節が好きですか？",answer:"What season do you like?"},
  {id:"gs-9",unit:"季節と行事",ja:"私は夏が好きです。",answer:"I like summer."},
  {id:"gs-10",unit:"季節と行事",ja:"冬には、冬休みがあります。",answer:"In winter, we have winter vacation."},
  {id:"gs-11",unit:"季節と行事",ja:"夏には、夏休みがあります。",answer:"In summer, we have summer vacation."},
  {id:"gs-12",unit:"時刻と日常",ja:"私は7時30分に起きます。",answer:"I get up at 7:30."},
  {id:"gs-13",unit:"時刻と日常",ja:"あなたは7時30分に起きます。",answer:"You get up at 7:30."},
  {id:"gs-14",unit:"時刻と日常",ja:"あなたは7時30分に起きますか？",answer:"Do you get up at 7:30?"},
  {id:"gs-15",unit:"時刻と日常",ja:"あなたは何時に起きますか？",answer:"What time do you get up?"},
  {id:"gs-16",unit:"時刻と日常",ja:"あなたは朝食を食べますか？",answer:"Do you eat breakfast?"},
  {id:"gs-17",unit:"時刻と日常",ja:"あなたは何時に家を出ますか？",answer:"What time do you leave home?"},
  {id:"gs-18",unit:"時刻と日常",ja:"私は午後10時に寝ます。",answer:"I go to bed at 10:00."},
  {id:"gs-19",unit:"過去形",ja:"あなたは夏休みの間、何をしましたか？",answer:"What did you do during the summer vacation?"},
  {id:"gs-20",unit:"過去形",ja:"私は塾へ行きました。",answer:"I went to juku."},
  {id:"gs-21",unit:"過去形",ja:"それはどうでしたか？",answer:"How was it?"},
  {id:"gs-22",unit:"過去形",ja:"私たちはキャンプに行きました。",answer:"We went camping."},
  {id:"gs-23",unit:"過去形",ja:"それは楽しかったです。",answer:"It was fun."},
  {id:"gs-24",unit:"会話",ja:"私は7時に起きます。",answer:"I get up at 7:00."},
  {id:"gs-25",unit:"会話",ja:"私は土曜日にたいていアニメを見ます。",answer:"I usually watch anime on Saturday."},
  {id:"gs-26",unit:"会話",ja:"私はよく家族と公園へ行きます。",answer:"I often go to the park with my family."},
  {id:"gs-27",unit:"会話",ja:"私は10時にときどきお風呂に入ります。",answer:"I sometimes take a bath at 10."},
  {id:"gs-28",unit:"会話",ja:"私はアニメに興味があります。",answer:"I'm interested in anime.",alternatives:["I am interested in anime."]}
].map(q=>({...q,category:"grammar",answers:[q.answer,...(q.alternatives||[])],words:q.answer.replace(/[?.!,]/g,"").split(/\s+/)}));

const store = {
  get(){ try{return JSON.parse(localStorage.getItem("vocabQuestState"))||{stats:{},sessions:0,lastDay:"",streak:0}}catch{return {stats:{},sessions:0,lastDay:"",streak:0}} },
  set(v){localStorage.setItem("vocabQuestState",JSON.stringify(v))}
};

let saved = store.get();
let setup = {category:"all", mode:"choice", count:10, weak:false};
let game = null;
const $ = s => document.querySelector(s);
const app = $("#app");

function normalize(s){return s.toLowerCase().trim().replace(/[．。,.]/g,"").replace(/[・／]/g,"/").replace(/\s*\/\s*/g,"/").replace(/\s+/g," ")}
function normalizeSentence(s){
  return String(s).toLowerCase().trim().replace(/[’]/g,"'")
    .replace(/\bi'm\b/g,"i am").replace(/\bdon't\b/g,"do not").replace(/\bcan't\b/g,"cannot")
    .replace(/[^a-z0-9:\s]/g,"").replace(/\s+/g," ");
}
function verbForms(q){
  const [present,past=""] = q.en.split(" / ");
  const presentAnswers=[]; const pastAnswers=[];
  q.answers.forEach(answer=>{
    const parts=answer.split(/\s*\/\s*/);
    if(parts[0]) presentAnswers.push(parts[0]);
    if(parts.length>1) pastAnswers.push(parts.slice(1).join(" / ").replace(/・/g," / "));
  });
  return {present,past:past.replace(/・/g," / "),presentAnswers,pastAnswers};
}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[m])}
function today(){return new Date().toLocaleDateString("sv-SE")}
function weakest(){return WORDS.filter(w=>{const s=saved.stats[w.id];return s&&s.wrong>0&&(s.wrong>=s.correct/2)})}
function totals(){const vals=Object.values(saved.stats);return {learned:vals.filter(x=>x.correct>0).length, weak:weakest().length, rate:vals.length?Math.round(vals.reduce((a,x)=>a+x.correct,0)/Math.max(1,vals.reduce((a,x)=>a+x.correct+x.wrong,0))*100):0}}

function shell(content){return `<header class="topbar"><div class="brand"><span class="brand-mark">A+</span>英語クエスト</div><div class="streak">🔥 ${saved.streak||0}日</div></header>${content}`}

function renderHome(){
  game=null; const t=totals(); const weakCount=weakest().length;
  const directVerbMode=["presentToPast","pastToPresent"].includes(setup.mode);
  const grammarChoiceMode=setup.mode==="grammarChoice";
  const grammarSentenceMode=["order","sentence"].includes(setup.mode);
  const grammarMode=grammarChoiceMode||grammarSentenceMode;
  const masteryCount=grammarChoiceMode?GRAMMAR_CHOICES.length:grammarSentenceMode?SENTENCE_QUESTIONS.length:directVerbMode?16:100;
  app.innerHTML=shell(`
    <h1>今日の10問、<br>サクッといこか。</h1>
    <p class="lead">単語${WORDS.length}問＋文法${GRAMMAR_CHOICES.length + SENTENCE_QUESTIONS.length}問。記録はこのスマホの中だけに保存されます。</p>
    <section class="summary"><div class="stat"><b>${t.learned}</b><span>学習した単語</span></div><div class="stat"><b>${t.rate}%</b><span>正答率</span></div><div class="stat"><b>${t.weak}</b><span>苦手単語</span></div></section>
    ${grammarMode?"":`<div class="section-title"><span>出題範囲</span><small>${setup.category==="all"?"全単元":CATEGORIES[setup.category]}</small></div>
    <div class="chips" id="categories"><button class="chip ${setup.category==="all"?"active":""}" data-cat="all">ぜんぶ</button>${Object.entries(CATEGORIES).map(([k,v])=>`<button class="chip ${setup.category===k?"active":""}" data-cat="${k}">${v.split("・")[0]}</button>`).join("")}</div>`}
    <div class="section-title"><span>単語・動詞</span><small>出題形式を選択</small></div>
    <div class="mode-grid"><button class="mode ${setup.mode==="choice"?"active":""}" data-mode="choice"><div class="mode-icon">🎯</div><b>4択クイズ</b><span>まずは答えを見て覚える</span></button><button class="mode ${setup.mode==="type"?"active":""}" data-mode="type"><div class="mode-icon">⌨️</div><b>スペル入力</b><span>日本語を見て英語で答える</span></button><button class="mode ${setup.mode==="presentToPast"?"active":""}" data-mode="presentToPast"><div class="mode-icon">⏩</div><b>現在形 → 過去形</b><span>現在形を見て過去形を入力</span></button><button class="mode ${setup.mode==="pastToPresent"?"active":""}" data-mode="pastToPresent"><div class="mode-icon">⏪</div><b>過去形 → 現在形</b><span>過去形を見て現在形を入力</span></button></div>
    <div class="section-title"><span>文法・英作文</span><small>プリントA〜E対応</small></div>
    <div class="mode-grid"><button class="mode ${setup.mode==="grammarChoice"?"active":""}" data-mode="grammarChoice"><div class="mode-icon">✅</div><b>選択問題</b><span>空所補充・会話の返答</span></button><button class="mode ${setup.mode==="order"?"active":""}" data-mode="order"><div class="mode-icon">🧩</div><b>並べ替え</b><span>単語カードを順番にタップ</span></button><button class="mode ${setup.mode==="sentence"?"active":""}" data-mode="sentence"><div class="mode-icon">✍️</div><b>英作文入力</b><span>同じ文を語群なしで入力</span></button></div>
    <button class="primary" id="start">10問スタート</button>
    <button class="mastery" id="mastery"><span>🏆</span><span><b>${masteryCount}問・完全攻略</b><small>ミスだけ繰り返して、全問正解まで</small></span></button>
    ${weakCount&&!grammarMode?`<button class="secondary" id="weak" style="margin-top:10px">苦手な${weakCount}問だけ復習</button>`:""}
    <p class="tiny-note">ホーム画面に追加すると、アプリみたいに使えるで</p>
    <div class="settings"><button class="danger" id="reset">学習記録をリセット</button></div>
  `);
  if($("#categories")) $("#categories").onclick=e=>{const b=e.target.closest("button[data-cat]");if(b){setup.category=b.dataset.cat;renderHome()}};
  document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{setup.mode=b.dataset.mode;renderHome()});
  $("#start").onclick=()=>startGame(false);
  $("#mastery").onclick=()=>startGame(false,true);
  if($("#weak")) $("#weak").onclick=()=>startGame(true);
  $("#reset").onclick=()=>{if(confirm("学習記録を全部消します。ほんまにええ？")){localStorage.removeItem("vocabQuestState");saved=store.get();renderHome()}};
}

function startGame(weakOnly,mastery=false){
  const directVerbMode=["presentToPast","pastToPresent"].includes(setup.mode);
  const grammarChoiceMode=setup.mode==="grammarChoice";
  const grammarSentenceMode=["order","sentence"].includes(setup.mode);
  let pool=grammarChoiceMode?GRAMMAR_CHOICES:grammarSentenceMode?SENTENCE_QUESTIONS:directVerbMode?WORDS.filter(w=>w.category==="verbs"):(mastery?WORDS:(weakOnly?weakest():WORDS.filter(w=>setup.category==="all"||w.category===setup.category)));
  if(!pool.length){toast("苦手単語はまだないで");return}
  const ranked=shuffle(pool).sort((a,b)=>((saved.stats[a.id]?.correct||0)-(saved.stats[a.id]?.wrong||0))-((saved.stats[b.id]?.correct||0)-(saved.stats[b.id]?.wrong||0)));
  const masteryLimit=grammarChoiceMode||grammarSentenceMode?ranked.length:directVerbMode?16:100;
  const selected=ranked.slice(0,Math.min(mastery?masteryLimit:setup.count,ranked.length));
  game={questions:selected,index:0,correct:0,misses:[],roundMisses:[],answered:false,mode:setup.mode,mastery,round:1,total:selected.length,totalAnswers:0,totalWrong:0};
  renderQuestion();
}

function renderQuestion(){
  const q=game.questions[game.index]; const pct=game.index/game.questions.length*100;
  const controls=game.mode==="choice"?choiceHTML(q):game.mode==="grammarChoice"?grammarChoiceHTML(q):game.mode==="order"?orderHTML(q):inputHTML(q);
  const forms=q.category==="verbs"?verbForms(q):null;
  const prompt=game.mode==="grammarChoice"?q.prompt:game.mode==="presentToPast"?forms.present:game.mode==="pastToPresent"?forms.past:q.ja;
  const hint=game.mode==="grammarChoice"?q.ja:game.mode==="order"?"単語を正しい順にタップしよう":game.mode==="sentence"?"語群なしで英文を入力しよう":game.mode==="presentToPast"?"過去形を入力しよう":game.mode==="pastToPresent"?"現在形を入力しよう":q.category==="verbs"&&game.mode==="type"?"現在形と過去形を入力しよう":"英語で答えよう";
  const roundLabel=game.mastery?`<span class="round-badge">${game.round}周目</span>`:"";
  app.innerHTML=shell(`<div class="progress-row"><button class="chip" id="quit">やめる</button>${roundLabel}<div class="progress"><i style="width:${pct}%"></i></div><div class="count">${game.index+1}/${game.questions.length}</div></div><section class="quiz-card"><div class="category">${esc(q.unit||CATEGORIES[q.category])}</div><div class="prompt ${game.mode==="grammarChoice"?"grammar-prompt":""}">${esc(prompt)}</div><div class="hint">${esc(hint)}</div></section><div id="answer-zone">${controls}</div>`);
  $("#quit").onclick=()=>{if(confirm("ここまでの記録を残して終了する？"))renderHome()};
  if(game.mode==="choice"||game.mode==="grammarChoice") document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>grade(b.dataset.id,b));
  else if(game.mode==="order") bindOrderControls();
  else {$("#answer-form").onsubmit=e=>{e.preventDefault();grade(q.category==="verbs"&&game.mode==="type"?{present:$("#answer-present").value,past:$("#answer-past").value}:$("#answer").value)};setTimeout(()=>$("#answer, #answer-present")?.focus(),50)}
}

function inputHTML(q){
  if(game.mode==="sentence") return `<form class="answer-form" id="answer-form"><input class="answer-input sentence-input" id="answer" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="英文を入力" aria-label="英作文の答え"><button class="primary" type="submit">答える</button></form>`;
  if(game.mode==="presentToPast"||game.mode==="pastToPresent"){
    const target=game.mode==="presentToPast"?"過去形":"現在形";
    return `<form class="answer-form" id="answer-form"><label class="direct-label" for="answer">${target}</label><input class="answer-input" id="answer" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${target}を入力" aria-label="${target}の答え"><button class="primary" type="submit">答える</button></form>`;
  }
  if(q.category!=="verbs") return `<form class="answer-form" id="answer-form"><input class="answer-input" id="answer" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="英語を入力" aria-label="英語の答え"><button class="primary" type="submit">答える</button></form>`;
  return `<form class="answer-form" id="answer-form"><div class="verb-inputs"><label><span>現在形</span><input class="answer-input" id="answer-present" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="例：see"></label><label><span>過去形</span><input class="answer-input" id="answer-past" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="例：saw"></label></div><button class="primary" type="submit">2つとも答える</button></form>`;
}

function choiceHTML(q){
  const same=WORDS.filter(w=>w.category===q.category&&w.id!==q.id); const options=shuffle([q,...shuffle(same).slice(0,3)]);
  return `<div class="choices">${options.map(w=>`<button class="choice" data-id="${w.id}">${esc(w.en)}</button>`).join("")}</div>`;
}

function grammarChoiceHTML(q){
  return `<div class="choices">${shuffle(q.options).map(option=>`<button class="choice" data-id="${esc(option)}">${esc(option)}</button>`).join("")}</div>`;
}

function orderHTML(q){
  const tokens=shuffle(q.words.map((word,index)=>({word,index})));
  return `<div class="order-wrap"><div class="order-label">ここに英文を作る</div><div class="order-answer" id="order-answer" aria-live="polite"></div><div class="order-label">単語カード</div><div class="word-bank" id="word-bank">${tokens.map(token=>`<button type="button" class="word-chip" data-word="${esc(token.word)}" data-key="${token.index}">${esc(token.word)}</button>`).join("")}</div><div class="order-actions"><button type="button" class="secondary" id="order-reset">やり直す</button><button type="button" class="primary" id="order-submit">答える</button></div></div>`;
}

function bindOrderControls(){
  const bank=$("#word-bank"); const answer=$("#order-answer");
  const move=e=>{const button=e.target.closest(".word-chip");if(!button||game.answered)return;(button.parentElement===bank?answer:bank).appendChild(button)};
  bank.onclick=move; answer.onclick=move;
  $("#order-reset").onclick=()=>{[...answer.querySelectorAll(".word-chip")].forEach(button=>bank.appendChild(button))};
  $("#order-submit").onclick=()=>{
    const value=[...answer.querySelectorAll(".word-chip")].map(button=>button.dataset.word).join(" ");
    if(!value){toast("単語を順番にタップしてな");return}
    grade(value);
  };
}

function grade(value,button){
  if(game.answered)return; game.answered=true; const q=game.questions[game.index];
  let ok;
  if(game.mode==="choice") ok=value===q.id;
  else if(game.mode==="grammarChoice") ok=normalizeSentence(value)===normalizeSentence(q.answer);
  else if(game.mode==="order"||game.mode==="sentence") ok=q.answers.some(answer=>normalizeSentence(answer)===normalizeSentence(value));
  else if(game.mode==="presentToPast") ok=verbForms(q).pastAnswers.some(a=>normalize(a)===normalize(value));
  else if(game.mode==="pastToPresent") ok=verbForms(q).presentAnswers.some(a=>normalize(a)===normalize(value));
  else if(q.category==="verbs"){
    const forms=verbForms(q);
    ok=forms.presentAnswers.some(a=>normalize(a)===normalize(value.present))&&forms.pastAnswers.some(a=>normalize(a)===normalize(value.past));
  } else ok=q.answers.some(a=>normalize(a)===normalize(value));
  const stat=saved.stats[q.id]||{correct:0,wrong:0}; stat[ok?"correct":"wrong"]++; stat.last=today(); saved.stats[q.id]=stat; store.set(saved);
  game.totalAnswers++;
  if(ok) game.correct++; else {game.misses.push(q);game.roundMisses.push(q);game.totalWrong++}
  if(game.mode==="choice"||game.mode==="grammarChoice") document.querySelectorAll(".choice").forEach(b=>{b.disabled=true;if(game.mode==="choice"?b.dataset.id===q.id:normalizeSentence(b.dataset.id)===normalizeSentence(q.answer))b.classList.add("correct");else if(b===button)b.classList.add("wrong")});
  else if(game.mode==="order") $(".order-actions").remove();
  else $("#answer-form").remove();
  const isRoundEnd=game.index+1===game.questions.length;
  const nextLabel=isRoundEnd?(game.mastery&&game.roundMisses.length?`ミス${game.roundMisses.length}問をもう一周`:"結果を見る"):"次の問題";
  const forms=q.category==="verbs"?verbForms(q):null;
  const answerDisplay=game.mode==="grammarChoice"||game.mode==="order"||game.mode==="sentence"?q.answer:game.mode==="presentToPast"?forms.past:game.mode==="pastToPresent"?forms.present:q.en;
  const spoken=game.mode==="grammarChoice"||game.mode==="order"||game.mode==="sentence"?q.answer:game.mode==="presentToPast"?forms.past.split(" / ")[0]:game.mode==="pastToPresent"?forms.present:q.answers[0].replace(/\s*\/.*$/, "");
  const zone=$("#answer-zone"); zone.insertAdjacentHTML("beforeend",`<div class="feedback ${ok?"good":"bad"}">${ok?"正解！ええやん ✨":"おしい！"}<small>答え：${esc(answerDisplay)}</small></div><div class="quiz-actions"><button class="secondary" id="speak">🔊 発音</button><button class="primary" id="next">${nextLabel}</button></div>`);
  $("#speak").onclick=()=>speak(spoken);
  $("#next").onclick=()=>advanceGame();
}

function advanceGame(){
  game.index++; game.answered=false;
  if(game.index<game.questions.length){renderQuestion();return}
  if(game.mastery&&game.roundMisses.length){
    game.questions=shuffle(game.roundMisses); game.roundMisses=[]; game.index=0; game.round++;
    toast(`${game.round}周目：ミスした問題だけやで`); renderQuestion(); return;
  }
  finish();
}

function finish(){
  const day=today(); if(saved.lastDay!==day){const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);saved.streak=saved.lastDay===yesterday.toLocaleDateString("sv-SE")?(saved.streak||0)+1:1;saved.lastDay=day} saved.sessions=(saved.sessions||0)+1;store.set(saved);
  const pct=game.mastery?100:Math.round(game.correct/game.questions.length*100); const message=game.mastery?`${game.total}問完全攻略！`:pct===100?"パーフェクト！":pct>=80?"かなり仕上がってる！":pct>=60?"ええ調子や！":"ここから伸びるで！";
  const details=game.mastery?`<div class="mastery-result"><span><b>${game.round}</b>周</span><span><b>${game.totalAnswers}</b>回答</span><span><b>${game.totalWrong}</b>ミス</span></div>`:"";
  app.innerHTML=shell(`<section class="result-hero"><div class="result-emoji">${pct===100?"🏆":pct>=80?"🌟":pct>=60?"🔥":"💪"}</div><h1>${message}</h1><p class="score">${game.mastery?game.total:game.correct}<small> / ${game.mastery?game.total:game.questions.length}</small></p>${details}</section><div class="section-title"><span>${game.mastery?"攻略中に間違えた問題":"まちがえた問題"}</span><small>${game.misses.length}回</small></div>${game.misses.length?`<div class="review-list">${game.misses.map(q=>`<div class="review-item"><b>${esc(q.ja)}</b><span>${esc(q.answer||q.en)}</span></div>`).join("")}</div>`:`<div class="empty">全問正解。文句なしや！</div>`}<button class="primary" id="again">もう一回</button><button class="secondary" id="home" style="margin-top:10px">ホームへ戻る</button>`);
  $("#again").onclick=()=>startGame(false); $("#home").onclick=renderHome;
}

function speak(text){if(!("speechSynthesis" in window)){toast("この端末では発音できへんわ");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.82;speechSynthesis.speak(u)}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}

if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
renderHome();
