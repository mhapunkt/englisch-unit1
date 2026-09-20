import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, Check, Flame, RotateCcw, Target, X} from 'lucide-react';
import './styles.css';

const VOCAB = [
  ['stop','Halt; Station, Haltestelle'],['camping','Camping, Zelten'],['world','Welt'],['sunny','sonnig'],['mountain','Berg'],['beautiful','schön'],['alone','allein'],['say hello to … for me','Grüß … von mir.'],['wave','Welle'],['weather','Wetter'],['cloudy','bewölkt'],['cloud','Wolke'],['caravan','Wohnwagen'],['fun park','Vergnügungspark'],['windy','windig'],['wind','Wind'],['project','Projekt'],["I can’t wait to see …",'Ich kann es kaum erwarten, … zu sehen.'],['rainforest','Regenwald'],['forest','Wald'],['rain','Regen'],['to rain','regnen'],['plant','Pflanze'],['message','Nachricht'],
  ['phone call','Anruf; Telefongespräch'],['to phone somebody','jemanden anrufen'],['to answer the phone','ans Telefon gehen'],['to be in','zu Hause sein'],['to be out','nicht zu Hause sein; nicht da sein'],['to leave a message','eine Nachricht hinterlassen'],['holiday','Urlaub'],['What was it like?','Wie war es?'],['at first','zuerst; anfangs; am Anfang'],['race','Rennen'],['two days ago','vor zwei Tagen'],['country','Land (Staat)'],['building','Gebäude'],['tomorrow','morgen'],['to bring','(mit-, her)bringen'],['brought','brachte; gebracht'],['if','wenn; falls'],['revision','Wiederholung (des Lernstoffs)'],['Hold on a minute.','Bleib / Bleiben Sie am Apparat.'],['to make notes on something','(sich) Notizen über / zu etwas machen'],['crib sheet','Spickzettel; Merkzettel'],
  ['neighbour','Nachbar/in'],['tea','leichte Nachmittags- oder Abendmahlzeit'],['Love, …','Alles Liebe, … / Liebe Grüße, …'],['Who did you tell?','Wem hast du es erzählt?'],['Who does Sam know?','Wen kennt Sam?'],['for example','zum Beispiel'],['surprise','Überraschung'],['still','trotzdem; dennoch'],['this afternoon','heute Nachmittag'],['this evening','heute Abend'],['to move to','umziehen nach'],['son','Sohn'],['daughter','Tochter'],['already','schon; bereits'],['sure','sicher'],['to invite somebody to','jemanden zu etwas einladen'],['ever','jemals'],['Lucky you.','Du Glückspilz.'],['to be lucky','Glück haben'],['to look after somebody','auf jemanden aufpassen; sich um jemanden kümmern'],['to be allowed to do something','etwas tun dürfen'],['to hit','schlagen'],['to roll','rollen'],['out','heraus; hinaus; nach draußen'],['prize','Preis; Gewinn'],['Here you are.','Bitte sehr. / Hier bitte.'],['…, right?','…, nicht wahr?'],['to mean','bedeuten'],['meant','bedeutete'],['subject','Subjekt'],['object','Objekt'],['to get in touch with somebody','mit jemandem Kontakt aufnehmen; sich mit jemandem in Verbindung setzen'],
  ['to stay in touch with somebody','mit jemandem Kontakt halten; mit jemandem in Verbindung bleiben'],['text message','SMS'],['text','SMS'],['free','kostenlos'],['rule','Regel; Vorschrift'],['host family','Gastfamilie'],['meaning','Bedeutung'],['context','(Text-, Satz-)Zusammenhang; Kontext'],['must','müssen'],['similar to something or somebody','etwas oder jemandem ähnlich'],
  ['to walk / run / sail on','weitergehen / weiterlaufen / weitersegeln'],['just like …','genau wie …'],['to be / feel bored','gelangweilt sein; sich langweilen'],['term','Trimester'],['boarding school','Internat'],['shocked','schockiert; entsetzt'],['outdoor','Außen-; im Freien'],['to climb','klettern; hinaufklettern'],['to look forward to something','sich auf etwas freuen'],['tear','Träne'],['unhappy','unglücklich'],['future','Zukunft; zukünftig'],['jacket','Jacke; Jackett'],['pocket','Tasche; Mantel- oder Hosentasche'],['litter bin','Abfalleimer'],
  ['apartment','Wohnung'],['screen','Bildschirm'],['fries','Pommes frites'],['to wash the dishes','das Geschirr abwaschen; spülen'],['to','um zu'],['to land','landen; an Land gehen'],['land','Land'],['right now','jetzt gerade'],['to order','bestellen'],['pancake','Pfannkuchen; Eierkuchen'],["outside Rosie’s Diner","vor Rosie’s Diner; außerhalb von Rosie’s Diner"],['campsite','Zeltplatz'],['next to','neben'],['tent','Zelt'],['rocky','felsig; steinig'],['shadow','Schatten'],['fire','Feuer'],['to look up','hochsehen; aufschauen'],['sky','Himmel'],['to be asleep','schlafen; nicht wach sein'],['torch','Taschenlampe'],['so that …','sodass; damit'],['wild','wild'],['again and again','immer wieder'],
  ['to turn something off','etwas ausschalten'],['to give somebody a hug','jemanden umarmen'],['this time','dieses Mal'],['my own film / room','mein eigener Film / mein eigenes Zimmer'],['memory','Erinnerung']
];

