# Users Dashboard

A responsive user management dashboard built with **Next.js, TypeScript, and Redux Toolkit**. The application allows users to log in, browse a list of users, navigate through paginated results, and view individual user profiles.

## 1. Running the Project Locally

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone "https://github.com/Ashmit-Deloitte/nextjs-typescript-users-dashboard.git"
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-typescript-users-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 2. State Management

**Redux Toolkit** is used for application-wide state management.

The implementation uses:

- **Redux Toolkit:** Manages authentication state and pagination state.
- **RTK Query:** Handles API requests, caching, loading states, and error handling for user data.
- **React Hooks:** Manages local component state, such as login form inputs and validation errors.

The application fetches user data from the [JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users).

## 3. Assumptions

The following assumptions were made while completing the assignment:

1. **Authentication:** Since no authentication API or backend was provided, login is implemented as a frontend-only flow. The entered identifier is stored in local storage to simulate a logged-in session. The password is validated on the client side and is not sent to a server.

2. **User Data:** JSONPlaceholder is used as the data source. Its `/users` endpoint provides 10 sample user records.

3. **Pagination:** Four users are displayed per page by default. The Show More functionality allows users to reveal additional records without navigating away from the current page.

4. **User Details:** Each user card navigates to a dynamic route based on the user's ID. The detail page displays the available information returned by the API.

5. **API Availability:** An appropriate loading state, error message, and retry mechanism are provided to handle API requests.

6. **Responsive Design:** The interface is designed to adapt to desktop, tablet, and mobile screen sizes.
