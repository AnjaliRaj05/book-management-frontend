# React.js Developer Assessment Task

## Project Title
**Dashboard for a Book Management App**

## Objective
Build a **responsive React.js dashboard** that fetches, displays, and allows **CRUD operations** on a list of books using a mock API.

---

## Task Requirements and Implementation

### 1. Frontend Features

#### Home Page (Dashboard)
- **Book Listing**
  - Displayed in a **table** view using **Ant Design Table**.
  - Each book shows:
    - **Title**
    - **Author**
    - **Genre**
    - **Published Year**
    - **Status** (Available / Issued)
  - Includes **pagination** (10 books per page by default).
  - **Search** functionality by title or author.
  - **Filters** for Genre and Status implemented via dropdowns.
- **Loading State**
  - Displays a **centered spinner** while fetching data for better UX.

#### Add/Edit Book Modal/Form
- **Modal-based UI** for adding or editing a book.
- Form validation using **Ant Design Form validation rules**.
- On submission, sends **POST or PUT requests** to the API.
- Updates the table dynamically without page reload.

#### Delete Book
- **Confirmation popup** before deletion using Ant Design `Popconfirm`.
- Shows **toast notifications** for success or error using `message`.

#### Styling/Design
- Built with **Ant Design** for components (Table, Form, Modal, Buttons, Typography, Spin).
- Responsive layout using **Ant Design Grid system** (`Row` and `Col`).
- Clean, modern dashboard styling:
  - Color theme: `#8B5E3C` for primary actions and headers.
  - Cards, modals, and tables styled with shadows and rounded corners.
- Fully **responsive** design for mobile and desktop screens.

---

### 2. API Integration

- Uses **Axios** for all API calls.
- Mock API endpoints (you can replace with any backend later):
  - `GET /books` – Fetch all books
  - `POST /books` – Add a book
  - `PUT /books/:id` – Edit a book
  - `DELETE /books/:id` – Delete a book

> Currently integrated with a local or mock API (like `crudcrud.com` or `json-server`).

---

### 3. State Management

- Global user state handled via **React Context API** (`AuthContext`).
- Local component states for filters, search, modals, and loading indicators.
- Ensures seamless user experience without unnecessary re-renders.

---

### 4. Bonus / UX Enhancements

- **Loading Spinner** centered while fetching books.
- Responsive **filters and search bar** that collapse gracefully on smaller screens.
- Toast messages for all actions (add, edit, delete, error notifications).
- Modular **component-based structure**:
  - `Layout.tsx` – main wrapper with consistent layout
  - `AddBookModal.tsx` / `EditBookModal.tsx` – book form modals
  - `ProfileModal.tsx` – user profile modal

---

## Folder Structure

