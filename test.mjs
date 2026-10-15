import assert from 'node:assert/strict';
import {searchCorpus,evaluateGap,budgetSummary,budgetScore,rubricTotal} from './engine.js';
import {papers,proposals,rubric,lessons,aiCards,prompts,classifications} from './data.js';
assert.equal(searchCorpus('Arduino water pump',papers).length,0);
assert.deepEqual(searchCorpus('"soil moisture" AND (irrigation OR watering)',papers).map(x=>x.id),['S5','S6','S7']);
assert.deepEqual(searchCorpus('ventilation NOT continuous',papers).map(x=>x.id),['S1','S4']);
assert.deepEqual(searchCorpus('intermittent AND performance',papers).map(x=>x.id),['S4']);
// Search includes findings/limitations: S3 mentions that CO2 was not measured.
assert.equal(searchCorpus('(school OR university) AND CO2',papers).length,4);
assert.throws(()=>searchCorpus('ventilation AND',papers));assert.throws(()=>searchCorpus('(ventilation',papers));assert.throws(()=>searchCorpus('"ventilation',papers));
assert.equal(evaluateGap(['S1']).status,'insufficient');assert.equal(evaluateGap(['S1','S2','S3']).status,'candidate');assert.equal(evaluateGap(['S1','S2','S3','S4']).status,'closed');
assert.equal(budgetSummary(proposals,['A','B']).valid,true);assert.equal(budgetSummary(proposals,['A','B','C']).valid,false);assert.equal(budgetSummary(proposals,['A','C']).remaining,18000);assert.equal(budgetScore(proposals[0]),88);assert.throws(()=>budgetScore(proposals[0],[20,20,20]));
assert.equal(rubric.reduce((s,r)=>s+r[1],0),100);assert.equal(rubricTotal([4,4,4,4,4,4],rubric),100);assert.equal(rubricTotal([4,0,0,0,0,0],rubric),15);
assert.equal(lessons.length,4);assert.equal(prompts.length,5);assert.equal(aiCards.length,3);assert.equal(classifications.length,8);
console.log('PASS: Boolean search, invalid queries, evidence reversal, budget constraints, weighted rubric and activity counts');
