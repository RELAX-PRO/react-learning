# Lifting State Up

Explanation of moving state to a common ancestor when siblings need to share state.

## Pros & Cons
**Pros:** Single source of truth. Keeps related components synchronized.
**Cons:** Can lead to prop drilling if the ancestor is very high up the tree.
