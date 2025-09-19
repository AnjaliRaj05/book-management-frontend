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

> This frontend is currently integrated with a custom backend API available [https://github.com/AnjaliRaj05/book-management-Backend-Api].

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
## User Flow

### Landing Page / Home
- Any user can visit the homepage and explore the available books.
- if Users(who is not loggedIn)  attempt to open the **Add Book** or **Profile** modals it will be first redirected to the login page only authenticated user will be allowed to perform the actions
- If the user is not authenticated, any restricted action (Add, Edit, Delete, Profile) will **redirect them to the Login page**.

---
### Desktop View 
<img width="1890" height="858" alt="Screenshot 2025-09-20 024620" src="https://github.com/user-attachments/assets/53cc8008-e6e6-4500-90df-85afdeef32ea" />

<img width="1897" height="847" alt="Screenshot 2025-09-20 024523" src="https://github.com/user-attachments/assets/37085f32-2a92-491c-b8d0-e62a869394b3" />
<img width="1452" height="2754" alt="localhost_3000_ (1)" src="https://github.com/user-attachments/assets/b20a3cec-9b6f-431a-8188-8d0ec7590c1c" />
<img width="1452" height="2754" alt="localhost_3000_ (5)" src="https://github.com/user-attachments/assets/3642da32-4d17-41ca-94ed-aba740ecca40" />
<img width="1452" height="2602" alt="localhost_3000_ (2)" src="https://github.com/user-attachments/assets/feb9c328-1b99-4b8e-a761-bd9478cb5014" />

---
### Mobile View


<img width="1452" height="2826" alt="localhost_3000_" src="https://github.com/user-attachments/assets/798f25a7-ced9-469d-bb2c-4c6f1a2ff896" />

<img width="1290" height="4047" alt="localhost_3000_(iPhone 14 Pro Max) (1)" src="https://github.com/user-attachments/assets/f008600c-fe76-4f20-ace9-20adc246a214" />


