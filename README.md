# 🚀 WebPing – Web Push Notifications (raw)

WebPing is a lightweight full-stack implementation of browser push notifications using **Web Push API** and **Notifications API**, without relying on Firebase.

## ✨ Features

* 🔔 Native browser notifications
* ⚡ No third-party push service (no Firebase)
* 🔐 VAPID authentication
* 📦 Service worker-based background notifications
* 🌐 Works with modern browsers

---

## 🧠 How It Works

1. User visits the app
2. Browser asks for notification permission
3. Service Worker is registered
4. Push subscription is created
5. Subscription is sent to the backend
6. Backend stores subscription
7. Backend sends push notifications using VAPID keys

---

## ⚠️ Notes

* Requires HTTPS (except localhost)
* Works best on Chrome, Edge, Firefox
* Safari has limited support

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
