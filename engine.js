// Search only the fictional local corpus. No network or AI inference.
export function searchCorpus(query,corpus){
 const matches=query.match(/"[^"\r\n]+"|\(|\)|[^\s()]+/g)||[];
 if(!matches.length)return [];
 const tokens=[];for(const t of matches){const last=tokens.at(-1);if(last&&last!== '('&&last!=='AND'&&last!=='OR'&&last!=='NOT'&&t!==')'&&t!=='AND'&&t!=='OR')tokens.push('AND');tokens.push(t)}
 let i=0;const norm=s=>s.toLowerCase().replaceAll('₂','2');
 function primary(){let t=tokens[i++];if(!t||t===')'||t==='AND'||t==='OR')throw Error('חסר מונח בשאילתה.');if(t==='NOT')return {not:primary()};if(t==='('){let n=or();if(tokens[i++]!==')')throw Error('סוגריים לא מאוזנים.');return n}return {term:norm(t.replace(/^"|"$/g,''))}}
 function and(){let left=primary();while(tokens[i]==='AND'){i++;left={and:[left,primary()]}}return left}
 function or(){let left=and();while(tokens[i]==='OR'){i++;left={or:[left,and()]}}return left}
 if((query.match(/"/g)||[]).length%2)throw Error('סגרו את המרכאות.');
 let tree=or();if(i!==tokens.length)throw Error('בדקו את מבנה השאילתה.');
 const hit=(n,text)=>n.term!==undefined?text.includes(n.term):n.not?!hit(n.not,text):n.and?n.and.every(x=>hit(x,text)):n.or.some(x=>hit(x,text));
 return corpus.filter(p=>hit(tree,norm([p.title,p.tags,p.pop,p.method,p.finding,p.limit].join(' '))));
}
export function evaluateGap(ids){const s=new Set(ids);if(s.has('S4'))return {status:'closed',title:'הפער הספציפי דורש שינוי',text:'S4 מתאר את אותה התערבות ותוצאות בכיתות תיכון. במאגר המדומה הוא מפריך טענה שלא בוצעה בדיקה זו. אפשר לבדוק מגבלות והקשרים אחרים, אך אין להמציא פער חדש אוטומטית.'};if(['S1','S2','S3'].every(id=>s.has(id)))return {status:'candidate',title:'נמצא מועמד לפער, בתחום הכיסוי',text:'בשלושת התקצירים חסר שילוב של אוורור לסירוגין וביצוע משימה. זה בסיס לניסוח מסויג בלבד; עדיין דרוש חיפוש שינסה לסגור את הפער.'};return {status:'insufficient',title:'אין עדיין בסיס מספיק לטענת פער',text:'חסרה השוואה של שלושת מקורות הבסיס. תא ריק או תקציר יחיד אינם ראיה מספקת לחוסר בספרות.'}}
export function budgetScore(p,w=[30,30,40]){if(w.length!==3||w.some(v=>!Number.isFinite(v)||v<0)||w.reduce((a,b)=>a+b,0)!==100)throw Error('המשקלים חייבים להסתכם ב-100%.');return (p.evidence*w[0]+p.importance*w[1]+p.feasible*w[2])/5}
export function budgetSummary(proposals,ids,budget=50000,w=[30,30,40]){const selected=proposals.filter(p=>ids.includes(p.id));let total=selected.reduce((s,p)=>s+p.cost,0);return {total,remaining:budget-total,valid:total<=budget,scores:selected.map(p=>({id:p.id,score:budgetScore(p,w)}))}}
export function rubricTotal(levels,rubric){return rubric.reduce((s,[,weight],i)=>s+weight*Math.max(0,Math.min(4,Number(levels[i])||0))/4,0)}
