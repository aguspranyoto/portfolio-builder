# Portfolio Page Builder

A simple and dynamic portfolio page builder created as a solution for the MySkill.id Front-End Test. This application allows users to create, edit, and preview a personal portfolio page in real-time. All data is saved persistently in the browser, ensuring a seamless user experience across sessions.

## 🚀 Live Demo
You can view and interact with the live project here:

```bash
https://portfolio-builder.agusp.com/
```

## ✨ Features

- **Dynamic Content**: Easily add and edit your profile information, including name, job title, and a short description.
- **Image Uploads**: Add a custom background/cover image and a personal profile avatar.
- **Work Experience**: Detail up to 10 different work experiences, including position, company, dates, and a description.
- **Real-Time Preview**: See your changes reflected instantly in a live preview panel.
- **Persistent Storage**: Your portfolio data is automatically saved to the browser's IndexedDB. When you return, your last saved version is loaded, ready for you to continue editing.
- **Form Validation**: Integrated data validation ensures all required fields are filled correctly before saving.
- **Responsive Design**: The layout is fully responsive and optimized for desktop, tablet, and mobile devices.
- **Focus Mode**: Edit any section in a full-screen dialog for a more focused editing experience.

## 🛠️ Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Client-Side Storage**: IndexedDB (via idb-keyval)
- **Form Validation**: Zod
- **Drag & Drop**: React Dropzone

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   
   Open your terminal and run the following command to clone the project.
   
   ```bash
   git clone https://github.com/your-username/portfolio-builder.git
   ```

2. **Navigate to the project directory:**
   
   ```bash
   cd portfolio-builder
   ```

3. **Install dependencies:**
   
   Install all the required packages using your preferred package manager.
   
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server:**
   
   Start the Next.js development server.
   
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the application:**
   
   Open your browser and navigate to `http://localhost:3000` to see the application running.

## 📝 How to Use

The application is designed to be intuitive. The screen is split into two main sections: the Editor on the left and the Preview on the right.

### Fill in the Form:

- **Images**: Click "Browse" or drag and drop an image file onto the "Background Image" and "Profile Image" cards to upload your pictures.
- **Profile**: Fill in your Name, Title/Position, and a short Description in the "Profile" card.
- **Experience**: The form starts with one experience card. Fill in all the required fields. You can add more experiences (up to 10) by clicking the "+ Tambah Portofolio" button.

### See the Live Preview:

As you type or upload images, the "Preview" panel on the right will update instantly to show you exactly how your final portfolio will look.

### Save Your Changes:

1. When you are ready to save, click the "Simpan Perubahan" button at the top of the editor.
2. The application will validate all your inputs based on the defined rules (e.g., all profile fields and the first experience are required).
3. If there are any errors, an error message will appear under the corresponding field, and a toast notification will alert you.
4. If everything is valid, you will see a success notification, and your data will be saved.

### Persistent Data:

- You can safely close the browser tab or refresh the page.
- When you reopen the application, all your previously saved data will be automatically loaded into both the editor form and the preview panel.

## 📊 Data Schema

The application state is managed by Zustand and persisted in the browser's IndexedDB. This allows for storing larger data like image files, which would exceed localStorage limits.

The main data structure is as follows:

```javascript
{
  portfolio: {
    profile: {
      name: "string",
      job_title: "string",
      job_description: "string"
    },
    images: {
      // The image is validated as a File object locally,
      // then converted to a Base64 string for rendering and storage.
      background_image: "string | null",
      profile_image: "string | null"
    },
    experiences: [
      {
        id: "string", // Unique ID for each experience
        position: "string",
        company: "string",
        description: "string",
        start_date: "string", // e.g., "2025-07-17"
        end_date: "string"
      }
      // ... up to 10 experiences
    ]
  }
}
```

## 🎨 Design Changes & Rationale

This project strives to be as "pixel-perfect" as possible according to the provided Figma design reference. However, a few strategic enhancements were made to improve the overall user experience and add necessary functionality.

The main changes are as follows:

- **Header and Footer**: A simple header and footer were added to provide a more complete page structure and easier navigation.

- **Confirmation on Deletion** : To prevent accidental data loss, a confirmation popover now appears when a user tries to delete an image or a work experience.

- **Improved Date Input** : The date fields were changed from standard text inputs to a more intuitive and user-friendly Date Picker component.

- **Image Deletion** : A dedicated delete button was added for the background and profile images, giving users more control over their content.

- **Focus Mode Dialog** : An "open fullscreen" icon was added to each editor card. Clicking it opens the card in a dialog window, allowing the user to edit a specific section without distractions. This is particularly useful on smaller screens.

- **Clearer Error Feedback** : In addition to toast notifications, validation error messages are now displayed on toast, making it easy for users to identify and fix issues.

- **Toast Notifications** : To provide clear and immediate feedback, toast notifications (using sonner) appear to confirm successful saves or to alert the user of validation errors.
