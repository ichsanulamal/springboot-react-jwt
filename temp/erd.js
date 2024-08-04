erDiagram
    MEMBER {
        string memberID PK "Primary Key"
        string name
        string email
        string password
        string phone
        date dateOfBirth
    }

    BOOK {
        string bookID PK "Primary Key"
        string title
        string author
        string publisher
        date publicationDate
        string genre
        int availableCopies
    }

    BORROWING_RECORD {
        string recordID PK "Primary Key"
        string memberID FK "Foreign Key"
        string bookID FK "Foreign Key"
        date borrowDate
        date returnDate
    }

    LIBRARIAN {
        string librarianID PK "Primary Key"
        string name
        string email
        string password
        string phone
    }

    
    MEMBER ||--o{ BORROWING_RECORD : "has"
    BOOK ||--o{ BORROWING_RECORD : "is borrowed in"
    LIBRARIAN ||--o{ BOOK : "manages"
