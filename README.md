
## Sending Data to Google Apps Script using Postman

To add data to your Google Sheet via a Google Apps Script endpoint, you can use **Postman** to send a **POST request** with the necessary parameters.

### Steps to Send a POST Request via Postman

1. **Open Postman** and create a new request.
2. **Set the Request Type** to `POST`.
3. **Enter the Request URL**:
   ```plaintext
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with your actual Google Apps Script ID.

4. **Add Body Parameters**:

   - Go to the **Body** tab.
   - Select **x-www-form-urlencoded**.
   - Add a key-value pair with the following details:
     - **Key**: `add`
     - **Value**: `John Doe,30`

#### Example Configuration in Postman

| Key  | Value              |
|------|---------------------|
| add  | John Doe,30   |

5. **Send the Request**:

   - Click **Send** to submit the request.

6. **Check the Response**:

   A successful request will return a confirmation message similar to:

   ```json
   {
     "message": "Values added successfully to row X"
   }
   ```
   Replace `X` with the actual row number where the data was added in your Google Sheet.

### Example Request Details

- **URL**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
- **Method**: `POST`
- **Body Type**: `x-www-form-urlencoded`
- **Parameter**: `add`
- **Value**: A comma-separated list of values, such as `John Doe,30,USA`.

### Example Response

Upon successful submission, you will receive a JSON response like this:

```json
{
  "message": "Values added successfully to row X"
}
```
Replace `X` with the actual row number in your sheet where the data was added.


## Making a GET Request to Retrieve Data

To retrieve data, pass the `q` parameter in the URL. This parameter should contain the search term that the script will look for in the first column of your Google Sheet.

### Example URL Format

```plaintext
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?q=SEARCH_TERM
```

- Replace `YOUR_SCRIPT_ID` with your actual Google Apps Script ID.
- Replace `SEARCH_TERM` with the term you want to search for in the first column.

For example, if you want to retrieve data associated with the term "John Doe" in column A, the URL would look like this:

```plaintext
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?q=John Doe
```

### Explanation of the GET Request

- **Parameter `q`**: This is the search term you’re looking for in the first column of the sheet.
- **Function Logic**: The script searches for the term in column A. If it finds a match, it retrieves data from the specified column (e.g., column B if `parameter = 2`).
- **Response**: If the search term is found, the function returns a text message with the retrieved value. If not found, it returns "Query not found".

### Example Response

If "John Doe" is found in the first column, the response might look like this:

```plaintext
Confirmed Value: 30
```

If the search term isn’t found:

```plaintext
Query not found
```
