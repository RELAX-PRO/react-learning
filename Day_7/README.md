# Data Fetching

> **💡 How to Imagine This:**
> Think of data fetching like a mail delivery service. Your React app sends a letter requesting information (the request). While waiting for the postman to return, you might put up a "Checking mail..." sign (loading state). If the postman gets lost, you need a plan for what to tell the user (error handling). And when the mail finally arrives, you neatly sort it into your filing cabinet (normalization) so you can actually read it.


This day teaches how React apps talk to APIs and handle network state responsibly.

## Learning order

1. [01_Fetch_API](./01_Fetch_API/)
2. [02_Axios_client](./02_Axios_client/)
3. [03_Handling_Promises](./03_Handling_Promises/)
4. [04_Loading_states](./04_Loading_states/)
5. [05_Error_handling](./05_Error_handling/)
6. [06_Data_normalization](./06_Data_normalization/)
7. [07_Effect_cleanup](./07_Effect_cleanup/)

## What to learn here

- How to start a request
- How to wait for data safely
- How to show loading and error feedback
- How to normalize response data before using it in UI
- How to cancel or clean up effects on unmount

## Practice checklist

- Fetch a list and display it
- Add a loading indicator
- Add one error message state
- Normalize one response object before rendering