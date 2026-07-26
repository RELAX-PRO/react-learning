# 06. Data Normalization

This section covers data normalization—restructuring API response data (usually arrays) into a dictionary-like object (e.g., `byId`) and an array of identifiers (`allIds`) before storing it in React state.

## Pros & Cons

**Pros:**
- Enables O(1) time complexity for reading or updating specific items.
- Solves nested data update issues, avoiding complex multi-level array mapping.
- Integrates cleanly with global state managers like Redux or Context API.

**Cons:**
- Requires initial processing overhead to map the incoming data into the normalized structure.
- Can be over-engineered for small lists or data that does not require frequent individual updates.