# Lifting State Up

> **💡 How to Imagine This:**
> Imagine two siblings arguing over the TV remote. To solve the problem, they give the remote to their parent. Now, both siblings have to ask the parent to change the channel. Lifting state up means giving the shared data to the closest common parent component so it can coordinate between its children.

Explanation of moving state to a common ancestor when siblings need to share state.

## Pros & Cons
**Pros:** Single source of truth. Keeps related components synchronized.
**Cons:** Can lead to prop drilling if the ancestor is very high up the tree.
