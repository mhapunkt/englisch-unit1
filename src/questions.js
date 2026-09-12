const VOCAB = [
  ['stop','Halt; Station, Haltestelle'],['camping','Camping, Zelten'],['world','Welt'],['sunny','sonnig'],['mountain','Berg'],['beautiful','schön'],['alone','allein'],['say hello to … for me','Grüß … von mir.'],['wave','Welle'],['weather','Wetter'],['cloudy','bewölkt'],['cloud','Wolke'],['caravan','Wohnwagen'],['fun park','Vergnügungspark'],['windy','windig'],['wind','Wind'],['project','Projekt'],["I can’t wait to see …",'Ich kann es kaum erwarten, … zu sehen.'],['rainforest','Regenwald'],['forest','Wald'],['rain','Regen'],['to rain','regnen'],['plant','Pflanze'],['message','Nachricht'],
  ['phone call','Anruf; Telefongespräch'],['to phone somebody','jemanden anrufen'],['to answer the phone','ans Telefon gehen'],['to be in','zu Hause sein'],['to be out','nicht zu Hause sein; nicht da sein'],['to leave a message','eine Nachricht hinterlassen'],['holiday','Urlaub'],['What was it like?','Wie war es?'],['at first','zuerst; anfangs; am Anfang'],['race','Rennen'],['two days ago','vor zwei Tagen'],['country','Land (Staat)'],['building','Gebäude'],['tomorrow','morgen'],['to bring','(mit-, her)bringen'],['brought','brachte; gebracht'],['if','wenn; falls'],['revision','Wiederholung (des Lernstoffs)'],['Hold on a minute.','Bleib / Bleiben Sie am Apparat.'],['to make notes on something','(sich) Notizen über / zu etwas machen'],['crib sheet','Spickzettel; Merkzettel'],
  ['neighbour','Nachbar/in'],['tea','leichte Nachmittags- oder Abendmahlzeit'],['Love, …','Alles Liebe, … / Liebe Grüße, …'],['Who did you tell?','Wem hast du es erzählt?'],['Who does Sam know?','Wen kennt Sam?'],['for example','zum Beispiel'],['surprise','Überraschung'],['still','trotzdem; dennoch'],['this afternoon','heute Nachmittag'],['this evening','heute Abend'],['to move to','umziehen nach'],['son','Sohn'],['daughter','Tochter'],['already','schon; bereits'],['sure','sicher'],['to invite somebody to','jemanden zu etwas einladen'],['ever','jemals'],['Lucky you.','Du Glückspilz.'],['to be lucky','Glück haben'],['to look after somebody','auf jemanden aufpassen; sich um jemanden kümmern'],['to be allowed to do something','etwas tun dürfen'],['to hit','schlagen'],['to roll','rollen'],['out','heraus; hinaus; nach draußen'],['prize','Preis; Gewinn'],['Here you are.','Bitte sehr. / Hier bitte.'],['…, right?','…, nicht wahr?'],['to mean','bedeuten'],['meant','bedeutete'],['subject','Subjekt'],['object','Objekt'],['to get in touch with somebody','mit jemandem Kontakt aufnehmen; sich mit jemandem in Verbindung setzen'],
  ['to stay in touch with somebody','mit jemandem Kontakt halten; mit jemandem in Verbindung bleiben'],['text message','SMS'],['text','SMS'],['free','kostenlos'],['trick','Trick; Kunststück'],['best friend','beste/r Freund/in'],['decorating','Dekoration'],['contest','(Preis-, Sport-)Wettbewerb; Wettkampf'],['sweet','niedlich'],['similar to somebody or something','jemandem oder etwas ähnlich']
];

const SPELLING = [
  ['surprise','surprize','suprise','surprice'],
  ['neighbour','neigbour','neighbuor','neighbur'],
  ['beautiful','beautifull','beutiful','beautyful'],
  ['weather','wheather','wether','weathar'],
  ['building','buildung','bilding','buidling'],
  ['contest','kontest','conntest','contast'],
  ['mountain','mounten','moutain','mountan'],
  ['daughter','daugther','dauther','doughter'],
  ['tomorrow','tommorow','tomorow','tommorrow'],
  ['already','allready','alredy','alreddy'],
  ['message','mesage','messsage','messege'],
  ['holiday','holliday','holyday','holidai'],
  ['country','contry','countri','countrey'],
  ['brought','braught','brougth','brougt'],
  ['meant','ment','meent','meaned'],
  ['forest','forrest','forist','foresst'],
  ['rainforest','rainforrest','rainforist','rainforesst'],
  ['caravan','carrawan','caraven','caravann'],
  ['cloudy','clowdy','claudy','cloudi'],
  ['sunny','suny','sunnny','sunnie'],
  ['windy','winddy','windi','winndy'],
  ['world','wourld','worlt','wrold'],
  ['project','projet','projeckt','projecct'],
  ['revision','revission','revison','rewision'],
  ['crib sheet','crib sheat','crib shet','crip sheet'],
  ['for example','for exemple','for exampel','for exampl'],
  ['best friend','best freind','best frend','best friand'],
  ['decorating','decorrating','deccorating','decoratting'],
  ['subject','subjekt','subjet','subjact'],
  ['object','objekt','objet','objact'],
];

