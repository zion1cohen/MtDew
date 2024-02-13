# MtDew
Spring 2024 Capstone
## Data Dictionary
| Field Name | Data Type | Field Size for Display | Description          | Example                  |
|------------|-----------|-------------------------|----------------------|--------------------------|
| FlagID     | Integer   | 10                      | Unique ID of each flag| 7001                     |
| UserID     | Integer   | 10                      | UserID of the user who flagged | 10002            |
| Reason     | Text      | 255                     | Reason for flagging   | Inappropriate content    |
| Timestamp  | Date/Time | 19                      | When the flag was created | 2024-02-13 16:45:00  |

| Field Name | Data Type | Field Size for Display | Description       | Example             |
|------------|-----------|-------------------------|-------------------|---------------------|
| AdminID    | Integer   | 10                      | Unique ID of each admin| 1                  |
| Name       | Text      | 50                      | Name of the admin  | Alice Johnson       |

| Field Name    | Data Type | Field Size for Display | Description           | Example               |
|---------------|-----------|-------------------------|-----------------------|-----------------------|
| SupportRoleID | Integer   | 10                      | Unique ID of each support role | 2               |
| Name          | Text      | 50                      | Name of the support role | Support Coordinator |

| Field Name  | Data Type | Field Size for Display | Description               | Example              |
|-------------|-----------|-------------------------|---------------------------|----------------------|
| ResourceID  | Integer   | 10                      | Unique ID of each resource| 8001                 |
| Content     | Text      | 255                     | Description or content of the resource | User Guide PDF|
| Timestamp   | Date/Time | 19                      | When the resource was added| 2024-02-14 10:00:00 |

| Field Name       | Data Type | Field Size for Display | Description               | Example                   |
|------------------|-----------|-------------------------|---------------------------|---------------------------|
| AnnouncementID   | Integer   | 10                      | Unique ID of each announcement | 9001                  |
| Content          | Text      | 255                     | Content of the announcement| System maintenance on 02/20 |
| Timestamp        | Date/Time | 19                      | When the announcement was made | 2024-02-15 09:00:00 |

| Field Name  | Data Type | Field Size for Display | Description                 | Example               |
|-------------|-----------|-------------------------|-----------------------------|-----------------------|
| FeedbackID  | Integer   | 10                      | Unique ID of each feedback entry | 6001              |
| UserID      | Integer   | 10                      | UserID of the user providing feedback | 10003           |
| Content     | Text      | 255                     | Content of the feedback    | Great service!       |
| Timestamp   | Date/Time | 19                      | When the feedback was submitted | 2024-02-12 14:30:00|

| Field Name   | Data Type  | Field Size for Display | Description                        | Example  |
|--------------|------------|-------------------------|------------------------------------|----------|
| UserID       | Integer    | 10                      | Unique ID of each user             | 10001    |
| Name         | Text       | 50                      | Name of the user                   | John Doe |
| Status       | Text       | 20                      | Account status (Active/Inactive)   | Active   |
| Interests    | Text       | 100                     | User's interests                   | Reading, Coding |
| AccountAction| Text       | 20                      | Actions user can perform on account| create/update/delete |
| MatchAction  | Text       | 20                      | Matching actions user can perform  | automatic/search   |

| Field Name  | Data Type   | Field Size for Display | Description                 | Example                 |
|-------------|-------------|-------------------------|-----------------------------|-------------------------|
| MessageID   | Integer     | 10                      | Unique ID of each message   | 5001                    |
| Content     | Text        | 255                     | Content of the message      | Hello, how are you?     |
| SenderID    | Integer     | 10                      | UserID of the message sender| 10001                   |
| ReceiverID  | Integer     | 10                      | UserID of the message receiver | 10002                |
| Timestamp   | Date/Time   | 19                      | When the message was sent   | 2024-02-12 08:45:00    |

| Field Name  | Data Type   | Field Size for Display | Description                 | Example                 |
|-------------|-------------|-------------------------|-----------------------------|-------------------------|
| ReportID    | Integer     | 10                      | Unique ID of each report    | 10001                   |
| Type        | Text        | 50                      | Type of the report          | User Activity Report    |
| Timestamp   | Date/Time   | 19                      | When the report was generated | 2024-02-16 12:00:00   |
