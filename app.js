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
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[m])}
function today(){return new Date().toLocaleDateString("sv-SE")}
function weakest(){return WORDS.filter(w=>{const s=saved.stats[w.id];return s&&s.wrong>0&&(s.wrong>=s.correct/2)})}
function totals(){const vals=Object.values(saved.stats);return {learned:vals.filter(x=>x.correct>0).length, weak:weakest().length, rate:vals.length?Math.round(vals.reduce((a,x)=>a+x.correct,0)/Math.max(1,vals.reduce((a,x)=>a+x.correct+x.wrong,0))*100):0}}

function shell(content){return `<header class="topbar"><div class="brand"><span class="brand-mark">A+</span>英単語クエスト</div><div class="streak">🔥 ${saved.streak||0}日</div></header>${content}`}

function renderHome(){
  game=null; const t=totals(); const weakCount=weakest().length;
  app.innerHTML=shell(`
    <h1>今日の10問、<br>サクッといこか。</h1>
    <p class="lead">プリント6単元・全${WORDS.length}問。記録はこのスマホの中だけに保存されます。</p>
    <section class="summary"><div class="stat"><b>${t.learned}</b><span>学習した単語</span></div><div class="stat"><b>${t.rate}%</b><span>正答率</span></div><div class="stat"><b>${t.weak}</b><span>苦手単語</span></div></section>
    <div class="section-title"><span>出題範囲</span><small>${setup.category==="all"?"全単元":CATEGORIES[setup.category]}</small></div>
    <div class="chips" id="categories"><button class="chip ${setup.category==="all"?"active":""}" data-cat="all">ぜんぶ</button>${Object.entries(CATEGORIES).map(([k,v])=>`<button class="chip ${setup.category===k?"active":""}" data-cat="${k}">${v.split("・")[0]}</button>`).join("")}</div>
    <div class="section-title"><span>チャレンジ方法</span><small>10問</small></div>
    <div class="mode-grid"><button class="mode ${setup.mode==="choice"?"active":""}" data-mode="choice"><div class="mode-icon">🎯</div><b>4択クイズ</b><span>まずは答えを見て覚える</span></button><button class="mode ${setup.mode==="type"?"active":""}" data-mode="type"><div class="mode-icon">⌨️</div><b>スペル入力</b><span>日本語を見て英語で答える</span></button></div>
    <button class="primary" id="start">10問スタート</button>
    ${weakCount?`<button class="secondary" id="weak" style="margin-top:10px">苦手な${weakCount}問だけ復習</button>`:""}
    <p class="tiny-note">ホーム画面に追加すると、アプリみたいに使えるで</p>
    <div class="settings"><button class="danger" id="reset">学習記録をリセット</button></div>
  `);
  $("#categories").onclick=e=>{const b=e.target.closest("button[data-cat]");if(b){setup.category=b.dataset.cat;renderHome()}};
  document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{setup.mode=b.dataset.mode;renderHome()});
  $("#start").onclick=()=>startGame(false);
  if($("#weak")) $("#weak").onclick=()=>startGame(true);
  $("#reset").onclick=()=>{if(confirm("学習記録を全部消します。ほんまにええ？")){localStorage.removeItem("vocabQuestState");saved=store.get();renderHome()}};
}

function startGame(weakOnly){
  let pool=weakOnly?weakest():WORDS.filter(w=>setup.category==="all"||w.category===setup.category);
  if(!pool.length){toast("苦手単語はまだないで");return}
  const ranked=shuffle(pool).sort((a,b)=>((saved.stats[a.id]?.correct||0)-(saved.stats[a.id]?.wrong||0))-((saved.stats[b.id]?.correct||0)-(saved.stats[b.id]?.wrong||0)));
  game={questions:ranked.slice(0,Math.min(setup.count,ranked.length)),index:0,correct:0,misses:[],answered:false,mode:setup.mode};
  renderQuestion();
}