const SPECIAL = [
  ['Welche Präposition fehlt? “We moved ___ Plymouth last year.”','to',['at','in','for']],
  ['Welche Präposition fehlt? “Can I invite all my friends ___ my birthday party?”','to',['for','at','with']],
  ['Welche Präposition fehlt? “Sam has to look ___ his little sister.”','after',['at','for','to']],
  ['Welche Präposition fehlt? “Get in touch ___ me.”','with',['to','at','for']],
  ['Welche Präposition gehört zu „Notizen über etwas machen“? “make notes ___ something”','on',['to','with','after']],
  ['Welche Präposition fehlt? “This picture is similar ___ mine.”','to',['with','at','for']],
  ['Welche Präposition fehlt? “I’m looking forward ___ the summer holidays.”','to',['for','at','on']],
  ['Welche Präposition fehlt? “The campsite is right ___ to a river.”','next',['near','beside','close']],
  ['Welches Wort ergänzt den Satz? “He didn’t stop and just walked ___.”','on',['out','up','to']],
  ['Welche Form bedeutet „damit; sodass“?','so that',['so then','that so','so what']],
  ['Welche Form bedeutet „jemanden anrufen“?','to phone somebody',['to phone to somebody','to phone with somebody','to phone at somebody']],
  ['Welche Form bedeutet „eine Nachricht hinterlassen“?','to leave a message',['to let a message','to left a message','to leave an message']],
  ['Welche Form bedeutet „etwas tun dürfen“?','to be allowed to do something',['to be allow to do something','to allowed doing something','to be aloud to do something']],
  ['Welche Form bedeutet „vor zwei Tagen“?','two days ago',['before two days','two day ago','two days eggo']],
  ['Welche Schreibweise ist richtig? – Überraschung','surprise',['surprize','suprise','surprice']],
  ['Welche Schreibweise ist richtig? – Nachbar/in','neighbour',['neigbour','neighbourh','neighbur']],
  ['Welche Schreibweise ist richtig? – schön','beautiful',['beautifull','beutiful','beautyful']],
  ['Welche Schreibweise ist richtig? – Wetter','weather',['wheather','wether','weathar']],
  ['Welche Schreibweise ist richtig? – Gebäude','building',['buildung','bilding','buidling']],
  ['Welche Schreibweise ist richtig? – Internat','boarding school',['bording school','boarding scool','boardin school']],
  ['Welche Schreibweise ist richtig? – Wohnung (US-Englisch)','apartment',['appartment','apartement','apartmant']],
  ['Welche Schreibweise ist richtig? – Zeltplatz','campsite',['campside','camp sitee','camppsite']],
  ['Welche Schreibweise ist richtig? – Erinnerung','memory',['memmory','memorie','memmorie']],
];

