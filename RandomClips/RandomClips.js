// ------- DUOMENŲ BAZĖ (klausimai) -------
  // Kiekvienas atsakymas turi score 0–3 (0 = mažiausiai verslu, 3 = labiausiai verslu).
  const QUESTIONS = [
    {
      q: "Draugas siūlo bendrą verslo idėją, bet reikia investuoti savo santaupas. Ką darai?",
      options: [
        { t: "Analizuoju riziką ir priimu apgalvotą sprendimą", s: 2 },
        { t: "Iš karto atsisakau — per daug rizikos", s: 0 },
        { t: "Greitai įvertinu ir jei matau potencialą — imuosi", s: 3 },
        { t: "Domiuosi, bet ilgai delsiu apsispręsti", s: 1 },
      ]
    },
    {
      q: "Tavo projektas žlunga po pusmečio darbo. Kaip reaguoji?",
      options: [
        { t: "Reikia laiko atsigauti, bet galiausiai judu toliau", s: 1 },
        { t: "Traktuoju kaip pamoką ir jau planuoju kitą žingsnį", s: 3 },
        { t: "Nusivyliu ir nebenoriu bandyti iš naujo", s: 0 },
        { t: "Analizuoju klaidas ir bandau kitaip", s: 2 },
      ]
    },
    {
      q: "Kaip jautiesi parduodamas/siūlydamas savo produktą ar paslaugą svetimam žmogui?",
      options: [
        { t: "Man patinka, mėgstu įtikinti ir derėtis", s: 3 },
        { t: "Labai nejaukiai, vengiu tokių situacijų", s: 0 },
        { t: "Gana natūraliai, moku paaiškinti vertę", s: 2 },
        { t: "Nejauku, bet susitvarkau jei būtina", s: 1 },
      ]
    },
    {
      q: "Kaip tvarkai asmeninius finansus?",
      options: [
        { t: "Neseku, dažnai leidžiu daugiau nei turiu", s: 0 },
        { t: "Aktyviai planuoju, taupau ir investuoju", s: 3 },
        { t: "Iš dalies stebiu, bet be aiškios sistemos", s: 1 },
        { t: "Turiu biudžetą ir jo laikausi", s: 2 },
      ]
    },
    {
      q: "Kiek valandų per savaitę esi pasiruošęs skirti idėjai, kuria tiki?",
      options: [
        { t: "Kelias valandas savaitgaliais", s: 1 },
        { t: "Tik laisvalaikiu, jei lieka laiko", s: 0 },
        { t: "Kiek reikia — esu pasiruošęs viską pajungti tikslui", s: 3 },
        { t: "Reguliariai, greta pagrindinio darbo", s: 2 },
      ]
    },
    {
      q: "Kaip reaguoji į kritiką savo idėjai ar darbui?",
      options: [
        { t: "Aktyviai ieškau kritikos, kad tobulėčiau greičiau", s: 3 },
        { t: "Vertinu kaip naudingą grįžtamąjį ryšį", s: 2 },
        { t: "Imu asmeniškai ir nusimenu", s: 0 },
        { t: "Sunkiai priimu, bet stengiuosi apgalvoti", s: 1 },
      ]
    },
    {
      q: "Kaip dažnai užmezgi naujus profesinius ryšius (networking)?",
      options: [
        { t: "Beveik niekada, jaučiuosi nepatogiai", s: 0 },
        { t: "Reguliariai dalyvauju renginiuose ar bendrauju", s: 2 },
        { t: "Nuolat plečiu ryšius, tai natūrali mano dalis", s: 3 },
        { t: "Retai, tik kai būtina", s: 1 },
      ]
    },
    {
      q: "Kaip vertini savo gebėjimą matyti ilgalaikę viziją, o ne tik dabartį?",
      options: [
        { t: "Kartais pagalvoju apie ateitį, bet be aiškaus plano", s: 1 },
        { t: "Turiu bendrą kryptį ir tikslus", s: 2 },
        { t: "Sunkiai, koncentruojuosi tik į šiandieną", s: 0 },
        { t: "Nuolat mąstau strategiškai ir planuoju kelis žingsnius į priekį", s: 3 },
      ]
    },
    {
      q: "Rinkoje atsiranda naujas konkurentas su panašiu produktu. Kaip reaguoji?",
      options: [
        { t: "Naudoju tai kaip postūmį greitai patobulinti savo pasiūlymą", s: 3 },
        { t: "Stebiu situaciją, bet nesiimu veiksmų", s: 1 },
        { t: "Nerimauju ir nežinau, ką daryti", s: 0 },
        { t: "Analizuoju jų stipriąsias/silpnąsias puses ir koreguoju planą", s: 2 },
      ]
    },
  ];

  // ------- BŪSENA -------
  let current = 0;
  let answers = new Array(QUESTIONS.length).fill(null);

  const screenLanding = document.getElementById('screen-landing');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenResult = document.getElementById('screen-result');

  document.getElementById('q-total-label').textContent = QUESTIONS.length;

  function showScreen(el){
    [screenLanding, screenQuiz, screenResult].forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  }

  function startQuiz(){
    current = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    showScreen(screenQuiz);
    renderQuestion();
  }

  function renderQuestion(){
    const data = QUESTIONS[current];
    document.getElementById('q-count').textContent = `KLAUSIMAS ${current + 1} / ${QUESTIONS.length}`;
    document.getElementById('q-text').textContent = data.q;
    document.getElementById('progress-fill').style.width = `${(current / QUESTIONS.length) * 100}%`;

    const wrap = document.getElementById('q-options');
    wrap.innerHTML = '';
    data.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option' + (answers[current] === i ? ' selected' : '');
      btn.innerHTML = `<span class="tag">${String.fromCharCode(65 + i)}</span><span>${opt.t}</span>`;
      btn.onclick = () => selectOption(i);
      wrap.appendChild(btn);
    });

    document.getElementById('btn-back').style.visibility = current === 0 ? 'hidden' : 'visible';
    updateNextButton();
  }

  function selectOption(i){
    answers[current] = i;
    renderQuestion();
    setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        nextQuestion();
      } else {
        updateNextButton();
      }
    }, 220);
  }

  function updateNextButton(){
    const btn = document.getElementById('btn-next');
    const answered = answers[current] !== null;
    btn.disabled = !answered;
    btn.textContent = current === QUESTIONS.length - 1 ? 'Matyti rezultatą →' : 'Toliau →';
  }

  function nextQuestion(){
    if (answers[current] === null) return;
    if (current < QUESTIONS.length - 1){
      current++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  function prevQuestion(){
    if (current > 0){
      current--;
      renderQuestion();
    }
  }

  function finishQuiz(){
    const maxScore = QUESTIONS.length * 3;
    let raw = 0;
    QUESTIONS.forEach((q, i) => {
      const a = answers[i];
      raw += a !== null ? q.options[a].s : 0;
    });
    const pct = Math.round((raw / maxScore) * 100);

    let tier;
    if (pct < 40) {
      tier = {
        badge: 'Rezultatas · Samdomas darbas',
        title: 'Stabilumas tau svarbiau nei rizika',
        desc: 'Šiuo metu labiau linksti į saugesnį, nuspėjamą kelią — tai nėra blogai, tiesiog verslumo įpročiai (rizikos toleravimas, iniciatyva) dar nesuformuoti. Juos galima ugdyti mažais žingsniais.',
        color: 'var(--risk)'
      };
    } else if (pct < 75) {
      tier = {
        badge: 'Rezultatas · Turi potencialo',
        title: 'Turi pagrindą, reikia drąsos',
        desc: 'Matai galimybes ir moki analizuoti, bet kartais rizika ar neapibrėžtumas tave sustabdo. Su daugiau praktikos priimant greitus sprendimus verslumo potencialas gali sparčiai augti.',
        color: 'var(--caution)'
      };
    } else {
      tier = {
        badge: 'Rezultatas · Gimęs verslininkas',
        title: 'Turi verslininko refleksus',
        desc: 'Rizika, neapibrėžtumas ir greiti sprendimai tau nekelia baimės — priešingai, jie tave motyvuoja. Tai stiprus pagrindas kurti ir vystyti savo verslą.',
        color: 'var(--growth)'
      };
    }

    document.getElementById('result-badge').textContent = tier.badge;
    document.getElementById('result-title').textContent = tier.title;
    document.getElementById('result-desc').textContent = tier.desc;

    const numEl = document.getElementById('result-score-num');
    const barFill = document.getElementById('result-bar-fill');
    barFill.style.background = tier.color;

    showScreen(screenResult);

    let n = 0;
    numEl.textContent = '0';
    const step = Math.max(1, Math.round(pct / 30));
    const timer = setInterval(() => {
      n = Math.min(pct, n + step);
      numEl.textContent = n;
      if (n >= pct) clearInterval(timer);
    }, 16);

    requestAnimationFrame(() => {
      barFill.style.width = pct + '%';
    });
  }

  function restartQuiz(){
    showScreen(screenLanding);
  }