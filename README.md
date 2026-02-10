# Prismo TypeScript — Merge Sorted Arrays

A TypeScript function that merges **three sorted integer arrays** into a single array sorted in **ascending order** — without using any built-in sort function.

## Preconditions

| Parameter        | Sort Order                        |
| ---------------- | --------------------------------- |
| `collection_1`   | **Descending** (max → min)        |
| `collection_2`   | **Ascending** (min → max)         |
| `collection_3`   | **Ascending** (min → max)         |

## Algorithm

A **3-way merge** (O(n)) — reverse-iterate `collection_1` to read it ascending, then pick the smallest head among the three streams at each step.

## Setup & Run

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Run unit tests (with coverage)

```bash
npm test
```

## Project Structure

```
prismo-typescript/
├── src/
│   ├── merge.ts          # merge() implementation
│   └── merge.test.ts     # Unit tests (Jest)
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```
