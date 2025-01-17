<h1 align="center">🎥 Cinema Kiosk Frontend 🎥</h1>

<p align="center">
  A user-friendly web application for movie exploration, ticket booking, and personalized recommendations.
</p>

---

<h2>📖 Overview</h2>
<p>
  The Cinema Kiosk Frontend is built using <strong>React.js</strong>. It provides an intuitive interface for users to explore movies, book tickets, manage favorites, and view personalized recommendations. 
  The frontend communicates seamlessly with the Flask backend and MongoDB database to deliver an interactive user experience.
</p>

---

<h2>✨ Features</h2>

<h3>1. User Interface</h3>
<ul>
  <li>Responsive design for desktop and mobile users.</li>
  <li>Navigation bar with options to explore movies, view favorites, and access user profiles.</li>
</ul>

<h3>2. Movie Recommendations</h3>
<ul>
  <li><strong>Now Playing Movies:</strong> View movies currently playing in cinemas.</li>
  <li><strong>Personalized Recommendations:</strong> Based on user’s watch history and preferences.</li>
  <li><strong>Review-Based Recommendations:</strong> Unique feature providing suggestions based on user reviews.</li>
  <li><strong>Other users' similarity Recommendations:</strong> Based on Similar interest and watched history of other users.</li>
</ul>

<h3>3. Ticket Booking</h3>
<ul>
  <li>Select show dates and times using a calendar.</li>
  <li>Visual seat selection with intuitive color coding:
    <ul>
      <li><span style="color: red;">Red</span>: Booked seats.</li>
      <li><span style="color: green;">Green</span>: Available seats.</li>
      <li><span style="color: yellow;">Yellow</span>: User-selected seats.</li>
    </ul>
  </li>
  <li>Confirm bookings with instant notifications.</li>
</ul>

<h3>4. Favorites Management</h3>
<ul>
  <li>Add or remove movies from your favorites.</li>
  <li>View all favorite movies in one place.</li>
</ul>

---

<h2>💻 Tech Stack</h2>
<ul>
  <li><strong>Frontend Framework:</strong> React.js</li>
  <li><strong>Styling:</strong> Ant Design (AntD), Inline CSS</li>
  <li><strong>Routing:</strong> React Router</li>
  <li><strong>State Management:</strong> React Context API</li>
  <li><strong>API Communication:</strong> Axios</li>
</ul>

---

<h2>⚙️ Setup Instructions</h2>

<h3>1. Prerequisites</h3>
<p>Ensure you have the following installed:</p>
<ul>
  <li>Node.js (>=14.x)</li>
  <li>npm or yarn</li>
  <li>A running backend server (<a href="#cinema-kiosk-backend">Cinema Kiosk Backend</a>).</li>
</ul>

<h3>2. Installation</h3>
<ol>
  <li>Clone the repository
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Start the development server:
    <pre><code>npm start</code></pre>
  </li>
  <li>Open the app in your browser at <code>http://localhost:3000</code>.</li>
</ol>

---

<h2>🔑 Key Pages and Features</h2>

<h3>1. Home Page</h3>
<p>Displays now-playing movies fetched from the backend. Includes navigation to movie details and ticket booking.</p>

<h3>2. Ticket Booking</h3>
<p>Select dates, view available shows, and book seats with an intuitive interface.</p>

<h3>3. Favorites</h3>
<p>Manage favorite movies by adding or removing from the list. Fetches data dynamically from the backend.</p>

<h3>4. Watched Movies</h3>
<p>This page will show user's all watched movies</p>

---

<h2>🤝 How to Contribute</h2>
<ol>
  <li>Fork the repository.</li>
  <li>Create a new branch:
    <pre><code>git checkout -b feature-name</code></pre>
  </li>
  <li>Make your changes and commit:
    <pre><code>git commit -m "Add new feature"</code></pre>
  </li>
  <li>Push your changes:
    <pre><code>git push origin feature-name</code></pre>
  </li>
  <li>Submit a pull request.</li>
</ol>

