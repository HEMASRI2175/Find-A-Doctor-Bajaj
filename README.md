# 🏥 Find-A-Doctor

**Find-A-Doctor** is a modern and responsive web application that helps users easily locate and connect with doctors based on their specialty, location, and availability. Designed with user-friendliness and accessibility in mind, this app leverages clean UI components, TypeScript, React, and modern CSS frameworks for seamless performance.
## 👩‍💻 Developed By

**Chettim Chetty Hemasri**  
**Student ID:** RA2211003011092  
**GitHub:** [@HEMASRI2175](https://github.com/HEMASRI2175)



---


## 📌 Features

### 🔍 Autocomplete Search
- Search bar with autocomplete suggestions (top 3 matches).
- Suggestions based on doctor names.
- Filters the doctor list upon selection or Enter key.
- No suggestions shown if no match found.

### 🧪 Filter Panel
#### 1. Consultation Type (Single Select)
- Video Consult
- In Clinic

#### 2. Specialties (Multi-Select)
- Dynamically generated from doctor data.
- Multiple checkboxes can be selected simultaneously.

#### 3. Sort Options
- Fees (Ascending)
- Experience (Descending)

### ⚙️ Behavior
- Filters and search are fully client-side after the initial API call.
- Filters are reflected in the **URL as query parameters**.
- Browser navigation (Back/Forward) retains filters using URL.

## 🌐 API
- **URL**: `https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json`
- Call made once at load; all filtering/searching/sorting is frontend only.

## ✅ Test Automation Support
The following `data-testid` attributes are used for automated testing:

| Element | data-testid |
|--------|--------------|
| Input box | `autocomplete-input` |
| Suggestion item | `suggestion-item` |
| Doctor card | `doctor-card` |
| Doctor name | `doctor-name` |
| Doctor specialties | `doctor-specialty` |
| Doctor experience | `doctor-experience` |
| Doctor fee | `doctor-fee` |
| Filter headers | `filter-header-speciality`, `filter-header-moc`, `filter-header-sort` |
| Consultation filters | `filter-video-consult`, `filter-in-clinic` |
| Specialty filters | `filter-specialty-*` |
| Sort options | `sort-fees`, `sort-experience` |

> Note: Do **not reuse** test IDs across elements unless explicitly stated.

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS + tailwindcss-animate**
- **shadcn/ui (Radix UI + Tailwind)** components
- **React Router DOM**
- **Zod + React Hook Form** for validation
- **Lucide-react** icons
- **TanStack Query** for data management