const shuffle = a => [...a].sort(() => Math.random() - .5);
const PHRASE_DISTRACTORS = {
  'to look after somebody':['to look for somebody','to look at somebody','to look after to somebody'],
  'to look forward to something':['to look forward for something','to look forward at something','to look forward something'],
  'to get in touch with somebody':['to get in touch to somebody','to get on touch with somebody','to get in touch somebody'],
  'to stay in touch with somebody':['to stay in touch to somebody','to stay on touch with somebody','to stay in touch somebody'],
  'to invite somebody to':['to invite somebody at','to invite somebody for','to invite to somebody'],
  'to move to':['to move in','to move at','to move into to'],
  'to make notes on something':['to make notes of something','to do notes on something','to make notes at something'],
  'similar to something or somebody':['similar with something or somebody','similar as something or somebody','similar than something or somebody'],
  'to walk / run / sail on':['to walk / run / sail out','to walk / run / sail at','to walk / run / sail of'],
  'to turn something off':['to turn something out','to turn something of','to turn off something on'],
  'to give somebody a hug':['to give to somebody a hug','to give somebody an hug','to make somebody a hug'],
  'to wash the dishes':['to wash up the dish','to washing the dishes','to wash the disches'],
  'to be / feel bored':['to be / feel boring','to be / fell bored','to been / feel bored'],
  'to be allowed to do something':['to be aloud to do something','to allowed to do something','to be allowed doing something'],
  'two days ago':['two day ago','two days before','two days eggo'],
  'so that …':['so then …','that so …','so what …'],
  'next to':['next at','next of','next on'],
  'right now':['right know','write now','right new'],
  'at first':['in first','at firstly','at frist'],
  'to':['too','two','for'],
  'if':['iff','ef','of'],
  'out':['aut','oute','uot']
};

function spellingDistractors(answer){
  if(PHRASE_DISTRACTORS[answer]) return PHRASE_DISTRACTORS[answer];
  const words = answer.split(' ');
  const targetIndex = words.reduce((best,word,index)=>word.length>words[best].length?index:best,0);
  const word = words[targetIndex];
  const variants = new Set();
  const add = changed => {const copy=[...words];copy[targetIndex]=changed;variants.add(copy.join(' '));};
  if(word.length>=4){
    const middle=Math.max(1,Math.floor(word.length/2)-1);
    add(word.slice(0,middle)+word[middle+1]+word[middle]+word.slice(middle+2));
    add(word.slice(0,middle)+word.slice(middle+1));
    add(word.slice(0,middle)+word[middle]+word.slice(middle));
    const vowelIndex=[...word].findIndex((char,index)=>index>0&&index<word.length-1&&'aeiou'.includes(char.toLowerCase()));
    if(vowelIndex>0) add(word.slice(0,vowelIndex)+(word[vowelIndex].toLowerCase()==='a'?'e':'a')+word.slice(vowelIndex+1));
  } else {
    add(word+'e');
    add(word[0]+word);
    add([...word].reverse().join(''));
  }
  return [...variants].filter(value=>value!==answer).slice(0,3);
}

function nearbyMeanings(index,answer){
  const values=[];
  for(let distance=1;values.length<3&&distance<VOCAB.length;distance++){
    for(const candidateIndex of [index-distance,index+distance]){
      if(candidateIndex>=0&&candidateIndex<VOCAB.length){
        const value=VOCAB[candidateIndex][1];
        if(value!==answer&&!values.includes(value)&&values.length<3) values.push(value);
      }
    }
  }
  return values;
}