function renderQuestion(){
  const q=game.questions[game.index]; const pct=game.index/game.questions.length*100;
  const controls=game.mode==="choice"?choiceHTML(q):`<form class="answer-form" id="answer-form"><input class="answer-input" id="answer" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="英語を入力" aria-label="英語の答え"><button class="primary" type="submit">答える</button></form>`;
  app.innerHTML=shell(`<div class="progress-row"><button class="chip" id="quit">やめる</button><div class="progress"><i style="width:${pct}%"></i></div><div class="count">${game.index+1}/${game.questions.length}</div></div><section class="quiz-card"><div class="category">${CATEGORIES[q.category]}</div><div class="prompt">${esc(q.ja)}</div><div class="hint">英語で答えよう</div></section><div id="answer-zone">${controls}</div>`);
  $("#quit").onclick=()=>{if(confirm("ここまでの記録を残して終了する？"))renderHome()};
  if(game.mode==="choice") document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>grade(b.dataset.id,b));
  else {$("#answer-form").onsubmit=e=>{e.preventDefault();grade($("#answer").value)};setTimeout(()=>$("#answer")?.focus(),50)}
}

function choiceHTML(q){
  const same=WORDS.filter(w=>w.category===q.category&&w.id!==q.id); const options=shuffle([q,...shuffle(same).slice(0,3)]);
  return `<div class="choices">${options.map(w=>`<button class="choice" data-id="${w.id}">${esc(w.en)}</button>`).join("")}</div>`;
}

function grade(value,button){
  if(game.answered)return; game.answered=true; const q=game.questions[game.index];
  const ok=game.mode==="choice"?value===q.id:q.answers.some(a=>normalize(a)===normalize(value));
  const stat=saved.stats[q.id]||{correct:0,wrong:0}; stat[ok?"correct":"wrong"]++; stat.last=today(); saved.stats[q.id]=stat; store.set(saved);
  if(ok) game.correct++; else game.misses.push(q);
  if(game.mode==="choice") document.querySelectorAll(".choice").forEach(b=>{b.disabled=true;if(b.dataset.id===q.id)b.classList.add("correct");else if(b===button)b.classList.add("wrong")});
  else $("#answer-form").remove();
  const zone=$("#answer-zone"); zone.insertAdjacentHTML("beforeend",`<div class="feedback ${ok?"good":"bad"}">${ok?"正解！ええやん ✨":"おしい！"}<small>答え：${esc(q.en)}</small></div><div class="quiz-actions"><button class="secondary" id="speak">🔊 発音</button><button class="primary" id="next">${game.index+1===game.questions.length?"結果を見る":"次の問題"}</button></div>`);
  $("#speak").onclick=()=>speak(q.answers[0].replace(/\s*\/.*$/, ""));
  $("#next").onclick=()=>{game.index++;game.answered=false;if(game.index>=game.questions.length)finish();else renderQuestion()};
}

function finish(){
  const day=today(); if(saved.lastDay!==day){const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);saved.streak=saved.lastDay===yesterday.toLocaleDateString("sv-SE")?(saved.streak||0)+1:1;saved.lastDay=day} saved.sessions=(saved.sessions||0)+1;store.set(saved);
  const pct=Math.round(game.correct/game.questions.length*100); const message=pct===100?"パーフェクト！":pct>=80?"かなり仕上がってる！":pct>=60?"ええ調子や！":"ここから伸びるで！";
  app.innerHTML=shell(`<section class="result-hero"><div class="result-emoji">${pct===100?"🏆":pct>=80?"🌟":pct>=60?"🔥":"💪"}</div><h1>${message}</h1><p class="score">${game.correct}<small> / ${game.questions.length}</small></p></section><div class="section-title"><span>まちがえた単語</span><small>${game.misses.length}問</small></div>${game.misses.length?`<div class="review-list">${game.misses.map(q=>`<div class="review-item"><b>${esc(q.ja)}</b><span>${esc(q.en)}</span></div>`).join("")}</div>`:`<div class="empty">全問正解。文句なしや！</div>`}<button class="primary" id="again">もう一回</button><button class="secondary" id="home" style="margin-top:10px">ホームへ戻る</button>`);
  $("#again").onclick=()=>startGame(false); $("#home").onclick=renderHome;
}

function speak(text){if(!("speechSynthesis" in window)){toast("この端末では発音できへんわ");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.82;speechSynthesis.speak(u)}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}

if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
renderHome();
