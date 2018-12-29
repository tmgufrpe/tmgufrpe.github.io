---
layout: post
categories: news
title: WordNet with NLTK
subtitle:
author: "Text Mining Group UFRPE"
date: 2018-06-15 21:11:27
meta: "wordnet, nltk"
---

You can use WordNet together with NLTK to identify the meanings of words, synonyms, antonyms, and more.

Let's look at an example.

```python
# first you import wordnet.
from nltk.corpus import wordnet

# we use a term "program" to find synsets.
syns = wordnet.synsets("program")

# examples of outputs.
print(syns[0].name())
print(syns[0].lemmas()[0].name())
print(syns[0].definition())
print(syns[0].examples())
```

here you can distinguish synonym and antonym .. the lemmas will be synonymous, and then you can use antonym to find the antonyms for the lemmas. As such, you can fill in some lists like:

```python
synonyms = []
antonyms = []
 
for syn in wordnet.synsets("good"):
    for l in syn.lemmas():
        synonyms.append(l.name())
        if l.antonyms():
            antonyms.append(l.antonyms()[0].name())

print(set(synonyms))
print(set(antonyms))
```

Comparing the noun "ship" and "boat".

```python
w1 = wordnet.synset('ship.n.01')
w2 = wordnet.synset('boat.n.01')
print(w1.wup_similarity(w2))

w1 = wordnet.synset('ship.n.01')
w2 = wordnet.synset('car.n.01')
print(w1.wup_similarity(w2))

w1 = wordnet.synset('ship.n.01')
w2 = wordnet.synset('cat.n.01')
print(w1.wup_similarity(w2))
```

Output generated from the code above "example".

```python
plan.n.01
plan
a series of steps to be carried out or goals to be accomplished
['they drew up a six-step plan', 'they discussed plans for a new bond issue']
{'upright', 'soundly', 'proficient', 'skillful', 'respectable', 'full', 'in_effect', 'dependable', 'thoroughly', 'sound', 'estimable', 'secure', 'honest', 'well', 'adept', 'goodness', 'unspoiled', 'near', 'commodity', 'salutary', 'expert', 'undecomposed', 'dear', 'serious', 'good', 'right', 'skilful', 'safe', 'trade_good', 'effective', 'beneficial', 'unspoilt', 'just', 'in_force', 'honorable', 'ripe', 'practiced'}
{'bad', 'evilness', 'badness', 'evil', 'ill'}
0.9090909090909091
0.6956521739130435
0.32
```

Fonte: [PythonProgramming](https://pythonprogramming.net/wordnet-nltk-tutorial/)