function makeQuestions(){
  const spellingQs = VOCAB.map(([en,de])=>({prompt:`Welche englische Schreibweise oder Wendung ist richtig? – ${de}`,answer:en,wrong:spellingDistractors(en),note:`„${de}“ heißt „${en}“.`,kind:'Schreibweise'}));
  const meaningQs = VOCAB.map(([en,de],index)=>({prompt:`Was bedeutet „${en}“?`,answer:de,wrong:nearbyMeanings(index,de),note:`„${en}“ bedeutet „${de}“.`,kind:'Bedeutung'}));
  const specialQs = SPECIAL.map(([prompt,answer,wrong])=>({prompt,answer,wrong,note:`Richtig ist: ${answer}.`,kind:prompt.includes('Präposition')?'Präposition':'Wendung'}));
  const chosen = shuffle([
    ...shuffle(spellingQs).slice(0,12),
    ...shuffle(meaningQs).slice(0,6),
    ...shuffle(specialQs).slice(0,2)
  ]);
  return chosen.map((q,id)=>({...q,id,options:shuffle([q.answer,...q.wrong])}));
}

function App(){
  const [questions,setQuestions]=useState(()=>makeQuestions());
  const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[streak,setStreak]=useState(0),[best,setBest]=useState(0);
  const q=questions[index]; const done=index===questions.length;
  const progress=done?100:(index/questions.length)*100;
  const restart=()=>{setQuestions(makeQuestions());setIndex(0);setSelected(null);setScore(0);setStreak(0)};
  const choose=(answer)=>{if(selected!==null)return;setSelected(answer);if(answer===q.answer){setScore(s=>s+1);setStreak(s=>{const n=s+1;setBest(b=>Math.max(b,n));return n})}else setStreak(0)};
  const next=()=>{setSelected(null);setIndex(i=>i+1)};
  if(done)return <main className="result"><div className="resultMark"><Target/></div><p className="overline">Unit 1 · Bis Part C</p><h1>{score >= 17?'Stark gemacht.':score >= 12?'Gute Runde.':'Noch eine Runde.'}</h1><p className="score"><b>{score}</b> von {questions.length} richtig</p><p>{score>=17?'Die Vokabeln sitzen schon ziemlich sicher.':'Die nächste Runde mischt Fragen und Antworten neu.'}</p><button className="primary" onClick={restart}><RotateCcw/>Neuen Test starten</button></main>;
  const correct=selected===q.answer;
  return <div className="appShell">
    <aside><div className="brand"><BookOpen/><div><b>Vokabeltest</b><span>Englisch lernen</span></div></div><div className="sideCopy">Konzentriert.<br/>Stetig besser.</div></aside>
    <main className="quiz">
      <header><div><p className="overline">Unit 1</p><h1>Bis einschließlich Part C</h1></div><div className="metrics"><span><Flame/> Serie {streak}</span><span><Target/> Treffer {score}</span></div></header>
      <div className="progressRow"><div className="bar"><i style={{width:`${progress}%`}}/></div><span>Frage {index+1} von {questions.length}</span></div>
      <section className="question"><span className="kind">{q.kind}</span><h2>{q.prompt}</h2><div className="answers">{q.options.map((answer,i)=>{let cls='answer';if(selected!==null){if(answer===q.answer)cls+=' correct';else if(answer===selected)cls+=' wrong';else cls+=' muted'}return <button key={answer} className={cls} onClick={()=>choose(answer)}><em>{String.fromCharCode(65+i)}</em><span>{answer}</span>{selected!==null&&answer===q.answer?<Check/>:selected===answer?<X/>:null}</button>})}</div>
      {selected!==null&&<div className={`feedback ${correct?'yes':'no'}`}><div>{correct?<Check/>:<X/>}</div><p><b>{correct?'Richtig.':'Noch nicht.'}</b><span>{q.note}</span></p><button onClick={next}>Weiter</button></div>}
      </section>
      <footer><span>Beste Serie: {best}</span><button onClick={restart}><RotateCcw/> Neu starten</button></footer>
    </main>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
