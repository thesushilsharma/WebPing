# 🚀 WebPing – Web Push Notifications (raw)

WebPing is a lightweight full-stack implementation of browser push notifications using **Web Push API** and **Notifications API**, without relying on Firebase.

## ✨ Features

* 🔔 Native browser notifications
* ⚡ Built with Next.js App Router
* 🔐 VAPID authentication (no Firebase)
* 📦 Service worker-based background notifications
* 🐘 PostgreSQL for persistent subscriptions
* 🌐 Works with modern browsers
* 🧩 Drizzle ORM for type-safe DB access
* 📡 API routes for subscription & notifications

---

## 🧠 Architecture
Client:
* Requests notification permission
* Registers Service Worker
* Creates Push Subscription

Server (Next.js API routes):
* Stores subscription in PostgreSQL
* Sends notifications via `web-push`

Database:
* Stores user push subscriptions

---

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router)
* **Database:** PostgreSQL
* **ORM:** Drizzle ORM
* **Push:** Web Push API
* **Runtime:** Node.js

---

## ⚠️ Notes

* Requires HTTPS (except localhost)
* Works best on Chrome, Edge, Firefox
* Safari has limited support
* Store subscriptions securely
* Handle expired subscriptions (cleanup needed)

---

## 🚀 Future Improvements
* User authentication
* Topic-based notifications
* Retry queue (BullMQ / Redis)
* Admin dashboard
* Rate limiting

---

## Deployment

You can deploy this application to a production server using a platform like Vercel, Netlify or any of your choice.

---

## Contributing

Feel free to fork the repository and submit pull requests with your improvements or bug fixes. We welcome contributions from the community!

---

## Known Issues

- None

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
