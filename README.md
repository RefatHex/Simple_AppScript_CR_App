
# Google Sheets API

This Google Apps Script API allows interaction with a Google Sheet to add, update, delete, and retrieve data. Each row in the sheet has a unique ID in the first column to facilitate easy row identification and updates.

## Base URL

Replace `your_deployment_id` with your actual Google Apps Script deployment ID.

```
https://script.google.com/macros/s/your_deployment_id/exec
```

## API Endpoints

### `doGet` Method

The `doGet` method is used to retrieve data from the Google Sheet. It supports the following actions:

#### 1. Get All Data (`getAll`)

- **Method**: GET
- **URL**: `https://script.google.com/macros/s/your_deployment_id/exec?action=getAll`

**Description**: This action retrieves all data from the Google Sheet and returns it in JSON format. Note that the first column in the data represents the unique ID for each row.

**Example Request in Postman**:
1. Select **GET** as the method.
2. Set the URL as:  
   ```
   https://script.google.com/macros/s/your_deployment_id/exec?action=getAll
   ```
3. Click **Send**.

**Response**:
- Returns the entire data from the sheet as a JSON array, with the first column as the ID for each row.

#### 2. Search by Exact Value in a Specific Column (`search`)

- **Method**: GET
- **URL**: `https://script.google.com/macros/s/your_deployment_id/exec?action=search&q=searchValue&column=2`

**Parameters**:
- `action` (required): Set to `search`.
- `q` (required): The exact value to search for.
- `column` (required): The column (1-based index) to search in. Note that searches cannot be performed on the ID column (column 1).

**Description**: This action searches for an exact match of `q` in the specified `column` (except for the ID column) and returns the row where the match is found.

**Example Request in Postman**:
1. Select **GET** as the method.
2. Set the URL as:  
   ```
   https://script.google.com/macros/s/your_deployment_id/exec?action=search&q=searchValue&column=2
   ```
3. Click **Send**.

**Response**:
- If a match is found, returns the entire row as a JSON array (including the ID column).
- If no match is found, returns `"Query not found"`.

---

### `doPost` Method

The `doPost` method is used to add, update, or delete rows in the Google Sheet. Each row has a unique ID in the first column, automatically incremented when new rows are added.

#### 1. Add a New Row with Auto-Increment ID (`add`)

- **Method**: POST
- **URL**: `https://script.google.com/macros/s/your_deployment_id/exec`

**Parameters**:
- `action` (required): Set to `add`.
- `values` (required): Comma-separated values to be added in the row (excluding the ID, which is auto-generated).

**Description**: Adds a new row with an auto-incremented ID in the first column. The values provided will be added in subsequent columns.

**Example Request in Postman**:
1. Select **POST** as the method.
2. Set the URL as:  
   ```
   https://script.google.com/macros/s/your_deployment_id/exec
   ```
3. In the **Params** tab, add:
   - `action` = `add`
   - `values` = `value1,value2,value3`
4. Click **Send**.

**Response**:
- Returns a confirmation message with the assigned ID, e.g., `"Values added successfully with ID 3"`.

---

#### 2. Update an Existing Row by ID (`update`)

- **Method**: POST
- **URL**: `https://script.google.com/macros/s/your_deployment_id/exec`

**Parameters**:
- `action` (required): Set to `update`.
- `id` (required): The unique ID of the row to update.
- `values` (required): Comma-separated new values to replace the existing values in the row (excluding the ID, which remains unchanged).

**Description**: Updates an existing row based on the specified `id`.

**Example Request in Postman**:
1. Select **POST** as the method.
2. Set the URL as:  
   ```
   https://script.google.com/macros/s/your_deployment_id/exec
   ```
3. In the **Params** tab, add:
   - `action` = `update`
   - `id` = `1` (ID of the row to update)
   - `values` = `newValue1,newValue2,newValue3`
4. Click **Send**.

**Response**:
- If the row is found, returns a confirmation message, e.g., `"Row with ID 1 updated successfully"`.
- If the ID is not found, returns `"ID not found"`.

---

#### 3. Delete a Row by ID (`delete`)

- **Method**: POST
- **URL**: `https://script.google.com/macros/s/your_deployment_id/exec`

**Parameters**:
- `action` (required): Set to `delete`.
- `id` (required): The unique ID of the row to delete.

**Description**: Deletes the row with the specified `id` from the sheet.

**Example Request in Postman**:
1. Select **POST** as the method.
2. Set the URL as:  
   ```
   https://script.google.com/macros/s/your_deployment_id/exec
   ```
3. In the **Params** tab, add:
   - `action` = `delete`
   - `id` = `1` (ID of the row to delete)
4. Click **Send**.

**Response**:
- If the row is found, returns a confirmation message, e.g., `"Row with ID 1 deleted successfully"`.
- If the ID is not found, returns `"ID not found for deletion"`.

---

## Error Handling

- If an invalid `action` parameter is provided, the API will return `"Invalid action"`.
- If a required parameter is missing, the API will return a relevant error message.

---

## Example Summary

| Action    | Method | URL Example                                                                                                  | Description                                           |
|-----------|--------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| getAll    | GET    | `https://script.google.com/macros/s/your_deployment_id/exec?action=getAll`                                   | Retrieves all data in JSON format, including IDs      |
| search    | GET    | `https://script.google.com/macros/s/your_deployment_id/exec?action=search&q=searchValue&column=2`            | Searches for `searchValue` in column 2                |
| add       | POST   | `https://script.google.com/macros/s/your_deployment_id/exec?action=add&values=value1,value2,value3`           | Adds a new row with auto-incremented ID               |
| update    | POST   | `https://script.google.com/macros/s/your_deployment_id/exec?action=update&id=1&values=newValue1,newValue2`   | Updates the row with ID 1 with new values             |
| delete    | POST   | `https://script.google.com/macros/s/your_deployment_id/exec?action=delete&id=1`                               | Deletes the row with ID 1                             |

---

This documentation provides a comprehensive guide to using the Google Sheets API. Copy the examples to Postman and modify as needed for your testing.
