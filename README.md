Simple E-commerce Shopping Cart

Laravel 12 + Inertia.js + React

A clean, lightweight demo app that lets users browse products, manage a personal cart, and check out — plus an admin panel, low-stock notifications, and a daily sales report. Perfect for learning, testing, or kicking off a small project.

🚀 MySQL Setup (Quick & Friendly)

Create a database — for example: laravel_inertia_cart.

Copy your environment file and generate your key:
cd server
cp .env.example .env
php artisan key:generate
Open server/.env and set your MySQL details:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_inertia_cart
DB_USERNAME=root
DB_PASSWORD=

ADMIN_EMAIL=admin@example.com
QUEUE_CONNECTION=database
MAIL_MAILER=log
Install everything, migrate, and seed:
composer install
npm install
php artisan migrate --force
php artisan db:seed
This creates:
A test user: test@example.com
 (you set the password)
An admin: ADMIN_EMAIL, password password
A batch of sample products
Run the App
npm run dev
php artisan serve
Then open: http://127.0.0.1:8000
Daily Sales Report — How to Test Fast

Every evening at 21:00, the app emails the admin a summary of all orders placed that day. Want to test immediately? Two easy ways:

Option A — From the UI (easiest)

Log in as admin

Visit /admin/reports/daily

Click “Send report now”

Since MAIL_MAILER=log, open server/storage/logs/laravel.log to view the “email.”
Option B — Using Laravel’s scheduler
php artisan queue:work
php artisan schedule:work
Or trigger it instantly:
php artisan schedule:run
Low-Stock Alerts (Quick Check)

Low-stock alerts trigger whenever a product’s stock falls to — or below — its threshold during editing or checkout.

Alerts are idempotent (no spam!)

Once stock rises above the threshold, alerts reset

Where to see them:

Email → ADMIN_EMAIL (logged to storage/logs/laravel.log)

Admin navbar bell → in-app notifications
(Use “Mark all as read” to clear)
Admin Features

Products: /admin/products (CRUD)

Orders: /admin/orders

Reports: /admin/reports/daily (includes “Send Now”)
Handy Script Cheat Sheet
# Dev servers
php artisan serve
npm run dev

# Production build
npm run build

# Database
php artisan migrate --force
php artisan db:seed

# Workers
php artisan queue:work
php artisan schedule:work


That’s everything — clean, fast, and ready to demo