// Each alternative targets a specific confusion, rather than an unrelated word.
const EXPRESSIONS = [
  ['Glück haben – welche Wendung aus der Vokabelliste passt?', 'to be lucky', ['to are lucky','have luck','lucky have'], 'Die gelernte Wendung ist „to be lucky“. Nach „to“ steht hier „be“.'],
  ['jemanden anrufen','to phone somebody',['to phone to somebody','to phone with somebody','to phone at somebody']],
  ['eine Nachricht hinterlassen','to leave a message',['to let a message','to left a message','to leave an message']],
  ['etwas tun dürfen','to be allowed to do something',['to be allow to do something','to allowed doing something','to be aloud to do something']],
  ['vor zwei Tagen','two days ago',['before two days','two day ago','two days before ago']],
  ['ans Telefon gehen','to answer the phone',['to answer to the phone','to go on the phone','to answer at the phone']],
  ['zu Hause sein','to be in',['to be out','to are in','to being in']],
  ['nicht zu Hause sein','to be out',['to be in','to are out','to being out']],
  ['auf jemanden aufpassen','to look after somebody',['to look for somebody','to look at somebody','to look to somebody']],
  ['jemanden zu etwas einladen','to invite somebody to',['to invite somebody at','to invite somebody for','to invite somebody with']],
  ['mit jemandem Kontakt aufnehmen','to get in touch with somebody',['to get in touch to somebody','to get on touch with somebody','to get in touch at somebody']],
  ['mit jemandem Kontakt halten','to stay in touch with somebody',['to stay on touch with somebody','to stay in touch to somebody','to stay in touch at somebody']],
  ['sich Notizen über etwas machen','to make notes on something',['to do notes on something','to make notes to something','to make note on something']],
  ['Wie war es?','What was it like?',['How was it like?','What did it like?','What were it like?']],
  ['Wem hast du es erzählt?','Who did you tell?',['Who did you told?','Who do you told?','Who you did tell?']],
  ['Wen kennt Sam?','Who does Sam know?',['Who do Sam know?','Who does Sam knows?','Who Sam does know?']],
  ['Ich kann es kaum erwarten, … zu sehen.','I can’t wait to see …',['I can’t wait see …','I can’t wait to seeing …','I can’t waiting to see …']],
  ['Grüß … von mir.','say hello to … for me',['say hello at … for me','say hello to … from I','say hello for … to me']],
  ['Bleib am Apparat.','Hold on a minute.',['Hold at a minute.','Hold in a minute.','Hold to a minute.']],
  ['Du Glückspilz.','Lucky you.',['Luck you.','Lucky your.','Luckily your.']],
];

const PREPOSITIONS = [
  ['We moved ___ Plymouth last year.','to',['at','on','for']],
  ['Can I invite all my friends ___ my birthday party?','to',['for','on','with']],
  ['Sam has to look ___ his little sister. (aufpassen)','after',['at','for','to']],
  ['Get in touch ___ me.','with',['to','at','for']],
  ['make notes ___ something','on',['to','with','after']],
  ['This picture is similar ___ mine.','to',['with','at','for']],
];

export function shuffle(items){
  const result = [...items];
  for(let i=result.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [result[i],result[j]]=[result[j],result[i]];
  }
  return result;
}

export const spellingQuestions = SPELLING.map(([answer,...wrong])=>({
  prompt:`Welche Schreibweise ist richtig? – ${VOCAB.find(([en])=>en===answer)[1]}`,
  answer,wrong,note:`Richtig geschrieben: ${answer}.`,kind:'Schreibweise'
}));
export const expressionQuestions = EXPRESSIONS.map(([meaning,answer,wrong,note])=>({
  prompt:meaning.includes('Vokabelliste')?meaning:`Was heißt „${meaning}“ auf Englisch?`,
  answer,wrong,note:note || `„${meaning}“ heißt „${answer}“.`,kind:'Wendung'
}));
export const prepositionQuestions = PREPOSITIONS.map(([sentence,answer,wrong])=>({
  prompt:`Welche Präposition fehlt? „${sentence}“`,answer,wrong,
  note:`Richtig ist: ${sentence.replace('___',answer)}`,kind:'Präposition'
}));

export function makeQuestions(){
  // Every round guarantees the requested emphasis on spelling.
  const chosen = [...shuffle(spellingQuestions).slice(0,12),
    ...shuffle(expressionQuestions).slice(0,6),...shuffle(prepositionQuestions).slice(0,2)];
  return shuffle(chosen).map((q,id)=>({...q,id,options:shuffle([q.answer,...q.wrong])}));
}
