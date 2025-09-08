
# Axion Attendance Manager

Axion is a modern, responsive, and feature-rich web application for tracking student attendance, managing class schedules, and organizing academic tasks. Built with React, TypeScript, Vite, and Tailwind CSS.


---

## 🚀 Major Features & Changelog

- **Bulk Attendance Marking:** Mark all classes for a day as attended/absent/off/clear with a single click. Each subject remains individually editable.
- **Accurate Calendar & Home View:** The calendar and home page always show the correct subjects and occurrences for each day, matching your schedule.
- **Clean Calendar Dots:** Calendar dots are now clean and meaningful: empty if nothing marked, blue if all off, red if all absent, green if all attended, purple if mixed.
- **Persistent Data:** All attendance, schedules, and settings are saved in your browser (localStorage).
- **Dark/Light Mode:** Toggle between beautiful dark and light themes.
- **Statistics Dashboard:** Visualize attendance stats, warnings, and progress.
- **To-Do List:** Organize assignments and tasks with priorities and due dates.
- **Modern UI:** Responsive, accessible, and visually appealing interface.

---

## 📖 User Guide

### 1. Home Page
- See all your classes for today, with each occurrence listed (e.g., Class 1, Class 2).
- Use the top bar to mark all classes as Attended, Absent, Off, or Clear for the day.
- Each subject can still be marked individually after a bulk action.

### 2. Calendar
- View your attendance for each day at a glance.
- Dots below each date indicate attendance:
	- **Gray:** No attendance marked
	- **Green:** All attended
	- **Red:** All absent
	- **Blue:** All off
	- **Purple:** Mixed (e.g., some attended, some absent)
- Click any date to see and edit detailed attendance for each class on that day.

### 3. Marking Attendance
- Click the status buttons (Attended, Absent, Off, Clear) for each subject occurrence.
- Use the bulk buttons above the subject list to mark all at once.
- Changes are saved instantly and persist across sessions.

### 4. Schedule Manager
- Set up your weekly class schedule by adding subjects to each weekday.
- The app uses this schedule to show the correct subjects on the Home and Calendar views.

### 5. Statistics Dashboard
- See your attendance percentage, warnings, and how many classes you can miss or need to attend to reach your goal.

### 6. To-Do List
- Add, edit, and complete academic tasks and assignments.
- Set priorities and due dates for better organization.

### 7. Settings
- Change your required attendance percentage, theme, and notification preferences.

---

## 🌐 Deployment

This app is ready for deployment on Vercel, Netlify, or GitHub Pages. For Vercel:
- Connect your GitHub repo to Vercel
- Use `npm run build` as the build command
- Set output directory to `dist`
- Vercel will auto-deploy on every push to the main branch

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/karfa113/attendance-tracker.git
cd attendance-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

## 🌐 Deployment

This app is ready for deployment on Vercel, Netlify, or GitHub Pages. For Vercel:
- Connect your GitHub repo to Vercel
- Use `npm run build` as the build command
- Set output directory to `dist`


## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State & Persistence:** React Hooks, localStorage

---


## 📁 Project Structure

```
├── src/
│   ├── components/        # UI components (Home, AttendanceCalendar, Dashboard, etc.)
│   ├── data/              # Default/mock data
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app logic
│   └── main.tsx           # Entry point
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── ...
```

---


## 🎨 Visual Effects & UI

- Smooth transitions and hover effects
- Responsive layouts for mobile and desktop
- Modern cards, gradients, and iconography
- Accessible color schemes and dark mode

---


## 🧑‍💻 Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

---


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📚 Support & Contact

For questions, support, or feedback, please open an issue on GitHub or contact the maintainer.

> Made with ❤️ by Monojit Karfa
