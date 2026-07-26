# Global Data Persistence

> **💡 How to Imagine This:**
> Think of this like saving your progress in a video game. If you turn off the console without saving, you lose everything. Persistence ensures your items and level are right where you left them when you return.


This folder explains how app state survives refreshes and browser restarts.

## What to learn

- Which data belongs in persistence
- When local persistence is enough
- The tradeoff between convenience and storage scope

## Pros & Cons
**Pros:** Improves user experience by saving preferences and state across sessions, can act as a local cache to reduce network requests.
**Cons:** Storage limits depend on the browser, data can become out of sync with the server, security risks if storing sensitive information locally.

## Practice checklist

- Persist one small setting
- Restore it after refresh
