# Інструкція з деплою API на Vercel

## Проблема
GitHub Pages - це статичний хостинг, який не може запускати серверні процеси (як json-server). Тому API потрібно задеплоїти окремо на Vercel.

## Крок 1: Задеплоїти API на Vercel

### Варіант A: Через Vercel CLI

1. Встановіть Vercel CLI (якщо ще не встановлено):
```bash
npm i -g vercel
```

2. Увійдіть у Vercel:
```bash
vercel login
```

3. Задеплойте проєкт:
```bash
vercel
```

4. Відповідайте на питання:
   - Set up and deploy? **Yes**
   - Which scope? (виберіть ваш акаунт)
   - Link to existing project? **No**
   - Project name? (наприклад: `wish-list-api`)
   - Directory? **./** (поточна директорія)
   - Override settings? **No**

### Варіант B: Через GitHub Integration

1. Перейдіть на [vercel.com](https://vercel.com)
2. Увійдіть через GitHub
3. Натисніть **Add New Project**
4. Імпортуйте ваш репозиторій `Demo-Wish-list`
5. Vercel автоматично визначить налаштування з `vercel.json`
6. Натисніть **Deploy**

## Крок 2: Отримати URL вашого Vercel API

Після деплою Vercel надасть вам URL, наприклад:
- `https://wish-list-api.vercel.app`

Ваші API endpoints будуть доступні за адресами:
- `https://wish-list-api.vercel.app/api/wishes` (GET, POST)
- `https://wish-list-api.vercel.app/api/wishes/[id]` (GET, PUT, PATCH, DELETE)

## Крок 3: Налаштувати змінну середовища для GitHub Pages

### Варіант A: Через GitHub Actions (рекомендовано)

1. Відкрийте ваш репозиторій на GitHub
2. Перейдіть у **Settings** → **Secrets and variables** → **Actions**
3. Натисніть **New repository secret**
4. Додайте:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-vercel-app.vercel.app/api` (замініть на ваш URL)
5. Оновіть `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
```

### Варіант B: Через Vite build-time змінні

Оновіть `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_BASE_URL: https://your-vercel-app.vercel.app/api
```

## Крок 4: Оновити GitHub Actions workflow

Оновіть файл `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
```

## Альтернативний варіант: Використати Render або Railway для json-server

Якщо ви хочете використовувати саме json-server, можете задеплоїти його на:

### Render.com (безкоштовно):
1. Створіть акаунт на [render.com](https://render.com)
2. Створіть новий **Web Service**
3. Підключіть ваш GitHub репозиторій
4. Налаштування:
   - **Build Command**: `npm install`
   - **Start Command**: `npx json-server db.json --port $PORT --host 0.0.0.0`
   - **Environment**: Node
5. Додайте змінну середовища `VITE_API_BASE_URL` у GitHub Actions з URL вашого Render сервісу

### Railway.app (безкоштовно):
1. Створіть акаунт на [railway.app](https://railway.app)
2. Створіть новий проєкт
3. Додайте сервіс з GitHub репозиторію
4. Налаштуйте команду запуску: `npx json-server db.json --port $PORT`
5. Додайте змінну середовища `VITE_API_BASE_URL` у GitHub Actions

## Важливо!

⚠️ **Увага**: Vercel API routes використовують in-memory storage, тому дані не зберігаються між викликами функцій. Для production потрібно використовувати базу даних (Vercel KV, Postgres, MongoDB тощо).

Для тестування це працюватиме, але для production додаток потрібно оновити для використання реальної бази даних.

