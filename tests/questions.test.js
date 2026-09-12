import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeQuestions,spellingQuestions,expressionQuestions,prepositionQuestions} from '../src/questions.js';

test('all questions have one correct and three distinct alternatives',()=>{
  for(const q of [...spellingQuestions,...expressionQuestions,...prepositionQuestions]){
    assert.equal(q.wrong.length,3);
    assert.equal(new Set([q.answer,...q.wrong]).size,4,q.prompt);
    assert.ok(q.prompt && q.note && !q.prompt.includes('undefined'));
  }
});
test('every round has 20 unique questions and the intended balance',()=>{
  const signatures = new Set();
  for(let i=0;i<100;i++){
    const round=makeQuestions();
    assert.equal(round.length,20);
    assert.equal(new Set(round.map(q=>q.prompt)).size,20);
    for(const [kind,count] of [['Schreibweise',12],['Wendung',6],['Präposition',2]])
      assert.equal(round.filter(q=>q.kind===kind).length,count);
    for(const q of round){
      assert.equal(q.options.length,4);
      assert.equal(q.options.filter(a=>a===q.answer).length,1);
    }
    signatures.add(round.map(q=>q.prompt).join('|'));
  }
  assert.ok(signatures.size>1);
});
test('Glück haben uses the requested close alternatives',()=>{
  const q=expressionQuestions.find(q=>q.answer==='to be lucky');
  assert.deepEqual(q.wrong,['to are lucky','have luck','lucky have']);
  assert.match(q.prompt,/Vokabelliste/);
});
