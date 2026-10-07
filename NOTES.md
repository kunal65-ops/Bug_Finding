# NOTES

## Summary of changes

The search query had no brackets around the title/description OR. Because AND runs first, picking a status did nothing and the two archived tasks showed up. I added the brackets in TaskRepository.java, db/queries/search_tasks.sql and the Oracle package. The Oracle edit is untested; I have no Oracle here.

TaskController had a Thread.sleep that held every request for up to a second. I removed it. An unknown status, page 0 or a negative pageSize used to return 500. They now return 400, and pageSize is limited to 100.

In useTasks.js a failed request left the page on "Loading tasks..." with no error shown. That is fixed. The hook also ignores a response from an older search, so a slow reply cannot replace newer results.

In App.jsx, changing the search or status goes back to page 1. I also added a 300 ms debounce so typing a word sends one request, not one per letter.

## What I chose not to change

Pagination is still done in Java after loading every match. Moving it to SQL is too big for a patch.

The H2 console has no password, but the README lists it as a feature.

The Oracle VARCHAR2(257) search variable overflows on long terms. I cannot test a fix.

Search suggestions, a clear button and a skeleton loader would be new features.

## Biggest remaining risk

There are no automated tests, and the same query is written in three places. The bug could return in one copy unnoticed.

## Tools / AI

GenAI tools (Claude Code) were used as development assistance for exploring the code, debugging, reproducing issues and drafting fixes. I reviewed the findings, decided what to fix, reviewed the changes, and verified the behaviour through API and UI testing.
