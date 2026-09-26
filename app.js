(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const state = { index: 0, answered: false, score: 0, streak: 0, time: 60, timer: null };
  const questions = [
    { text: "My brother ___ coffee every morning.", options: ["drink", "drinks", "is drinking"], answer: "drinks", why: "Every morning = a routine, so use Present Simple." },
    { text: "She ___ coffee now.", options: ["doesn't drink", "isn't drinking", "don't drink"], answer: "isn't drinking", why: "Now = Present Continuous negative: isn't + verb-ing." },
    { text: "___ you usually work from home?", options: ["Do", "Does", "Are"], answer: "Do", why: "Use Do with I, you, we and they." },
    { text: "___ he play football on Sundays?", options: ["Do", "Does", "Is"], answer: "Does", why: "Use Does with he, she and it." },
    { text: "Be quiet! The baby ___.", options: ["sleeps", "sleep", "is sleeping"], answer: "is sleeping", why: "Be quiet! shows that it is happening now." },
    { text: "They ___ TV right now.", options: ["aren't watching", "don't watching", "isn't watch"], answer: "aren't watching", why: "They + aren't + verb-ing." },
    { text: "___ she studying at the moment?", options: ["Does", "Is", "Do"], answer: "Is", why: "Present Continuous question: Is + she + verb-ing?" },
    { text: "We ___ English on Mondays.", options: ["don't study", "aren't study", "doesn't study"], answer: "don't study", why: "We + don't + base verb." },
    { text: "Water ___ at 100°C.", options: ["is boiling", "boil", "boils"], answer: "boils", why: "A general fact uses Present Simple." },
    { text: "Does Anna ___ English?", options: ["speaks", "speak", "is speaking"], answer: "speak", why: "After Does, use the base verb: speak." },
    { text: "He ___ in London this week.", options: ["doesn't live", "isn't living", "don't live"], answer: "isn't living", why: "This week describes a temporary situation." },
    { text: "I ___ for my exam at the moment.", options: ["prepare", "am preparing", "prepares"], answer: "am preparing", why: "At the moment = Present Continuous." }
  ];
  function updateScore(){ $("#score").textContent=state.score; $("#streak").textContent=`Серия: ${state.streak}`; }
  function render(){ const q=questions[state.index]; state.answered=false; $("#progress").style.width=`${state.index/questions.length*100}%`; $("#quiz").innerHTML=`<div class="muted">Вопрос ${state.index+1} из ${questions.length}</div><div class="question">${q.text}</div><div class="answers">${q.options.map(o=>`<button type="button" class="answer" data-answer="${o}">${o}</button>`).join("")}</div><div class="feedback" id="feedback" aria-live="polite"></div><button type="button" class="next" id="next">${state.index===questions.length-1?"Начать заново":"Следующий вопрос"} →</button>`; $$(".answer").forEach(b=>b.onclick=()=>choose(b,q)); $("#next").onclick=next; }
  function choose(button,q){ if(state.answered)return; state.answered=true; const ok=button.dataset.answer===q.answer; $$(".answer").forEach(b=>{b.disabled=true;if(b.dataset.answer===q.answer)b.classList.add("correct")}); if(ok){state.score+=10+state.streak*2;state.streak++;$("#feedback").textContent=`✅ Верно! ${q.why}`;}else{state.streak=0;button.classList.add("wrong");$("#feedback").textContent=`❌ Не совсем. ${q.why}`;}updateScore(); }
  function next(){if(!state.answered){$("#feedback").textContent="Сначала выбери ответ.";return}state.index=(state.index+1)%questions.length;render();}
  function startTimer(){clearInterval(state.timer);state.time=60;$("#timer").textContent=state.time;state.timer=setInterval(()=>{state.time--;$("#timer").textContent=state.time;if(state.time<=0){clearInterval(state.timer);$$('.answer').forEach(b=>b.disabled=true);if($("#feedback"))$("#feedback").textContent="⏰ Время вышло.";}},1000);}
  $$(".tab").forEach(tab=>tab.onclick=()=>{$$(".tab").forEach(t=>t.classList.remove("active"));tab.classList.add("active");$("#simpleRules").classList.toggle("hidden",tab.dataset.tense!=="simple");$("#continuousRules").classList.toggle("hidden",tab.dataset.tense!=="continuous");});
  render();startTimer();updateScore();
})();