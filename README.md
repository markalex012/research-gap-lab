# Research Gap Lab / מעבדת הפער המחקרי

Hebrew RTL interactive educational site based on the supplied four-page pedagogical guide.

## Content

- Four 90-minute lessons with explanation, practice, feedback and personal reasoning.
- Eight-step research workbench: topic, search log, editable synthesis matrix, comparison, candidate gap, claim, falsification and research question.
- Six activities: gap detectives, missing paper, contradiction or difference, four-lock escape room, gap courtroom, and AI error detection.
- Three simulations: evidence reversal, local Boolean search, and a weighted budget committee with a 50,000 ILS constraint.
- Five AI prompt templates, portfolio, reflection, weighted rubric, JSON export and printing.
- Original source PDF included unchanged. Fictional practice papers and data are explicitly labeled.

No live AI, literature search, account, server-side storage or semantic grading is provided. Free-text reasoning requires self/teacher review. Search operates only over the seven fictional local records; uppercase AND/OR/NOT, grouping and quoted phrases are supported. Text matching can also return a paper that says a variable was NOT measured: always read the result.

## Run locally

From the project directory:

```powershell
python -m http.server 8768
```

Open http://localhost:8768. JavaScript modules require HTTP rather than direct file opening. All work is saved in browser localStorage on that device. Export before clearing browser data.

## Verify

```powershell
node test.mjs
node --check app.js
```

The tests cover Boolean query evaluation and errors, a fourth source overturning the candidate gap, budget limits, weighted scoring and source activity counts.

GitHub Pages: https://markalex012.github.io/research-gap-lab/
