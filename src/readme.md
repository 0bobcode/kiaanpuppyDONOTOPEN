# ☕ RegardeBucks

RegardeBucks is a modern, single-page café web application built with React.  
It combines a premium coffee shop experience with seamless UI, cart-based ordering, and a friendly in-app assistant called **Chai AI**.

Designed for laptops and desktops first, the app focuses on clarity, elegance, and speed — no clutter, no gimmicks.

---

## ✨ Features

### 🏠 Core Application
- Single-page navigation (Home, About, Locations, Contact)
- Fully responsive, full-screen layout for laptop devices
- Premium UI inspired by modern café brands
- Product menu with images, descriptions, and pricing
- Cart system with add/remove items and total calculation
- Checkout via external payment links
- User authentication (Sign Up / Sign In) using localStorage
- Persistent login across sessions

### 🛒 Cart Experience
- Floating cart icon with item count
- Modal-based cart interface
- Individual item checkout
- Clean, scrollable cart UI
- Empty-state handling

### 🤖 Chai AI Assistant
- Floating circular **Chai AI** button (bottom-left)
- Expandable mini chat interface
- Scrollable chat window (fixed-size, non-intrusive)
- Sensible, context-aware responses
- Quick suggestion prompts for common questions
- Designed for easy future integration with real AI APIs

---

## 🧠 Chai AI – What It Can Answer

Chai AI currently handles:
- Coffee recommendations
- Study/focus drink suggestions
- Vegan food availability
- Store hours and late-opening locations
- Pricing ranges
- General café-related guidance

The logic is rule-based for reliability and demo safety, and can later be swapped with a real AI backend.

---

## 🛠 Tech Stack

- **React** (Functional Components + Hooks)
- **lucide-react** (Icons)
- **Inline Styles** (for clarity and portability)
- **LocalStorage** (authentication persistence)
- **No backend required**

---

## 📁 Project Structure


> The project is intentionally kept simple and self-contained for easy testing, demos, and extension.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
npm install
npm start
