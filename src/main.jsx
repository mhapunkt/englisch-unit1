import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, Check, Flame, RotateCcw, Target, X} from 'lucide-react';
import './styles.css';

import {makeQuestions} from './questions.js';

function App(){
  const [questions,setQuestions]=useState(()=>makeQuestions());
  const [answers,setAnswers]=useState({});
  const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[streak,setStreak]=useState(0),[best,setBest]=useState(0);
  const q=questions[index]; const done=index===questions.length;
  const progress=done?100:(index/questions.length)*100;
  const restart=()=>{setQuestions(makeQuestions());setAnswers({});setIndex(0);setSelected(null);setScore(0);setStreak(0)};
  const choose=(answer)=>{if(selected!==null)return;setSelected(answer);setAnswers(previous=>({...previous,[q.id]:answer}));if(answer===q.answer){setScore(s=>s+1);setStreak(s=>{const n=s+1;setBest(b=>Math.max(b,n));return n})}else setStreak(0)};
  const next=()=>{setSelected(null);setIndex(i=>i+1)};
  if(done)return <main className="result"><div className="resultMark"><Target/></div><p className="overline">Unit 1 · Bis Part B</p><h1>{score >= 17?'Stark gemacht.':score >= 12?'Gute Runde.':'Noch eine Runde.'}</h1><p className="score"><b>{score}</b> von {questions.length} richtig</p><p>{score>=17?'Die Vokabeln sitzen schon ziemlich sicher.':'Die nächste Runde mischt Fragen und Antworten neu.'}</p><section className="resultDetails" aria-labelledby="result-details-heading">
    <h2 id="result-details-heading">Deine Antworten im Detail</h2>
    <p>{score} richtig · {questions.length-score} falsch</p>
    <ol className="reviewList">{questions.map((question,i)=>{
      const given=answers[question.id];
      const isCorrect=given===question.answer;
      return <li key={question.id} className={`reviewItem ${isCorrect?'reviewCorrect':'reviewWrong'}`}>
        <div className="reviewHeading"><span>Frage {i+1} · {question.kind}</span><strong className="reviewStatus">{isCorrect?<Check aria-hidden="true"/>:<X aria-hidden="true"/>}{isCorrect?'Richtig':'Falsch'}</strong></div>
        <h3>{question.prompt}</h3>
        <dl><div><dt>Deine Antwort</dt><dd>{given}</dd></div><div><dt>Richtige Lösung</dt><dd>{question.answer}</dd></div></dl>
        {!isCorrect&&<p className="reviewNote">{question.note}</p>}
      </li>;
    })}</ol>
  </section><button className="primary" onClick={restart}><RotateCcw/>Neuen Test starten</button></main>;
  const correct=selected===q.answer;
  return <div className="appShell">
    <aside><div className="brand"><BookOpen/><div><b>Vokabeltest</b><span>Englisch lernen</span></div></div><div className="sideCopy">Konzentriert.<br/>Stetig besser.</div></aside>
    <main className="quiz">
      <header><div><p className="overline">Unit 1</p><h1>Bis einschließlich Part B</h1></div><div className="metrics"><span><Flame/> Serie {streak}</span><span><Target/> Treffer {score}</span></div></header>
      <div className="progressRow"><div className="bar"><i style={{width:`${progress}%`}}/></div><span>Frage {index+1} von {questions.length}</span></div>
      <section className="question"><span className="kind">{q.kind}</span><h2>{q.prompt}</h2><div className="answers">{q.options.map((answer,i)=>{let cls='answer';if(selected!==null){if(answer===q.answer)cls+=' correct';else if(answer===selected)cls+=' wrong';else cls+=' muted'}return <button key={answer} className={cls} onClick={()=>choose(answer)}><em>{String.fromCharCode(65+i)}</em><span>{answer}</span>{selected!==null&&answer===q.answer?<Check/>:selected===answer?<X/>:null}</button>})}</div>
      {selected!==null&&<div className={`feedback ${correct?'yes':'no'}`}><div>{correct?<Check/>:<X/>}</div><p><b>{correct?'Richtig.':'Noch nicht.'}</b><span>{q.note}</span></p><button onClick={next}>Weiter</button></div>}
      </section>
      <footer><span>Beste Serie: {best}</span><button onClick={restart}><RotateCcw/> Neu starten</button></footer>
    </main>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
