# Client Management System

## Description
A web application prototype for managing client records, developed with React and Supabase.

## Features	
- User authentication (Supabase)
- View client records for authenticated users (filter by client name)
- Create new record (opens in new window)

## Technologies Used
- Database: PostgreSQL (Supabase)
- API: Supabase JavaScript client
- Front-End: React (Netlify)
- Version Control: Git

## Database Schema
```
CREATE TABLE public.clients (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    client_name TEXT NOT NULL,
    contact_person TEXT NULL,
    email TEXT NULL,
    phone TEXT NULL,
    address TEXT NULL,
    city TEXT NULL,
    country TEXT NULL,
    CONSTRAINT clients_pkey PRIMARY KEY (id),
    CONSTRAINT clients_client_id_key UNIQUE (id)
) TABLESPACE pg_default;
```

## Setup Instructions
### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/adobiss/db-api-frontend.git
    cd db-api-frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory with the following environment variables:
    ```
    REACT_APP_SUPABASE_URL=your-supabase-url
    REACT_APP_SUPABASE_KEY=your-supabase-key
    ```

4. Run the application:
    ```sh
    npm start
    ```

### Deployment
- Deploy on Netlify using its free tier.
- Set the following environment variables in your Netlify site settings:
    - `REACT_APP_SUPABASE_URL`
    - `REACT_APP_SUPABASE_KEY`

## Usage
1. Start the development server:
    ```sh
    npm start
    ```
2. Open [http://localhost:3000](http://localhost:3000) to view in the browser.

3. Use the application to manage client records:
    - Authenticate with email and password
    - View client records (filter by client name)
    - Create new record (opens in new window)

## Repository Structure
- **src/**: Contains the source code.
  - **components/**: React components for the UI.
    - `Auth.js`: Handles user authentication.
    - `Main.js`: Displays and searches client records.
    - `CreateRecord.js`: Form to add new client records.
  - **hooks/**: Custom hooks for authentication.
  - **supabaseClient.js**: Supabase client setup.

## License
- MIT

## Contact
- Email: archie.dobiss@gmail.com